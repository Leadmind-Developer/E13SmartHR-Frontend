const revenueCharts = {

    // STEP 2: Divide your data into steps
    series: [
        {
            name: 'Income Base (25%)',
            data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 20, 25] // Adjust numbers as needed
        },
        {
            name: 'Income Mid (30%)',
            data: [30, 5, 20, 30, 30, 30, 30, 30, 30, 30, 0, 30]
        },
        {
            name: 'Income Top (5%)',
            data: [5, 0, 0, 25, 30, 35, 25, 25, 25, 30, 0, 25]
        },
        {
            name: 'Remaining/Expenses',
            data: [40, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20]
        }
    ],
    income: {
        chart: {
            height: 280,
            type: 'bar',
            stacked: true, // This stays true to stack the colors
            toolbar: { show: false }
        },
        // STEP 1: Define your gradient-step colors here
        colors: ['#f26522', '#0c4b5e', '#1b84ff', '#F8F9FA'],

        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusWhenStacked: 'last', // Only rounds the very top of the stack
                horizontal: false,
            },
        },

        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: { colors: '#6B7280', fontSize: '13px' }
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                offsetX: -15,
                style: { colors: '#6B7280', fontSize: '13px' },
                formatter: function (value) {
                    return value + "K";
                }
            }
        },
        grid: {
            borderColor: 'transparent',
            padding: { left: -8 }
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        tooltip: {
            shared: true, // Shows all steps in one tooltip
            intersect: false,
            y: {
                formatter: function (val) {
                    return val + " k";
                }
            }
        },
        fill: {
            opacity: 1
        },
    }
}

const heatChart = {
    heat: {
        chart: {
            type: 'heatmap',
            height: 300,
        },
        colors: [
            "#9CA3AF",
            "#F37438",
            "#9CA3AF",
            "#F37438",
            "#9CA3AF",
            "#F37438",
        ],
    },
    series: [
        {
            name: "0",
            data: [{
                x: 'Mon',
                y: 22
            },
            {
                x: 'Tue',
                y: 29
            },
            {
                x: 'Wed',
                y: 13
            },
            {
                x: 'Thu',
                y: 32
            },
            {
                x: 'Fri',
                y: 32
            },
            {
                x: 'Sat',
                y: 32
            },
            {
                x: 'Sun',
                y: 32
            },
            ]
        },
        {
            name: "20",
            data: [{
                x: 'Mon',
                y: 22,
                color: '#ff5722'
            },
            {
                x: 'Tue',
                y: 29
            },
            {
                x: 'Wed',
                y: 13
            },
            {
                x: 'Thu',
                y: 32
            },
            {
                x: 'Fri',
                y: 32
            },
            {
                x: 'Sat',
                y: 32
            },
            {
                x: 'Sun',
                y: 32
            },
            ]
        },
        {
            name: "40",
            data: [{
                x: 'Mon',
                y: 22
            },
            {
                x: 'Tue',
                y: 29
            },
            {
                x: 'Wed',
                y: 13
            },
            {
                x: 'Thu',
                y: 32
            },
            {
                x: 'Fri',
                y: 32
            },
            {
                x: 'Sat',
                y: 32
            },
            {
                x: 'Sun',
                y: 32
            },
            ]
        },
        {
            name: "60",
            data: [{
                x: 'Mon',
                y: 0
            },
            {
                x: 'Tue',
                y: 29
            },
            {
                x: 'Wed',
                y: 13
            },
            {
                x: 'Thu',
                y: 32
            },
            {
                x: 'Fri',
                y: 0
            },
            {
                x: 'Sat',
                y: 0
            },
            {
                x: 'Sun',
                y: 32
            },
            ]
        },
        {
            name: "80",
            data: [{
                x: 'Mon',
                y: 0
            },
            {
                x: 'Tue',
                y: 20
            },
            {
                x: 'Wed',
                y: 13
            },
            {
                x: 'Thu',
                y: 32
            },
            {
                x: 'Fri',
                y: 0
            },
            {
                x: 'Sat',
                y: 0
            },
            {
                x: 'Sun',
                y: 32
            },
            ]
        },
        {
            name: "120",
            data: [{
                x: 'Mon',
                y: 0
            },
            {
                x: 'Tue',
                y: 0
            },
            {
                x: 'Wed',
                y: 75
            },
            {
                x: 'Thu',
                y: 0
            },
            {
                x: 'Fri',
                y: 0
            },
            {
                x: 'Sat',
                y: 0
            },
            {
                x: 'Sun',
                y: 0
            },
            ]
        },
    ]
};

const leadsStageChart = {
    series: [{
        name: 'Income',
        data: [80, 40, 60, 40]
    }, {
        name: 'Expenses',
        data: [100, 100, 100, 100]
    }],
    stageLead: {
        chart: {
            height: 345,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        colors: ['#FF6F28', '#F8F9FA'],
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusWhenStacked: 'all',
                horizontal: false,
                endingShape: 'rounded'
            },
        },
        xaxis: {
            categories: ['Competitor', 'Budget', 'Unresponsie', 'Timing'],
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '9px',
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -15,
                style: {
                    colors: '#6B7280',
                    fontSize: '10px',
                }
            }
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 5
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false // Disable data labels
        },
        fill: {
            opacity: 1
        },
    }
}

const donutChart = {
    series: [25, 30, 10, 35], // Percentages for each section
    dount: {
        chart: {
            type: 'donut',
            height: 185,
        },
        labels: ['Paid', 'Google', 'Referals', 'Campaigns'], // Labels for the data
        colors: ['#FFC107', '#0C4B5E', '#AB47BC', '#FD3995'], // Colors from the image
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Google',
                            formatter: function (w) {
                                return '40%';
                            }
                        }
                    }
                }
            }
        },
        stroke: {

            lineCap: 'round',
            show: true,
            width: 0,    // Space between donut sections
            colors: '#fff'
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        label: {
            show: false,
        }
    }
};

const donutChart3 = {
    series: [15, 10, 5, 10, 60], // Percentages for each section
    dount3: {
        chart: {
            type: 'donut',
            height: 290,
        },
        labels: ['Paid', 'Google', 'Referals', 'Campaigns', 'Campaigns'], // Labels for the data
        colors: ['#F26522', '#FFC107', '#E70D0D', '#1B84FF', '#0C4B5E'], // Colors from the image
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Leads',
                            formatter: function (w) {
                                return '589';
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false,
        },
        label: {
            show: false,
        }
    }
};

export { revenueCharts, heatChart, leadsStageChart, donutChart, donutChart3 }