import React from "react";
import Chart from "../components/Chart";
import MultiAxesChart from "../components/MultiAxesChart";

function Home() {
  return (
    <div className="flex flex-col lg:flex-row pb-20">
      <Chart />
      <MultiAxesChart />
    </div>
  );
}

export default Home;
