import { useEffect, useState } from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "./index.css";

const colors = [
  "rgba(109, 182, 109, 1)",
  "rgba(72, 164, 72, 1)",
  "rgba(0, 128, 0, 1)",
  "rgba(182, 218, 182, 1)",
];
ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  items: {
    machineType: string;
    machineNumber: string;
  }[];
}
interface ChartData {
  datasets: any[],
  labels: string[]
}
interface ElemTypes {
  machineType: string;
  machineNumber: string;
}
// TODO: Add types
// TODO: Create a generic function for this and reuse
const groupDataAndSumValue = (array: any[]) => {
  var result: any = [];
  array.reduce(function (res, value) {
    const date = value.machineType;
    if (!res[date]) {
      res[date] = { machineType: date, machineNumber: 0 };
      result.push(res[date]);
    }
    res[date].machineNumber += value.machineNumber;
    return res;
  }, {});
  return result;
};

export default function MinerChart({ items }: IProps): JSX.Element {
  const [chartData, setChartData] = useState<ChartData | null>(null)

  useEffect(() => {
    const data = groupDataAndSumValue(items)
    const values = {
      labels: data.map((elem: ElemTypes) => elem.machineType),
      datasets: [
        {
          data: data.map((elem: ElemTypes) => elem.machineNumber),
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    };
    setChartData(values)
  }, [items])


  return (
    <div className="wrapper">
      <div>
        <h1 className="titleMiner">Miner per Type</h1>
      </div>
      <div className="minWrap">
        {chartData &&
          <Doughnut
            className="doughnut"
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: "#fff",
                  usePointStyle: true,
                  callbacks: {
                    title: (el: any) => el.label,
                    label: (el: any) => {
                      const total = el.dataset.data.reduce(
                        (a: number, b: number) => a + b,
                        0
                      );
                      return `${el.formattedValue} - ${Math.floor(
                        (el.dataset.data[el.dataIndex] * 100) / total
                      )}%`;
                    },
                  },
                  bodyColor: "#000000",
                  titleColor: "#000000",
                },
              },
            }}
          />
        }
        <div className="labels">
          {chartData?.labels.map((label: any) => (
            <div className="miner-chart-label">
              <span className="circle"></span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
