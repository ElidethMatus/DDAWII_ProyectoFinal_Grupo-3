'use client';
import { useEffect, useState } from 'react';
import {
    getOrders,
    getOrderDetails
} from '../../servicios/api';

export default function HistorialPage() {
    const [ordenes, setOrdenes] = useState<any[]>([]);
    const [detalles, setDetalles] = useState<any[]>([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState<number | null>(null);
    const cargarOrdenes = async () => {

        try {
            const response = await getOrders(1);
            setOrdenes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const cargarDetalles = async (orderId: number) => {
        try {
            const response = await getOrderDetails(orderId);

            setDetalles(response.data);
            setOrdenSeleccionada(orderId);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        cargarOrdenes();
    }, []);

    return (
    <div className="container mt-4">
        <h1 className="mb-4"> Historial de Compras </h1>

        <div className="card shadow">
            <div className="card-body">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>

                        {ordenes.map((orden) => (
                            <tr key={orden.id}>
                                <td>{orden.id}</td>
                                <td>{orden.fecha}</td>
                                <td>L. {orden.total}</td>

                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => cargarDetalles(orden.id)}> Ver Detalle </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {ordenSeleccionada && (
            <div className="card shadow mt-4">
                <div className="card-body">
                    <h2 className="mb-3">
                        Detalle Orden #{ordenSeleccionada}
                    </h2>
                    <table className="table table-bordered">
                        <thead className="table-secondary">
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>

                            {detalles.map((detalle) => (
                                <tr key={detalle.id}>
                                    <td>{detalle.nombre}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>L. {detalle.precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
    );
}