const attendancetrendChart = {
    series: [{
        name: 'Attendance',
        data: [40, 22, 53, 25, 56, 90, 43, 25, 68, 80, 35, 20]
    }],
    attendance: {
        chart: {
            height: 375,
            type: 'bar',
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: '55%',
                borderRadius: 6,
                borderRadiusApplication: 'around',
                distributed: true,
                colors: {
                    backgroundBarColors: ['#F8F9FA'],
                    backgroundBarOpacity: 1,
                    backgroundBarRadius: 6,
                },
            },
        },
        // We set the base colors. For Jun (index 5), we use the primary start color.
        colors: [
            '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB',
            '#E70D0D', // Jun Start Color
            '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB'
        ],
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 1,
                colorStops: [
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#E70D0D", opacity: 1 },
                    { offset: 100, color: "#F26522", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 },
                    { offset: 0, color: "#F4CACB", opacity: 1 },
                    { offset: 100, color: "#FDE0D3", opacity: 1 }
                ]
            }
        },

        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                show: true,
                // Increase this negative value to push labels lower inside the bar
                offsetY: -20,
                style: {
                    // Colors array: Jun is white, others are dark grey
                    colors: ['#374151', '#374151', '#374151', '#374151', '#374151', '#FFFFFF', '#374151', '#374151', '#374151', '#374151', '#374151', '#374151'],
                    fontSize: '13px',
                    fontWeight: 500
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
                return opt.dataPointIndex === 5 ? val + "%" : "";
            },
            // Adjust this to ensure the black bubble stays at the top of the bar
            offsetY: -22,
            style: {
                fontSize: '12px',
                fontWeight: 500,
                colors: ["#fff"]
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 5,
                borderRadius: 8,
                backgroundColor: '#1F2937',
                borderWidth: 0
            }
        },
        legend: {
            show: false // This removes the legend list at the bottom (Jan, Feb, Mar...)
        },
        yaxis: {
            max: 100,
            tickAmount: 5,
            labels: {
                formatter: (val) => val + "%",
                style: {
                    fontSize: '13px',
                    fontWeight: 500,
                    colors: '#6B7280'
                },
                padding: 0
            }
        },
        grid: {
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            padding: { top: 0, bottom: -30, right: -5 }
        }
    }
};

