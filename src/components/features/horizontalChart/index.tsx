import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import "../chart/index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Direct", "Paid Search", "Display", "Affiliates", "(Other)"];
const redValues = [
  [0, 1],
  [0, 0.32],
];
const greenValues = [
  [0, 2],
  [0, 1],
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: redValues.map((el) => el),
      backgroundColor: "red",
    },
    {
      label: "Dataset 2",
      data: redValues.map((el) => el),
      backgroundColor: "green",
    },
  ],
};

export default function HorizontalChartComponent(): JSX.Element {
  return (
    <div className="chart">
      <Bar options={options} data={data} />
    </div>
  );
}
