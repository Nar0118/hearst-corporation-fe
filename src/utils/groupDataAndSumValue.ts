import { PoolSpeedBeanListTypes } from '../pages/Main/types';

export const groupDataAndSumValue = (
  array: PoolSpeedBeanListTypes[]
): PoolSpeedBeanListTypes[] => {
  var result: PoolSpeedBeanListTypes[] = [];
  array.reduce(
    (
      res: Record<number, PoolSpeedBeanListTypes>,
      value: PoolSpeedBeanListTypes
    ) => {
      const date = value.date;
      if (!res[date]) {
        res[date] = { date: date, speed: 0 };
        result.push(res[date]);
      }
      res[date].speed += Number(value.speed ?? 0);
      return res;
    },
    {}
  );
  return result;
};