import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../Utils";
import noDataToDisplay from "highcharts/modules/no-data-to-display";

// Initialize the noData module
noDataToDisplay(Highcharts);

function MultiAxesChart() {
  const token = localStorage.getItem("token");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [loading, setIsLoading] = useState(true);
  const [energyData, setEnergyData] = useState(null);
  const [energyType, setEnergyType] = useState(
    localStorage.getItem("menergyType") ?? "all"
  );
  const [dateRange, setDateRange] = useState(
    localStorage.getItem("mdateRange") ?? "all"
  );
  const [dateFilter, setDateFilter] = useState(
    localStorage.getItem("mdateFilter")
      ? JSON.parse(localStorage.getItem("mdateFilter"))
      : {
          start_datetime: null,
          end_datetime: null,
        }
  );

  useEffect(() => {
    axios
      .get(`${URL}/energy/filter`, {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          start_datetime: dateFilter.start_datetime ?? null,
          end_datetime: dateFilter.end_datetime ?? null,
          energy_source: energyType,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let modifiedData = res.data;
          modifiedData = modifiedData.map((row) => {
            let DateObj = new Date(row.timestamp);
            let month = DateObj.getMonth();
            return {
              ...row,
              date: months[month] + " " + DateObj.getFullYear(),
            };
          });
          setEnergyData(modifiedData);
        }
        setIsLoading(false);
      })
      .catch((e) => console.log("error", e));
  }, []);

  if (loading) {
    return (
      <div className=" flex h-screen justify-center items-center m-auto">
        Loading...
      </div>
    );
  }

  const energyOptions = {
    chart: {
      zoomType: "xy",
    },
    title: {
      text: "Net Energy (KWh) vs Consumption vs. Generation Trends",
    },
    xAxis: {
      title: {
        text: "Timestamp",
      },
      categories:
        energyData &&
        energyData.length > 0 &&
        energyData.map((entry) => entry.date),
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value} KWh",
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        title: {
          text: "Generation",
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: "Net Energy (KWh)",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          format: "{value} KWh",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: "Consumption",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        labels: {
          format: "{value} KWh",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b>
                <br/>
                <br/>
                ${
                  this.series.name === "Net Energy (KWh)"
                    ? `Net Energy (KWh): ${this.y}`
                    : ""
                }
                ${
                  this.series.name === "Consumption"
                    ? `Consumption: ${this.y} KWh`
                    : ""
                }
                ${
                  this.series.name === "Generation"
                    ? `Generation: ${this.y} KWh`
                    : ""
                }
                <br/>
                <br/>
                Energy Source: ${this.point.energy_source}`;
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 80,
      verticalAlign: "top",
      y: 55,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "Net Energy (KWh)",
        type: "column",
        yAxis: 1,
        data:
          energyData &&
          energyData.length > 0 &&
          energyData.map((entry) => ({
            y: entry.generation - entry.consumption,
            energy_source: entry.energy_source,
          })),
        tooltip: {
          valueSuffix: " KWh",
        },
      },
      {
        name: "Consumption",
        type: "spline",
        yAxis: 2,
        data:
          energyData &&
          energyData.length > 0 &&
          energyData.map((entry) => ({
            y: entry.consumption,
            energy_source: entry.energy_source,
          })),
        marker: {
          enabled: false,
        },
        dashStyle: "shortdot",
        tooltip: {
          valueSuffix: " KWh",
        },
      },
      {
        name: "Generation",
        type: "spline",
        data:
          energyData &&
          energyData.length > 0 &&
          energyData.map((entry) => ({
            y: entry.generation,
            energy_source: entry.energy_source,
          })),
        tooltip: {
          valueSuffix: " KWh",
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              floating: false,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            },
            yAxis: [
              {
                labels: {
                  align: "right",
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                labels: {
                  align: "left",
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                visible: false,
              },
            ],
          },
        },
      ],
    },
  };

  const makeAPICall = async (startDate, endDate, energyType) => {
    await axios
      .get(`${URL}/energy/filter`, {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          start_datetime: startDate,
          end_datetime: endDate,
          energy_source: energyType,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let modifiedData = res.data;
          modifiedData = modifiedData.map((row) => {
            let DateObj = new Date(row.timestamp);
            let month = DateObj.getMonth();
            return {
              ...row,
              date: months[month] + " " + DateObj.getFullYear(),
            };
          });
          setEnergyData(modifiedData);
        } else {
          setEnergyData(null);
          localStorage.removeItem("mdateFilter");
          localStorage.removeItem("menergyType");
        }
        setIsLoading(false);
      })
      .catch((e) => console.log("error", e));
  };

  const changeEnergyType = async (event) => {
    setEnergyType(event.target.value);
    localStorage.setItem("menergyType", event.target.value);
    await makeAPICall(
      dateFilter.start_datetime,
      dateFilter.end_datetime,
      event.target.value
    );
  };

  const changeDateRange = async (event) => {
    setDateRange(event.target.value);
    localStorage.setItem("mdateRange", event.target.value);
    let currentTimestamp = new Date();
    let currentDatetime = new Date(
      currentTimestamp.toISOString().slice(0, -1) + "Z"
    );
    let startDatetime, endDatetime;

    switch (event.target.value) {
      case "hour":
        startDatetime = new Date(currentDatetime);
        startDatetime.setUTCHours(startDatetime.getUTCHours() - 1); // Set to 1 hour back
        endDatetime = new Date(currentDatetime);
        break;
      case "yesturday":
        startDatetime = new Date(currentDatetime);
        startDatetime.setDate(startDatetime.getDate() - 1);
        startDatetime.setUTCHours(0, 0, 0, 0); // Set to yesterday Morning
        endDatetime = new Date(currentDatetime);
        endDatetime.setDate(endDatetime.getDate() - 1);
        endDatetime.setUTCHours(23, 59, 59, 999); // Set to yesterday Midnight
        break;
      case "week":
        startDatetime = new Date(currentDatetime);
        startDatetime.setDate(startDatetime.getDate() - 7); // Set to 1 week back
        startDatetime.setUTCHours(0, 0, 0, 0);
        endDatetime = new Date(currentDatetime);
        break;
      case "month":
        startDatetime = new Date(
          currentDatetime.getFullYear(),
          currentDatetime.getMonth() - 1,
          1
        );
        if (
          startDatetime.getMonth() === 11 &&
          currentDatetime.getMonth() === 0
        ) {
          startDatetime.setFullYear(currentDatetime.getFullYear() - 1);
        }
        startDatetime.setUTCHours(0, 0, 0, 0); // Set to 1 month back
        endDatetime = new Date(currentDatetime);
        break;
      case "qaurter":
        // Calculate startDatetime and endDatetime for the past quarter
        startDatetime = new Date(
          currentDatetime.getFullYear(),
          currentDatetime.getMonth() - 3,
          1
        );
        if (startDatetime.getMonth() >= 9 && currentDatetime.getMonth() <= 2) {
          startDatetime.setFullYear(currentDatetime.getFullYear() - 1);
        }
        startDatetime.setUTCHours(0, 0, 0, 0);
        endDatetime = new Date(currentDatetime);
        break;
      case "halfyear":
        // Calculate startDatetime and endDatetime for the past half year
        startDatetime = new Date(
          currentDatetime.getFullYear(),
          currentDatetime.getMonth() - 6,
          1
        );
        if (startDatetime.getMonth() >= 6 && currentDatetime.getMonth() <= 6) {
          startDatetime.setFullYear(currentDatetime.getFullYear() - 1);
        }
        startDatetime.setUTCHours(0, 0, 0, 0);
        endDatetime = new Date(currentDatetime);
        break;
      case "year":
        startDatetime = new Date(
          currentDatetime.getFullYear() - 1,
          currentDatetime.getMonth(),
          1
        );
        startDatetime.setUTCHours(0, 0, 0, 0);
        endDatetime = new Date(currentDatetime);
        break;
      default:
        // Handle default case
        startDatetime = null;
        endDatetime = null;
        break;
    }

    const startDateISO = startDatetime
      ? startDatetime.toISOString().substring(0, 19)
      : null;
    const endDateISO = endDatetime
      ? endDatetime.toISOString().substring(0, 19)
      : null;

    setDateFilter({
      start_datetime: startDateISO,
      end_datetime: endDateISO,
    });
    localStorage.setItem(
      "mdateFilter",
      JSON.stringify({
        start_datetime: startDateISO,
        end_datetime: endDateISO,
      })
    );

    await makeAPICall(startDateISO, endDateISO, energyType);
  };

  return (
    <div className="flex flex-col m-auto items-center justify-center w-[100%] md:w-[50%]">
      <div className="pt-10 flex flex-col md:flex-row">
        <label
          htmlFor="select-1"
          className="block text-lg font-medium mb-2 dark:text-white"
        >
          <strong>Multiple Axes Chart</strong>
        </label>
      </div>
      <div className="p-10 pt-5 flex flex-col md:flex-row md:justify-between md:gap-12">
        <div className="my-4">
          <label
            htmlFor="select-1"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            <strong>Select Energy Source</strong>
          </label>
          <div className="relative">
            <select
              id="select-1"
              className="py-3 px-4 pe-16 block w-full border-1 border-gray-600 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              onChange={(event) => changeEnergyType(event)}
              defaultValue={energyType}
            >
              <option value="all">All</option>
              <option value="solar">Solar</option>
              <option value="wind">Wind</option>
              <option value="hydro">Hydro</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="my-4">
          <label
            htmlFor="select-1"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            <strong>Select Date Filter</strong>
          </label>
          <div className="relative">
            <select
              id="select-1"
              className="py-3 px-4 pe-16 block w-full border-1 border-gray-600 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              onChange={(event) => changeDateRange(event)}
              defaultValue={dateRange}
            >
              <option value="all">All</option>
              <option value="hour">Past Hour</option>
              <option value="yesturday">Yesturday</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="qaurter">Past Quarter</option>
              <option value="halfyear">Past Half Year</option>
              <option value="year">Past Year</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-[100%] py-8 h-[500px]">
        {energyData && energyData.length > 0 ? (
          <div className="w-[85%]">
            <HighchartsReact highcharts={Highcharts} options={energyOptions} />
          </div>
        ) : (
          <div className="no-data-message">No data to display</div>
        )}
      </div>
    </div>
  );
}

export default MultiAxesChart;