const officeChart = {
    series: [{
        name: "Series A (Teal)",
        // X values must be 1-7 to match Mon-Sun
        data: [
            [1, 220], [1.2, 230], [1.5, 280], [1.8, 240], // Mon
            [2, 270], [2.2, 340], [2.5, 270],             // Tue
            [3, 250], [3.5, 300],                         // Wed
            [4, 250], [4.2, 310], [4.5, 320],             // Thu
            [5, 280], [5.5, 320], [5.8, 300],             // Fri
            [6, 310], [6.2, 360], [6.5, 320],             // Sat
            [7, 300]                                      // Sun
        ]
    }, {
        name: "Series B (Orange)",
        data: [
            [1, 100], [1.2, 20], [1.4, 40], [1.6, 80],    // Mon
            [2, 30], [2.2, 100], [2.5, 40], [2.8, 80],    // Tue
            [3, 110], [3.2, 160], [3.5, 170],             // Wed
            [4, 150], [4.2, 230], [4.5, 260], [4.8, 240], // Thu
            [5, 290], [5.2, 240], [5.5, 270], [5.8, 250], // Fri
            [6, 300], [6.5, 260],                         // Sat
            [7, 300], [7.5, 330]                          // Sun
        ]
    }],
    office: {
        // 1. COLORS: Matches the Orange and Dark Teal from your screenshot
        colors: ['#0C4B5E', '#F26522'],
        chart: {
            height: 200,
            type: 'scatter',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        // 2. GRID: Dashed lines, vertical lines removed
        grid: {
            borderColor: '#E2E8F0',
            strokeDashArray: 4,       // Creates the dashed effect
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            padding: { top: 0, right: 10, bottom: -10, left: -10 }
        },
        markers: {
            size: 6,
            strokeWidth: 0, // Removes white border for a flat look
            hover: { size: 8 }
        },
        // 3. X-AXIS: Custom "Mon - Sun" mapping
        xaxis: {
            min: 0.5, // Padding on left
            max: 7.5, // Padding on right
            tickAmount: 7,
            labels: {
                style: { colors: '#64748B', fontSize: '12px' },
                formatter: function (val) {
                    // Converts numeric X value (1-7) to Day Name
                    const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                    return days[Math.round(val)] || "";
                }
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        // 4. Y-AXIS: Fixed range 0 - 400
        yaxis: {
            min: 0,
            max: 400,
            tickAmount: 4,
            labels: {
                // Move labels to the left (negative value) or right (positive value)
                offsetX: -15,
                style: {
                    colors: '#64748B',
                    fontSize: '12px'
                },
                formatter: (val) => val.toFixed(0),
            },
            axisBorder: { show: false }
        },
        legend: { show: false }
    }
};

const violationChart = {
    series: [{
        name: 'Company',
        data: [90, 50, 75]
    }],
    violation: {
        colors: ['#FF5504', '#47BCB2', '#EFCE6B'],
        chart: {
            height: 120,
            width: 150,
            type: 'bar',
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
                colorStops: [
                    [{ offset: 0, color: '#F37438', opacity: 1 }, { offset: 100, color: '#FF5504', opacity: 1 }],
                    [{ offset: 0, color: '#0C4B5E', opacity: 1 }, { offset: 100, color: '#47BCB2', opacity: 1 }],
                    [{ offset: 0, color: '#2DA17C', opacity: 1 }, { offset: 100, color: '#EFCE6B', opacity: 1 }]
                ]
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '80%', // 1. INCREASED BAR WIDTH (100% fills the category space)
                distributed: true,
                borderRadius: 5,
                borderRadiusApplication: 'around',
                borderRadiusWhenStacked: 'all',
                dataLabels: {
                    position: 'top', // 2. ANCHOR LABELS TO THE TOP
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) { return val + "%"; },
            offsetY: -20, // 3. NUDGE LABELS ABOVE THE BAR
            style: {
                fontSize: '12px',
                colors: ['#333'], // Changed to dark color so it is visible above the bar
                fontWeight: 'bold'
            }
        },
        xaxis: {
            categories: ['Sales', 'Front End', 'React', 'UI'],
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: 0,
            max: 110, // Increased slightly to give room for the labels on top
            labels: { show: false }
        },
        grid: {
            padding: {
                top: 0,
                right: -30,
                bottom: 0,
                left: 0
            },
        },
        legend: { show: false },
    }
};

const arrivalChart1 = {
    series: [{
        name: 'Positive',
        data: [30, 30, 30, 30, 30, 30, 30, 30] // Even height 30
    }, {
        name: 'Negative',
        data: [-30, -30, -30, -30, -30, -30, -30, -30] // Even height 30
    }],
    arrival: {
        chart: {
            width: 70,
            height: 35, // Container height
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        plotOptions: {
            bar: {
                columnWidth: '35%',
                borderRadius: 2,
                // Distributed allows us to apply the colors array to each bar index
                distributed: true,
            },
        },
        // First 3 bars get the brand color, last 2 get light background
        colors: [
            '#F26522', '#F26522', '#F26522', '#F26522', '#F26522', '#F26522', // First 3 (Filled)
            '#F1F1F1', '#F1F1F1'              // Last 2 (Light Bg)
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0
            }
        },
        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: -40,
            max: 40,
            show: false,
            axisBorder: { show: false },
        },
        legend: { show: false },
        tooltip: { enabled: true }
    }
};

const arrivalChart2 = {
    series: [{
        name: 'Positive',
        data: [30, 30, 30, 30, 30, 30, 30, 30] // Even height 30
    }, {
        name: 'Negative',
        data: [-30, -30, -30, -30, -30, -30, -30, -30] // Even height 30
    }],
    arrival: {
        chart: {
            width: 70,
            height: 35, // Container height
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        plotOptions: {
            bar: {
                columnWidth: '35%',
                borderRadius: 2,
                // Distributed allows us to apply the colors array to each bar index
                distributed: true,
            },
        },
        // First 3 bars get the brand color, last 2 get light background
        colors: [
            '#F26522', '#F26522', '#F26522', '#F26522', '#F26522', // First 3 (Filled)
            '#F1F1F1', '#F1F1F1', '#F1F1F1'              // Last 2 (Light Bg)
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0
            }
        },
        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: -40,
            max: 40,
            show: false,
            axisBorder: { show: false },
        },
        legend: { show: false },
        tooltip: { enabled: true }
    }
};

const arrivalChart3 = {
    series: [{
        name: 'Positive',
        data: [30, 30, 30, 30, 30, 30, 30, 30] // Even height 30
    }, {
        name: 'Negative',
        data: [-30, -30, -30, -30, -30, -30, -30, -30] // Even height 30
    }],
    arrival: {
        chart: {
            width: 70,
            height: 35, // Container height
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        plotOptions: {
            bar: {
                columnWidth: '35%',
                borderRadius: 2,
                // Distributed allows us to apply the colors array to each bar index
                distributed: true,
            },
        },
        // First 3 bars get the brand color, last 2 get light background
        colors: [
            '#F26522', '#F26522', '#F26522', '#F26522', // First 3 (Filled)
            '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1'              // Last 2 (Light Bg)
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0
            }
        },
        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: -40,
            max: 40,
            show: false,
            axisBorder: { show: false },
        },
        legend: { show: false },
        tooltip: { enabled: true }
    }
};

const arrivalChart4 = {
    series: [{
        name: 'Positive',
        data: [30, 30, 30, 30, 30, 30, 30, 30] // Even height 30
    }, {
        name: 'Negative',
        data: [-30, -30, -30, -30, -30, -30, -30, -30] // Even height 30
    }],
    arrival: {
        chart: {
            width: 70,
            height: 35, // Container height
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        plotOptions: {
            bar: {
                columnWidth: '35%',
                borderRadius: 2,
                // Distributed allows us to apply the colors array to each bar index
                distributed: true,
            },
        },
        // First 3 bars get the brand color, last 2 get light background
        colors: [
            '#F26522', '#F26522', '#F26522', // First 3 (Filled)
            '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1' // Last 2 (Light Bg)
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0
            }
        },
        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: -40,
            max: 40,
            show: false,
            axisBorder: { show: false },
        },
        legend: { show: false },
        tooltip: { enabled: true }
    }
};

export { attendancetrendChart, officeChart, violationChart, arrivalChart1, arrivalChart2, arrivalChart3, arrivalChart4 };