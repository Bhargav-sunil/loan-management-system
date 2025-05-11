import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyOutstandingBarChart = ({ monthlyData }) => {
  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Outstanding Loans',
        data: monthlyData,
        backgroundColor: '#007bff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>Total Outstanding Open Loans - Monthly</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlyOutstandingBarChart;
