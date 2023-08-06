import Chart from "react-apexcharts";
import { Vote } from "../../types/types";

interface props {
  State: Vote[];
}

const PieChart = (Props: props) => {
  // console.log(Props);

  let options: ApexCharts.ApexOptions = {
    labels: Props.State.map((e) => {
      return String(e.info.Session_id);
    }),
    colors: [
      "#33b2df",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    legend: {
      show: true,
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      // fontFamily: "Trebuchet MS",

      fontWeight: 500,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: ["#00000"],
      },
      markers: {
        width: 14,
        height: 14,
        strokeWidth: 0,
        fillColors: undefined,
        radius: 16,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,

        offsetY: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  let series: ApexAxisChartSeries | ApexNonAxisChartSeries = Props.State.map(
    (e) => {
      return Number(((e.info.Avg * 100) / 40).toFixed(2));
    }
  );

  return <Chart options={options} series={series} type="pie"></Chart>;
};

export default PieChart;
