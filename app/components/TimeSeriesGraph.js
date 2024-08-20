// app/components/TimeSeriesGraph.js
"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TimeSeriesGraph = ({ data, attribute }) => {
  const timestamps = Object.keys(data);
  const values = timestamps.map(timestamp => data[timestamp].profile_log[attribute]);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: attribute,
        data: values,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        title: {
          display: true,
          text: attribute,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeSeriesGraph;
