import { UserType } from '../../features/AdminDashboard/types';

export interface IFormInput {
  id: string;
  customerEmail: string;
  machineType: string;
  machineNumber: number;
  machineWatt: number;
  machineTH: number;
  electricityCost: number;
  minersCost: number;
  hostingCost: number;
  location: string;
  hostingCompany: string;
  machineSupplier: string;
  totalInvestment: number;
  hearstUpfront: number;
  yearToCapitalConstitution: number;
  numberOfMachines: number;
  subAccountUserId: string;
  subAccountApiKey: string;
  subAccountApiSecret: string;
  contractStartingDate: string;
  timeToPlug: string;
  plugDate: string;
  lastMonthMined: number;
  lastMonthRevenue: number;
  lastMonthApy: number;
  lastMonthMinedPercent: number;
  lastMonthRevenuePercent: number;
  lastMonthApyPercent: number;
  hashRate: number;
  hashRatePercent: number;
  contractStatus: string;
  monthlyElectricityCost: string;
  user?: UserType;
}
