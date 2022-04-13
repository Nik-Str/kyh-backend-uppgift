//primeReact
import { Chart } from 'primereact/chart';

const ChartComp = ({ memory, subscription }) => {
  const total = Math.round(memory * 100) / 100;
  const rest = subscription - total;

  const data = {
    labels: ['MB'],
    datasets: [
      {
        label: 'Used memory mb',
        backgroundColor: '#125386',
        data: [total],
      },
      {
        label: 'Free memory mb',
        backgroundColor: '#212121',
        data: [rest],
      },
    ],
  };

  const option = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.219)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.219)',
        },
      },
      y: {
        stacked: true,
        ticks: {
          display: false,
          color: '#495057',
        },
        grid: {
          display: false,
          color: '#ebedef',
        },
      },
    },
  };

  return (
    <div className="p-3">
      <p className="text-sm text-center">Total Memory Usage</p>
      <Chart className="h-5rem" type="bar" data={data} options={option} />
    </div>
  );
};

export default ChartComp;
