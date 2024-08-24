"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import this adapter to handle time scales
import 'tailwindcss/tailwind.css';

// Register ChartJS components including Filler for area fill
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler // Register Filler for area fill
);

const TimeSeriesGraph = ({ data, attribute }) => {
  console.log(data);
  console.log(attribute);

  const timestamps = Object.keys(data);
  if (timestamps.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{attribute}</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600">No data available for this attribute.</p>
        </div>
      </div>
    );
  }

  // Process data to handle different function_id segments
  const segments = [];
  let currentSegment = null;

  timestamps.forEach(timestamp => {
    const { function_id, profile_log } = data[timestamp];
    const value = profile_log[attribute];

    if (currentSegment && currentSegment.function_id === function_id) {
      currentSegment.data.push({ x: new Date(timestamp), y: value });
    } else {
      if (currentSegment) {
        segments.push(currentSegment);
      }
      currentSegment = {
        function_id,
        data: [{ x: new Date(timestamp), y: value }],
        color: getColorForFunctionId(function_id) // Get color based on function_id
      };
    }
  });

  if (currentSegment) {
    segments.push(currentSegment);
  }

  // Create dataset for each segment
  const datasets = segments.map(segment => ({
    label: `Function ID: ${segment.function_id}`,
    data: segment.data,
    borderColor: segment.color,
    backgroundColor: `${segment.color}80`, // Lighter color for fill
    borderWidth: 2,
    pointBackgroundColor: segment.color,
    pointBorderColor: '#fff',
    pointBorderWidth: 1,
    pointRadius: 3,
    fill: true,
  }));

  const chartData = {
    labels: timestamps.map(ts => new Date(ts)),
    datasets,
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
      title: {
        display: true,
        text: `Time Series of ${attribute.replace('_', ' ')}`,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'MMM d, yyyy h:mm:ss a', // Format for tooltips
        },
        title: {
          display: true,
          text: 'Timestamp',
          color: '#6b7280',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
          maxRotation: 45, // Rotate x-axis labels if needed
          minRotation: 30,
        },
      },
      y: {
        title: {
          display: true,
          text: attribute.replace('_', ' '),
          color: '#6b7280',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{attribute.replace('_', ' ')}</h2>
        <p className="text-gray-600">From {new Date(timestamps[0]).toLocaleString()} to {new Date(timestamps[timestamps.length - 1]).toLocaleString()}</p>
      </div>
      <div className="p-4">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

// Helper function to get color for each function_id
const getColorForFunctionId = (functionId) => {
  const colors = {
    "19555": "#4CAF50",
    "41611": "#FF5722",
    // Add more mappings if necessary
  };
  return colors[functionId] || '#2196F3'; // Default color if function_id not found
};

export default TimeSeriesGraph;
