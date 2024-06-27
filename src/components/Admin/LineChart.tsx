import Chart from "react-apexcharts";
import { AttendanceByDay } from "../../services/User";
import { useEffect } from "react";
import { ApexOptions } from "apexcharts";

type Line = {
  data: AttendanceByDay[];
};

export default function ({ data }: Line) {
  const getGraph = () => {
    const xaxisCategories: string[] = [];
    const seriesData: number[] = [];
    console.log("data", data);

    data?.forEach((item) => {
      xaxisCategories.push(item.scan_date);
      seriesData.push(item.total_scans);
    });

    console.log("data", xaxisCategories);
    return {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: xaxisCategories,
        },
        stroke: {
          curve: "smooth",
        },
      },
      series: [
        {
          name: "Total Scans",
          data: seriesData,
        },
      ],
    };
  };

  useEffect(() => {
    getGraph();
  }, [data]);

  return (
    <div className="flex flex-col pt-6 ">
      <h3 className="font-bold pt-3">Total number of scans over the period</h3>
      <Chart
        options={getGraph().options as ApexOptions}
        series={getGraph().series}
        type="line"
        width="750"
      />
    </div>
  );
}
