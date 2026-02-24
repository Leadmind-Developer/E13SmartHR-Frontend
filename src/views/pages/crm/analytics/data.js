const donutChart2 = {
  series: [25, 30, 10, 35], // Percentages for each section
  sline: {
    chart: {
      type: "donut",
      height: 185,
    },
    labels: ["Paid", "Google", "Referals", "Campaigns"], // Labels for the data
    colors: ["#FFC107", "#0C4B5E", "#AB47BC", "#FD3995"], // Colors from the image
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Google",
              formatter: function (w) {
                return "40%";
              },
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
      show: true,
      width: 0, // Space between donut sections
      colors: "#fff",
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    label: {
      show: false,
    },
  },
};

const dealsStage = {
  series: [
    {
      name: "Income",
      data: [80, 40, 100, 20],
    },
    {
      name: "Expenses",
      data: [100, 100, 100, 100],
    },
  ],
  sline: {
    chart: {
      height: 310,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF6F28", "#F8F9FA"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: ["Inpipeline", "Follow Up", "Schedule", "Conversion"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    fill: {
      opacity: 1,
    },
  },
};

export { donutChart2, dealsStage };
