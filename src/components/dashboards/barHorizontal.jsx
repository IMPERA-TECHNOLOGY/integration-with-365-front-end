import  {dataContext }  from '../context';
import { useContext, useEffect } from "react";



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
  
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Horizontal Bar Chart',
    },
  },
};







export function BarHorizontal() {

  const {
    ticket
  } = useContext(dataContext)

  const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  const monthValues = Array(12).fill(0)

  ticket.forEach(it => {
    const date = new Date(it.dateCreated)
    const dateMonth = date.getMonth()

    monthValues[dateMonth] += 1
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Tickets',
        data: monthValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return (
  <Bar options={options} data={data} />
  );
}

export default BarHorizontal;