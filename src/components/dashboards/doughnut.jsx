import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext } from 'react';
import {dataContext} from '../context'
import { Grab } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tickets por Grupo', 
    },
  },
};



export function DoughnutChart() {

  const {
    ticket,
    apiTickets
  } = useContext(dataContext)

  const labels = ['ansa', 'IMPERA', 'CNC', 'bmCargo'];
  const groupValues = Array(labels.length).fill(0)

  if(apiTickets.length > 0 ) {
    apiTickets.forEach(it => {

      const index = labels.indexOf(it.company_name)

       if (index !== -1) {
        groupValues[index] += 1;
      }

    });
  }

const data = {

  labels: labels,
  datasets: [
    {
      label: "Cantidad de Tickets",
      data: groupValues,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  


  return <Doughnut data={data} options={options}/>;
}
