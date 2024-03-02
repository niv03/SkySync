import React, { useEffect } from 'react';
import Chart from 'chart.js';

const WeatherChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
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
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
    });
  }, [data]);

  return <canvas id="weatherChart"></canvas>;
};

export default WeatherChart;
