import * as React from "react";
import { StatisticsProps } from "./types";

import "./index.css";

const Statistics: React.FC<StatisticsProps> = ({
  title,
  amount,
  growth,
}): JSX.Element => {
  return (
    <div className="Statistics">
      <p className="title">{title}</p>
      <p className="amount">{amount}</p>
      <p className="growth" style={{ color: growth < 0 ? "red" : "green" }}>
        {growth}%
      </p>
    </div>
  );
};

export default Statistics;
