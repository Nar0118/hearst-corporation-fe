export type MachineFilterTypes = {
  machineType: string;
};

export type ContractIdsTypes = {
  id: number;
};

type RowsTypes = {
  fppsBlockAmount: string;
  fppsFeeAmount: string;
  hashrate: string;
  hashrate_unit: string;
  ppapplnsAmount: string;
  ppappsAmount: string;
  pplnsAmount: string;
  ppsAmount: string;
  soloAmount: string;
  timestamp: string;
};

export type PoolSpeedBeanListTypes = {
  speed: number;
  date: number;
};

export type DailyHourlDataTypes = {
  coin: string;
  poolSpeedBeanList: PoolSpeedBeanListTypes[];
  unit: string;
};

export interface MachineTypes extends MachineFilterTypes {
  count: number;
}

export interface DashboardDataHashrateDataArray {
  dailyData: DailyHourlDataTypes[];
  hourlyData: DailyHourlDataTypes[];
}

export interface IPaymentTypes {
  page: number;
  pageSize: number;
  rows: RowsTypes[];
  subAccountApiKey: string;
  subAccountApiSecret: string;
  subAccountUserId: string;
  totalPage: number;
  totalRecord: number;
}

export interface IDashboardDataContractsValueTypes {
  lastMonthMined: number;
  lastMonthMinedPercent: number;
  lastMonthRevenue: number;
  lastMonthRevenuePercent: number;
  lastMonthApy: number;
  lastMonthApyPercent: number;
  hashRate: number;
  hashRatePercent: number;
  numberOfMachines: number;
}

export interface IDashboardDataContractsAggregatedTypes
  extends IDashboardDataContractsValueTypes {
  lastMonthApyAvg: number;
}
