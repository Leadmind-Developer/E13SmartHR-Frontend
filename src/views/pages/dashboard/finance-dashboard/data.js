const payrollPayment = {
    // Data values are now populated to avoid Syntax Errors
    series: [
        { name: 'Payroll', data: [600] },
        { name: 'Remaining', data: [1000] },
    ],
    payroll: {
        chart: {
            type: 'bar',
            height: 45,
            stacked: true,
            stackType: '100%',
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '100%',
            }
        },
        colors: ['#54C564', '#E5E7EB'],
        fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
                style: 'verticalLines',
                width: 6,
                strokeWidth: 4
            }
        },
        tooltip: { enabled: true },
        xaxis: { categories: ['Total'] }
    }
};

const reimbrusementChart = {
    // Data values are now populated to avoid Syntax Errors
    series: [
        { name: 'Reimbrusement', data: [1000] },
        { name: 'Remaining', data: [600] },
    ],
    reimbrusement: {
        chart: {
            type: 'bar',
            height: 45,
            stacked: true,
            stackType: '100%',
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '100%',
            }
        },
        colors: ['#7298A4', '#E5E7EB'],
        fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
                style: 'verticalLines',
                width: 6,
                strokeWidth: 4
            }
        },
        tooltip: { enabled: true },
        xaxis: { categories: ['Total'] }
    }
};

const headcountChart = {
    series: [{
        name: 'Revenue',
        data: [20, 28, 29, 20, 15, 30, 25, 20, 20, 12, 20, 20, 30, 15, 20, 25],
    }, {
        name: 'Expenses',
        data: [-20, -30, -20, -20, -25, -25, -20, -30, -20, -25, -30, -20, -30, -20, -10, -28]
    }],
    headcount: {
        grid: {
            padding: {
                top: 5, // Adds space on the left
                right: 0, // Adds space on the right
            },
        },
        colors: ['#F26522', '#E5E7EB'],
        chart: {
            type: 'bar',
            height: 240,
            stacked: true,
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 280,
            options: {
                legend: {
                    position: 'bottom',
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 8,
                borderRadiusApplication: "around", // "around" / "end" 
                borderRadiusWhenStacked: "all", // "all"/"last"
                columnWidth: '40%',
            },
        },
        dataLabels: {
            enabled: false
        },
        yaxis: {
            opposite: true,
            labels: {
                offsetX: -5,
                formatter: (val) => {
                    return val / 1 + 'K'
                },
            },
            min: -30,
            max: 30,
            tickAmount: 6,
        },
        xaxis: {
            categories: ['', '', 'Jan', '', '', '', 'Feb', '', '', '', 'Mar', '', '', '', 'Apr', ''],
        },
        legend: { show: false },
        fill: {
            opacity: 1
        }
    }
};

const budgetChart = {
    series: [{
        name: 'Budget',
        data: [5, 10, 8, 6, 5, 10, 8, 10]
    }, {
        name: 'Spent',
        data: [15, 20, 16, 15, 15, 20, 18, 20]
    }],
    budget: {
        chart: {
            height: 280,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        colors: ['#F26522', '#0C4B5E'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 1,
        },
        // Added the fill style from the first chart
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.35,
                opacityTo: 0.05,
                stops: [0, 100],
            },
        },

        xaxis: {
            categories: ["Engineering", "Sales", "Marketing", "Operations", "Support", "Admin", "UI/UX", "Devops"],
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            min: 0,
            max: 40,
            labels: {
                offsetX: -15,
                formatter: function (value) {
                    return value + "k"; // Label remains exactly as you had it
                }
            },
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: -15,
                top: 0,
            },
        },
    }
}

const financeChart = {
    series: [{
        name: 'Amount',
        data: [30, 60, 30, 40, 100, 80, 90, 50, 60, 40, 30, 60]
    }],
    finance: {
        colors: ['#FF7129'],
        chart: {
            height: 140,
            type: 'bar',
            toolbar: {
                show: false,
            },
            sparkline: { enabled: true },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical', // Top to bottom (180deg)
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#9CB9C2', // Top color
                        opacity: 0.5
                    },
                    {
                        offset: 100,
                        color: '#F8F9FA', // Bottom color
                        opacity: 1,
                        opacity: 0.5
                    }
                ]
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetY: 10
                }
            }
        }],
        plotOptions: {
            bar: {
                columnWidth: '80%',
                borderRadius: 12,
                horizontal: false,
                endingShape: 'rounded', dataLabels: {
                    position: 'bottom', // Anchors the label to the base of the bar
                },
                colors: {
                    backgroundBarColors: ['#F8F9FA'], // Background color for bars
                    backgroundBarOpacity: 0.5,
                    hover: {
                        enabled: true,
                        borderColor: '#F26522', // Color when hovering over the bar
                    }
                }
            },
        },
        dataLabels: {
            enabled: false, // Must be true
            formatter: function (val) {
                return "$" + val; // Display the raw value
            },
            offsetY: 10, // Adjust this value to nudge the text up or down from the bottom
            style: {
                fontSize: '12px',
                colors: ['#F26522'], // Gray color to match your design
                fontWeight: 'bold'
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#111827',
                    fontSize: '13px',
                }
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                show: false
            }
        },
        grid: {
            show: false,
            strokeDashArray: 5,
            padding: {
                left: 0,
                right: 0,
                top: 0,
            },
        },
        legend: {
            show: false
        },
    }
}

export { payrollPayment, reimbrusementChart, headcountChart, budgetChart, financeChart };