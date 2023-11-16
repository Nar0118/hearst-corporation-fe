export interface Column {
  id:
    | "id"
    | "machineType"
    | "numberOfMachines"
    | "hostingCost"
    | "machineWatt"
    | "machineTH"
    | "electricityCost"
    | "minersCost"
    | "upfront"
    | "location"
    | "hostingCompany"
    | "machineSupplier"
    | "totalInvestment"
    | "hearstUpfront"
    | "yearToCapitalConstitution"
    | "contractStartingDate"
    | "timeToPlug"
    | "plugDate";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

export interface Data {
  id: string;
  machineType: string;
  numberOfMachines: number;
  machineWatt: number;
  machineTH: number;
  electricityCost: number;
  minersCost: number;
  hostingCost: number;
  upfront: number;
  location: string;
  hostingCompany: string;
  machineSupplier: string;
  totalInvestment: number;
  hearstUpfront: number;
  yearToCapitalConstitution: number;
}
