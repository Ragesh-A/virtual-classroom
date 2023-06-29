import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = ({text = '', arrayOfData = []}) => {
  
  const [label, values] = arrayOfData;

 
    const data = {
      labels: label,
      datasets: [
        {
          fill: true,
          label: 'amount',
          data: values,
          borderColor: '#6060D8',
          backgroundColor: '#6060D899',
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text
        },
      },
    };


  return (
    <>
    {
      data && values && <Line options={options}  data={data}/>
    }
    </>
  )
};

export default LineChart;