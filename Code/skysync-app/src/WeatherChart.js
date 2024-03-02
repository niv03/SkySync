import React, { useEffect, useRef } from 'react';
// Importing Chart and the necessary component
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WeatherChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy the old chart instance if it exists
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('weatherChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.time),
                datasets: [{
                    label: 'Temperature',
                    data: data.map(item => item.value),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [data]);

    return <canvas id="weatherChart"></canvas>;
};

export default WeatherChart;
