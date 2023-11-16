import { DailyHourlDataTypes } from '../../../pages/Main/types';

export interface HasrateMeasuredChartEndProps {
  items: {
    dailyData: DailyHourlDataTypes;
    hourlyData: DailyHourlDataTypes;
  };
  hashrateCaluculated: boolean;
}