import { ColumnsType } from '../../TableComponentUserDashboard/types';

export const columns: ColumnsType[] = [
  {
    id: 'subAccountUserId',
    label: 'Sub Account User Id',
    minWidth: 170,
    color: '#424242'
  },
  {
    id: 'machineType',
    label: 'Machine Type',
    minWidth: 137,
    align: 'left'
  },
  {
    id: 'numberOfMachines',
    label: 'Number Of Machines',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'machineWatt',
    label: 'Machine Power(Watt)',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'machineTH',
    label: 'Machine Computation Power(TH)',
    minWidth: 180,
    align: 'left'
  },
  {
    id: 'monthlyElectricityCost',
    label: 'Monthly Electricity Cost (+/- 5%)',
    minWidth: 180,
    align: 'left',
    format: (n) => `${isNaN(n) ? 0 : Number(n).toLocaleString('en-US')}$`
  },
  {
    id: 'minersCost',
    label: 'Cost of Miners',
    minWidth: 150,
    align: 'left',
    format: (n) => `${Number(n).toLocaleString('en-US')}$`
  },
  {
    id: 'electricityCost',
    label: 'Electricity Cost(KwH)',
    minWidth: 150,
    align: 'left',
    format: (n) => `${Number(n).toLocaleString('en-US')}$`
  },
  {
    id: 'hostingCost',
    label: 'Cost of Upfront',
    minWidth: 100,
    align: 'left',
    format: (n) => `${Number(n).toLocaleString('en-US')}$`
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'hostingCompany',
    label: 'Hosting Company',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'machineSupplier',
    label: 'Machine Supplier',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'totalInvestment',
    label: 'Total Investment',
    minWidth: 150,
    align: 'left',
    format: (n) => `${Number(n).toLocaleString('en-US')}$`
  },
  {
    id: 'hearstUpfront',
    label: 'Hearst Upfront',
    minWidth: 100,
    align: 'left',
    format: (n) => `${Number(n).toLocaleString('en-US')}$`
  },
  {
    id: 'yearToCapitalConstitution',
    label: 'Year To Capital Constitution',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'contractStartingDate',
    label: 'Contract Starting Date',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'timeToPlug',
    label: 'Time To Plug',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'plugDate',
    label: 'Plug Date',
    minWidth: 150,
    align: 'left'
  }
];
