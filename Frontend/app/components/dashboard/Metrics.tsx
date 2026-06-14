'use client';

import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import styles from './Metrics.module.css';
import { getSalesByCategory, getRevenueByMonth, getOrdersByMonth } from '../../servicios/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

interface SalesByCategory {
    categoria: string;
    total_vendido: number;
    num_ordenes: number;
    ingresos: number;
}

interface RevenueByMonth {
    mes: string;
    ingresos: number;
    num_ordenes: number;
}

interface OrdersByMonth {
    mes: string;
    total_ordenes: number;
    ingresos_mes: number;
    promedio_orden: number;
}


export default function Metrics() {
    const [salesByCategory, setSalesByCategory] = useState<SalesByCategory[]>([]);
    const [revenueByMonth, setRevenueByMonth] = useState<RevenueByMonth[]>([]);
    const [ordersByMonth, setOrdersByMonth] = useState<OrdersByMonth[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                const [
                    categoriesRes,
                    revenueRes,
                    ordersRes
                ] = await Promise.all([
                    getSalesByCategory(),
                    getRevenueByMonth(),
                    getOrdersByMonth()
                ]);

                setSalesByCategory(categoriesRes.data.data);
                setRevenueByMonth(revenueRes.data.data.reverse());
                setOrdersByMonth(ordersRes.data.data.reverse());
                setError('');
            } catch (err) {
                setError('Error al cargar los datos de métricas');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Cargando datos...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    // ===== DATOS PARA GRÁFICAS =====

    // 1. Ventas por categoría
    const categoriesChartData = {
        labels: salesByCategory.map(c => c.categoria),
        datasets: [
            {
                label: 'Total Vendido',
                data: salesByCategory.map(c => c.total_vendido),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    // 3. Ingresos por mes
    const revenueChartData = {
        labels: revenueByMonth.map(r => r.mes),
        datasets: [
            {
                label: 'Ingresos (S/)',
                data: revenueByMonth.map(r => r.ingresos),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };

    // 4. Órdenes por mes
    const ordersChartData = {
        labels: ordersByMonth.map(o => o.mes),
        datasets: [
            {
                label: 'Órdenes',
                data: ordersByMonth.map(o => o.total_ordenes),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Dashboard de Métricas</h1>
            
            <div className={styles.gridContainer}>
                {/* Gráfica 1: Ventas por categoría */}
                <div className={styles.chartCard}>
                    <h2>Ventas por Categoría</h2>
                    <Doughnut data={categoriesChartData} options={chartOptions} />
                </div>

                {/* Gráfica 2: Ingresos por mes */}
                <div className={styles.chartCard}>
                    <h2>Ingresos por Mes</h2>
                    <Line data={revenueChartData} options={chartOptions} />
                </div>

                {/* Gráfica 3: Órdenes por mes */}
                <div className={styles.chartCard}>
                    <h2>Órdenes por Mes</h2>
                    <Line data={ordersChartData} options={chartOptions} />
                </div>
            </div>

            {/* Tabla con detalles */}
            <div className={styles.detailsSection}>
                <h2>Resumen de Categorías</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th>Total Vendido</th>
                            <th>Órdenes</th>
                            <th>Ingresos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesByCategory.map((cat, idx) => (
                            <tr key={idx}>
                                <td>{cat.categoria}</td>
                                <td>{cat.total_vendido}</td>
                                <td>{cat.num_ordenes}</td>
                                <td>S/ {Number(cat.ingresos).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
