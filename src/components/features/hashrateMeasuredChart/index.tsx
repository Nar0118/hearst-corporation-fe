import { useMemo, useState } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Active } from '../../../utils/enum/activeEnums';
import Progress from '../../shared/Progress';
import {
  createDataForHashrateMeasuredChart,
  createOptionsForHashrateMeasuredChart
} from '../../../utils/createData';
import { HasrateMeasuredChartEndProps } from './type';

import './index.css';

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

export default function HasrateMeasuredChartEnd({
  items,
  hashrateCaluculated
}: HasrateMeasuredChartEndProps) {
  const [activeChart, setActiveChart] = useState(Active.DAY);
  
  const hashrateMeasuredData = useMemo(() => {
    const speedList = items?.[activeChart === Active.DAY
       ? 'dailyData'
       : 'hourlyData']?.poolSpeedBeanList || [];
    
    return createDataForHashrateMeasuredChart(speedList, activeChart);
  }, [items, activeChart]);
  
  return (
     <div className="hashrateMeasuredHContainer" style={{
       ...(!hashrateCaluculated ? {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'
       } : {})
     }}>
       {!hashrateCaluculated ? <Progress /> : <>
         <h2>Hashrate measured (hours and day)</h2>
         <div className="hashrateMeasuredChart ">
           <div className="chartSwitch">
             <span
                onClick={() => setActiveChart(Active.DAY)}
                className={activeChart === Active.DAY ? 'selected' : 'disabled'}
             >
               One day
             </span>
             <span
                onClick={() => setActiveChart(Active.HOUR)}
                className={activeChart === Active.HOUR ? 'selected' : 'disabled'}
             >
               One hour
             </span>
           </div>
           {activeChart === Active.DAY && (
              <Line className="lineChart" options={createOptionsForHashrateMeasuredChart(
                 hashrateMeasuredData)} data={hashrateMeasuredData} />
           )}
           {activeChart === Active.HOUR && (
              <Line
                 className="lineChart"
                 options={createOptionsForHashrateMeasuredChart(hashrateMeasuredData)}
                 data={hashrateMeasuredData}
              />
           )}
         </div>
       </>
       }
     </div>
  );
}
