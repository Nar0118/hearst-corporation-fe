import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js/auto";
import { IProps, ItemsType } from "./types";

import "./index.css";

Chart.register(CategoryScale, LinearScale, BarElement);

const DistributionPerCountry = ({ items }: IProps): JSX.Element => {
  const data = {
    labels: items.map((elem: ItemsType) => elem.location),
    datasets: [
      {
        axis: "y",
        data: items.map((elem: ItemsType) => elem.machineNumber),
        fill: false,
        backgroundColor: ["#008000"],
        borderRadius: 24,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: false,
      },
    },
    aspectRatio: 1,
    scales: {
      x: {
        ticks: {
          display: true,
          maxTicksLimit: 5,
          callback: (value: string | number, index: number) =>
            index % 1 > 0
              ? null
              : (Number(value) < 1000 ? value : Number(value) / 1000) + "k",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 9,
        },
      },
    },
  };

  return (
    <div className="distribution">
      <div className="title">Distribution per Country</div>
      <Bar data={data} options={options} />
    </div>
  );
};
export default DistributionPerCountry;
