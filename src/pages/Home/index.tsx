import ChartComponent from "../../components/features/chart";
import Statistics from "../../components/features/statistics";
import Map from "../../assets/images/map.png";
import HorizontalChartComponent from "../../components/features/horizontalChart";
import CircleChart from "../../components/features/circleChart";
import HorizontalChartEnd from "../../components/features/horizontalChartEnd";
import CountriesTable from "../../components/features/countriesTable";

import "./index.css";

const statistics = [
  {
    title: "Users",
    amount: 52.526,
    growth: 1.1,
  },
  {
    title: "Machines",
    amount: 9,
    growth: 3.7,
  },
  {
    title: "Wallets",
    amount: 63,
    growth: -3.1,
  },
  {
    title: "Contracts",
    amount: 52.526,
    growth: 1.1,
  },
];

const Home = () => {
  return (
    <div className="home">
      <div className="middlePart">
        <div className="leftPart">
          <div className="circleChart">
            <CircleChart />
          </div>
        </div>
        <div className="rightPart">
          <div className="horizontalPart">
            <HorizontalChartEnd />
          </div>
        </div>
      </div>
      <div className="statistics">
        {statistics.map((statistic) => (
          <Statistics {...statistic} />
        ))}
      </div>
      <div className="middlePart">
        <div className="item">
          <img src={Map} alt="" />
        </div>
        <div className="item">
          <p className="chartTitle">
            <b>Which channels are driving engagement?</b>
          </p>
          <HorizontalChartComponent />
        </div>
        <div className="item">
          <p className="chartTitle">
            <b>How are site sessions trending?</b>
          </p>
          <ChartComponent />
        </div>
      </div>
      <div className="countryReview">
        <div>
          <CountriesTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
