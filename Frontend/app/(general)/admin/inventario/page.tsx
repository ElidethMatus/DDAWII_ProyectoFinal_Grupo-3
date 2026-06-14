'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '../../../servicios/api';

export default function InventarioPage() {
    const [productos, setProductos] = useState<any[]>([]);

    const cargarProductos = async () => {

        try {
            const response = await getProducts();
            setProductos(response.data);

        } catch (error) {

            console.log(error);
        }
    };
    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <div className="container mt-4">
    <h1 className="mb-4">Inventario</h1>

    <div className="card shadow">

        <div className="card-body">
            <table className="table table-striped table-hover">
                <thead className="table-dark">

                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>

                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>
                                L. {producto.precio}
                            </td>
                            <td>
                                {producto.stock}
                            </td>
                            <td>
                                {producto.stock === 0 ? (
                                    <span className="badge bg-danger">Agotado</span>) : (<span className="badge bg-success">Disponible</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
    );
}