import { useContext, useEffect, useMemo, useState } from 'react';
import DistributionPerCountry from '../../components/DestributionPerCountry';
import Total from '../../components/Totals';
import HasrateMesuredChartEnd from '../../components/features/hashrateMeasuredChart';
import Header from '../../components/features/header';
import MinerChart from '../../components/features/minerChart';
import TableDashboard from '../../components/features/tableDashboard';
import RevenueChart from '../../components/shared/RevenueChart';
import WorldMap from '../../components/shared/WorldMap';
import Progress from '../../components/shared/Progress';
import TransactionTable from '../../components/Transactions';
import { AuthContext, IAuthContext } from '../../contexts/authContext';
import { API } from '../../services/axios';
import {
  DashboardDataHashrateDataArray,
  IDashboardDataContractsAggregatedTypes,
  IDashboardDataContractsValueTypes,
  IPaymentTypes,
  MachineFilterTypes,
  MachineTypes,
  PoolSpeedBeanListTypes
} from './types';
import { groupDataAndSumValue } from '../../utils/groupDataAndSumValue';

import './Main.css';

const Main = () => {
  const { user } = useContext(AuthContext) as IAuthContext;
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [hashrateDataArray, setHashrateDataArray] = useState<any>(null);
  const [payments, setPayments] = useState<IPaymentTypes[] | null>(null);
  const [value, setValue] = useState([
    new Date(new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000),
    new Date()
  ]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [machineTypes, setMachineTypes] = useState<MachineTypes[]>([]);
  const [hashrateCaluculated, setHashrateCaluculated] =
    useState<boolean>(false);

  const hashrateData = useMemo(() => {
    const poolSpeedBeanListDaily: PoolSpeedBeanListTypes[] = [];
    const poolSpeedBeanListHorly: PoolSpeedBeanListTypes[] = [];

    if (hashrateDataArray?.length) {
      hashrateDataArray?.forEach(
        (item: DashboardDataHashrateDataArray) => {
          item?.dailyData &&
            poolSpeedBeanListDaily.push(
              ...item?.dailyData?.[0]?.poolSpeedBeanList
            );
          item?.hourlyData &&
            poolSpeedBeanListHorly.push(
              ...item?.hourlyData?.[0]?.poolSpeedBeanList
            );
        }
      );
    }

    return {
      dailyData: {
        unit: hashrateDataArray?.[0]?.dailyData?.[0].unit,
        coin: hashrateDataArray?.[0]?.dailyData?.[0].coin,
        poolSpeedBeanList: groupDataAndSumValue(poolSpeedBeanListDaily)
      },
      hourlyData: {
        unit: hashrateDataArray?.[0]?.hourlyData?.[0].unit,
        coin: hashrateDataArray?.[0]?.hourlyData?.[0].coin,
        poolSpeedBeanList: groupDataAndSumValue(poolSpeedBeanListHorly)
      }
    };
  }, [hashrateDataArray]);

  const aktUser = useMemo(() => user?.email === 'akt001@gmail.com', [user]);

  const fetchDashboardData: (
    contractIds?: string[],
    machineIds?: string[],
    val?: Date[]
  ) => Promise<void> = async (contractIds, machineIds, val) => {
    try {
      setPayments(null);
      const [startDate, endDate] = val || value;

      const params = {
        startDate,
        endDate,
        contractIds: contractIds || [],
        machineIds
      };
      setIsLoad(true);
      setHashrateCaluculated(false);

      const { data: aaa } = await API.get('/dashboard/first', { params });

      const mergedData = aaa.allContracts.reduce((acc: MachineTypes[], obj: MachineFilterTypes) => {
        const existingObj = acc.find(item => item.machineType === obj.machineType);
        !existingObj ? acc.push({ machineType: obj.machineType, count: 1 }) : existingObj.count++;
        return acc;
      }, []);

      setMachineTypes(mergedData);
      setIsLoad(false);
      setDashboardData({ ...aaa });
      const [dashboardResponse, paymentResponse] = await Promise.all([
        API.get('/dashboard', { params: { param: JSON.stringify({ ...params, contracts: aaa.contracts }) } }),
        API.get('/dashboard/payment', { params })
      ]);

      setHashrateDataArray(dashboardResponse.data?.hashrateDataArray)
      setHashrateCaluculated(true);
      setPayments(paymentResponse.data);
    } catch {
    }
  };

  const percentValues = useMemo(() => {
    const aggregatedData = dashboardData?.contracts?.reduce(
      (
        aggregated: IDashboardDataContractsAggregatedTypes,
        value: IDashboardDataContractsValueTypes
      ) => {
        return {
          lastMonthMined: aggregated.lastMonthMined + value.lastMonthMined,
          lastMonthMinedPercent: aggregated.lastMonthMinedPercent + value.lastMonthMinedPercent,
          lastMonthRevenue: aggregated.lastMonthRevenue + value.lastMonthRevenue,
          lastMonthRevenuePercent: aggregated.lastMonthRevenuePercent
            + value.lastMonthRevenuePercent,
          lastMonthApyAvg: aggregated.lastMonthApyAvg + value.lastMonthApy,
          lastMonthApyPercent: aggregated.lastMonthApyPercent + value.lastMonthApyPercent,
          hashRate: aggregated.hashRate + value.hashRate,
          hashRatePercent: aggregated.hashRatePercent + value.hashRatePercent,
          numberOfMachines: aggregated.numberOfMachines + value.numberOfMachines
        };
      }
      , {
        lastMonthMined: 0,
        lastMonthMinedPercent: 0,
        lastMonthRevenue: 0,
        lastMonthRevenuePercent: 0,
        lastMonthApyAvg: 0,
        lastMonthApyPercent: 0,
        hashRate: 0,
        hashRatePercent: 0,
        numberOfMachines: 0
      });
    return aggregatedData ? [
      {
        title: 'TOTAL MACHINES',
        value: aggregatedData.numberOfMachines,
        percent: '0%',
        percentValue: 0
      },
      {
        title: 'HASHRATE',
        value: aktUser ? '22.52' : aggregatedData.hashRate / 1000,
        percent: `${aggregatedData.hashRatePercent}%`,
        currency: 'PH/S',
        percentValue: Number(aggregatedData.hashRatePercent)
      },
      {
        title: 'LAST MONTH MINED',
        value: aktUser ? '0 BTC' : aggregatedData.lastMonthMined,
        percent: aktUser ? '0%' : `${aggregatedData.lastMonthMinedPercent}%`,
        currency: 'BTC',
        percentValue: Number(aggregatedData.lastMonthMinedPercent)
      },
      {
        title: 'LAST MONTH REVENUE',
        value: aktUser ? '0 BTC' : aggregatedData.lastMonthRevenue,
        percent: aktUser ? '0%' : `${aggregatedData.lastMonthRevenuePercent}%`,
        currency: 'BTC',
        percentValue: Number(aggregatedData.lastMonthRevenuePercent)
      },
      {
        title: 'LAST MONTH APY',
        value:
          aktUser ? '40.06'
            : (aggregatedData.lastMonthApyAvg / dashboardData?.contracts?.length || 0),
        percent: aktUser ? '0%' : `${(aggregatedData.lastMonthApyPercent
          / dashboardData?.contracts?.length).toFixed(1) || 0}%`,
        percentValue: Number((aggregatedData.lastMonthApyPercent
          / dashboardData?.contracts?.length).toFixed(1)
          || 0)
      }
    ] : [];
  }, [aktUser, dashboardData?.contracts]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      {!dashboardData ? (
        <Progress className="loadingUserTable" />
      ) : (
        <div className="main-container">
          <Header
            value={value}
            machineTypes={machineTypes}
            setValue={setValue}
            setFilter={fetchDashboardData}
            allContracts={dashboardData?.allContracts}
          />
          {!dashboardData || isLoad ? (
            <Progress className="loadingUserTable" />
          ) : (
            <div className="block-container">
              <div className="first-charts">
                {dashboardData?.machineByMachineType && (
                  <MinerChart items={dashboardData?.machineByMachineType} />
                )}
                <HasrateMesuredChartEnd
                  items={hashrateData}
                  hashrateCaluculated={hashrateCaluculated}
                />
              </div>
              <div className="percents">
                {percentValues?.map((el) => (
                  <Total
                    currency={el.currency}
                    title={el.title}
                    value={
                      aktUser ? el.value : Number(el.value).toLocaleString()
                    }
                    percent={el.percent}
                    percentValue={el.percentValue}
                  />
                ))}
              </div>
              <div className="charts-map">
                {dashboardData?.machineByLocation && (
                  <WorldMap items={dashboardData?.machineByLocation} />
                )}
                {dashboardData?.machineByLocation && (
                  <DistributionPerCountry
                    items={dashboardData?.machineByLocation}
                  />
                )}
                {dashboardData?.revenues && (
                  <RevenueChart items={dashboardData?.revenues} />
                )}
              </div>
              {dashboardData?.contracts && (
                <TableDashboard items={dashboardData?.contracts} />
              )}
              <div className="payment-title">
                Payment Amounts for Each Contract
              </div>
              <TransactionTable
                items={payments?.[0]}
                contracts={dashboardData?.contracts}
                setFilter={fetchDashboardData}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Main;
