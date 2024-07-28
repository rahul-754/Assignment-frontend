import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const CourseWiseChart = ({ data }) => {
  const courseNames = Object.keys(data);
  const courseCounts = Object.values(data);

  const chartData = {
    labels: courseNames,
    datasets: [
      {
        label: 'Number of Employees',
        data: courseCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-96 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Employees by Course</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CourseWiseChart;
