import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Purchase and sales ratio',
    },
  },
};




export function Chart(props) {
  
  
const labels = [props.date];

 const data = {
  labels,
  datasets: [
    {
      label: 'Purchases',
      data: labels.map(() => props.purchase),
      backgroundColor: 'red',
    },
    {
      label: 'Sales',
      data: labels.map(() => props.sales),
      backgroundColor: 'green',
    },
  ],
};  
  return <Bar options={options} data={data} />;
}
