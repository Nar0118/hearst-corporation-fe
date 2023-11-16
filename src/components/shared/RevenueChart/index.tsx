import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

import "./index.css";

// TODO: Add Revenue type for items
const RevenueChart = ({ items }: any): JSX.Element => {
  const sortedRevenues = useMemo(
    () =>
      items?.sort((a: any, b: any) => {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      }),
    [items]
  );

  const labels = useMemo(
    () => sortedRevenues?.map((elem: any) => elem.date),
    [sortedRevenues]
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            if (value === 0.1) {
              return null;
            }
            return value;
          },
        },
      },
      x: {
        ticks: {
          minRotation: 0,
          maxRotation: 0,
          padding: 15,
          callback: (value: any) => {
            if (value % 2 === 0) {
              return moment(labels[value]).format("MMM DD");
            }
            return null;
          },
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Weekly average",
        // TODO: Add Revenue type for items
        data: sortedRevenues?.map((elem: any) => elem.weeklyAverage ?? 0) ?? [],
        borderColor: "#6db66d",
      },
      {
        label: "Daily",
        // TODO: Add Revenue type for items
        data: sortedRevenues?.map((elem: any) => elem.dailyAverage) ?? [],
        borderColor: "#215847",
      },
    ],
  };

  return (
    <div className="revenue-chart">
      <h2>Revenue per TH/S</h2>
      <div>
        <div>
          <div className="revenue-chart-color-1"></div>
          <span>Weekly average</span>
        </div>
        <div>
          <div className="revenue-chart-color-2"></div>
          <span>Daily</span>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default RevenueChart;
