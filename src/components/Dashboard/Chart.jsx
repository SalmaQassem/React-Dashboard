import {
  Chart as ChartJS,
  CategoryScale, //x ais
  LinearScale, //y axis
  PointElement, //dots
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const Chart = () => {
  const [t, i18n] = useTranslation("global");
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: false,
      },
      y: {
        position: i18n.language === "en" ? "left" : "right",
        grid: {
          color: "#E7EBEC",
        },
        max: 400,
        min: 0,
        ticks: {
          stepSize: 100,
        },
      },
    },
    maintainAspectRatio: false,
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "Septemper",
    "October",
    "Novamber",
    "December",
  ];
  const config = {
    tension: 0.4,
    pointBackgroundColor: "#d11242",
    pointBorderColor: "#fff",
    pointBorderWidth: 2,
    pointRadius: 6,
    borderColor: "#000",
  };
  const setBackground = (context) => {
    const bgColor = ["rgba(209, 18, 66, 1)", "rgba(102, 102, 102, 0)"];
    if (!context.chart.chartArea) {
      return;
    }
    const {
      ctx,
      chartArea: { top, bottom },
    } = context.chart;
    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
    gradientBg.addColorStop(0, bgColor[0]);
    gradientBg.addColorStop(1, bgColor[1]);
    return gradientBg;
  };
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: t("body.buildingCount"),
        data: [0, 25, 0, 60, 90, 110, 80, 150, 100, 60, 80, 0],
        ...config,
        backgroundColor: setBackground,
      },
      {
        fill: true,
        label: t("body.rentedBuildings"),
        data: [190, 50, 150, 90, 200, 250, 300, 240, 400, 200, 260, 200],
        ...config,
        backgroundColor: setBackground,
      },
    ],
  };
  return <Line options={options} data={data} className="chart" />;
};

export default Chart;
