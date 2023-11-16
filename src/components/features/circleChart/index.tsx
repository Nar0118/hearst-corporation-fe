import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { data } from '../../../constants/circleChart';

import '../chart/index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CircleChart(): JSX.Element {
  return <Doughnut className="doughnut" data={data} />;
}
