import React, { useEffect, useRef, useState } from 'react';
import type { ChartArea, ChartData } from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { colors, data } from '../../../constants/chart';
import { getRandomColor } from '../../../utils/getRandomColor';

import './index.css';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Tooltip,
   Legend
);

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = getRandomColor(colors);
  let colorMid, colorEnd;
  
  do {
    colorMid = getRandomColor(colors);
  } while (colorMid === colorStart);
  
  do {
    colorEnd = getRandomColor(colors);
  } while (colorEnd === colorStart || colorEnd === colorMid);
  
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);
  
  return gradient;
}

const ChartComponent = (): JSX.Element => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: []
  });
  
  useEffect(() => {
    const chart = chartRef.current;
    
    if (!chart) {
      return;
    }
    
    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea)
      }))
    };
    
    setChartData(chartData);
  }, []);
  
  return (
     <div className="chart">
       <Chart ref={chartRef} type="line" data={chartData} />
     </div>
  );
};

export default ChartComponent;
