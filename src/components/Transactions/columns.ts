import { ColumnsType } from "../TableComponentUserDashboard/types";

export const columns: ColumnsType[] = [
  {
    id: "timestamp",
    label: "Earnings Date",
    minWidth: 100,
    align: "left",
    color: "#424242",
    format: (n) => `${n.toLocaleString().slice(0, 10)}`,
  },
  {
    id: "hashrate",
    label: "Daily Hashrate(TH/s)",
    minWidth: 100,
    align: "left",
    color: "#424242",
  },
  {
    id: "ppappsAmount",
    subId: "ppapplnsAmount",
    label: "Earnings(BTC)",
    minWidth: 100,
    align: "left",
    color: "#424242",
  },
];
