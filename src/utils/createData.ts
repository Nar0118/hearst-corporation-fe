import moment from 'moment';
import { Active } from './enum/activeEnums';
import { formatNumberToTerra } from './formatNumberToTerra';
import { PoolSpeedBeanListTypes } from '../pages/Main/types';

export const createDataForCountriesTable = (
   id: number,
   country: string,
   sessions: number,
   views: number
) => ({ id, country, sessions, views });

export const createDataForHashrateMeasuredChart = (
   array: PoolSpeedBeanListTypes[],
   activeChart: string
) => {
  return {
    labels: array.map((elem: PoolSpeedBeanListTypes) =>
       moment(elem?.date).format(activeChart === Active.DAY ? 'MM/DD' : 'HH:MM')
    ),
    datasets: [
      {
        fill: true,
        data: array.map((elem: PoolSpeedBeanListTypes) => elem?.speed),
        borderColor: '#008000',
        pointBackgroundColor: '#008000',
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const { chart } = context;
          const { ctx } = chart;
          const gradient = ctx.createLinearGradient(0, 100, 0, 300);
          gradient.addColorStop(0, '#008000');
          gradient.addColorStop(1, '#00800030');
          return gradient;
        }
      }
    ]
  };
};

interface ChartDataset {
  fill: boolean;
  data: number[];
  borderColor: string;
  pointBackgroundColor: string;
  pointRadius: number;
  backgroundColor: string | ((context: any) => string);
}

export const createOptionsForHashrateMeasuredChart = (hashrateMeasuredData: {
  labels: string[];
  datasets: ChartDataset[];
}) => {
  return {
    aspectRatio: 2,
    scales: {
      x: {
        ticks: {
          minRotation: 0,
          maxRotation: 0,
          callback: (value: any) => {
            if (value % Math.ceil(hashrateMeasuredData.labels.length / 27) == 0) {
              return hashrateMeasuredData.labels[value];
            } else {
              return null;
            }
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            return formatNumberToTerra(value);
          }
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
};