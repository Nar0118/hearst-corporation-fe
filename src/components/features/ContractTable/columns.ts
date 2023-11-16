import { ColumnsType } from '../../TableComponentUserDashboard/types';

export const columns: ColumnsType[] = [
    {
        id: "id",
        label: "ID",
        minWidth: 100,
        align: "left",
        color: "#424242"
    }, {
        id: "subAccountUserId",
        label: "Contract Name",
        minWidth: 120,
        align: "left",
    }, {
        id: "customerEmail",
        label: "Customer Email",
        minWidth: 100,
        align: "left",
    }, {
        id: "machineType",
        label: "Machine Type",
        minWidth: 150,
        align: "left",
    }, {
        id: "numberOfMachines",
        label: "Number Of Machines",
        minWidth: 100,
        align: "left",
    }, {
        id: "machineWatt",
        label: "Unit Power (watt)",
        minWidth: 100,
        align: "left",
    }, {
        id: "machineTH",
        label: "Unit Hashrate (TH)",
        minWidth: 100,
        align: "left",

    }, {
        id: "electricityCost",
        label: "Electricity & Hosting (KWh)",
        minWidth: 100,
        align: "left",
        format: (n) => `${Number(n).toLocaleString("en-US")}$`
    }, {
        id: "minersCost",
        label: "Cost Of Miners Installed",
        minWidth: 100,
        align: "left",
    }, {
        id: 'monthlyElectricityCost',
        label: 'Monthly Electricity Cost (+/- 5%)',
        minWidth: 180,
        align: 'left',
        format: (n) => `${isNaN(n) ? 0 : Number(n).toLocaleString("en-US")}$`
    }, {
        id: "hostingCost",
        label: "Cost Of Hosting Upfront",
        minWidth: 100,
        align: "left",
        format: (n) => `${n}$`
    }, {
        id: "location",
        label: "Location",
        minWidth: 100,
        align: "left",
    }, {
        id: "hostingCompany",
        label: "Hosting Company",
        minWidth: 100,
        align: "left",
    }, {
        id: "machineSupplier",
        label: "Machine Supplier",
        minWidth: 100,
        align: "left",
    }, {
        id: "totalInvestment",
        label: "Total Investment",
        minWidth: 100,
        align: "left",
    }, {
        id: "hearstUpfront",
        label: "Hearst Upfront",
        minWidth: 100,
        align: "left",
    }, {
        id: "yearToCapitalConstitution",
        label: "Year To Capital Constitution",
        minWidth: 100,
        align: "left",
    }, {
        id: "lastMonthMined",
        label: "Last Month Mined",
        minWidth: 100,
        align: "left",
    }, {
        id: "lastMonthRevenue",
        label: "Last Month Revenue",
        minWidth: 100,
        align: "left",
    }, {
        id: "lastMonthApy",
        label: "Last Month Apy",
        minWidth: 100,
        align: "left",
    }, {
        id: "lastMonthMinedPercent",
        label: "Last Month Mined Percent",
        minWidth: 100,
        align: "left",
    }, {
        id: "hashRate",
        label: "Hash Rate",
        minWidth: 100,
        align: "left",
    }, {
        id: "hashRatePercent",
        label: "Hash Rate Percent",
        minWidth: 100,
        align: "left",
    }, {
        id: "subAccountApiKey",
        label: "Sub Account Api Key",
        minWidth: 100,
        align: "left",
    }, {
        id: "subAccountApiSecret",
        label: "Sub Account Api Secret",
        minWidth: 100,
        align: "left",
    }, {
        id: "contractStartingDate",
        label: "Contract Starting Date",
        minWidth: 100,
        align: "left",
    }, {
        id: "timeToPlug",
        label: "Time To Plug",
        minWidth: 100,
        align: "left",
    }, {
        id: "plugDate",
        label: "Plug Date",
        minWidth: 100,
        align: "left",
    }, {
        id: "contractStatus",
        label: "Contract Status",
        minWidth: 130,
        align: "left",
    }]
