import { TotalProps } from "./type";
import arrow_up from "../../assets/images/totals/arrow-up.svg";
import arrow_down from "../../assets/images/totals/arrow-down.svg";

import styles from "./totals.module.css";

const Total = ({
  title,
  value,
  percent,
  currency,
  percentValue
}: TotalProps): JSX.Element => {
  return (
    <div className={styles.total}>
      <div className={styles.title}>{title}</div>
      <div className={styles.container}>
        <div className={styles.values}>
          <div className={styles.value}>{value}</div>
          <div className={styles.currency}>
            {currency || (title !== "TOTAL MACHINES" && "%")}
          </div>
        </div>
        <div
          className={`${styles.percent} ${
            percentValue >= 0 && styles.percentGreen
          }`}
        >
          <img
            src={percentValue >= 0 ? arrow_up : arrow_down}
            alt="arrow"
          />
          <span className={styles.percentValue}>{percent}</span>
        </div>
      </div>
    </div>
  );
};

export default Total;
