const pipelineCharts = {
    series: [{
        name: "Pipeline",
        data: [130, 110, 90, 70, 50, 40],
    }],
    pipeline: {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                barHeight: '100%',
                borderRadius: 10,
                borderRadiusApplication: 'around',
                isFunnel: true,
            },
        },
        colors: ['#F26522', '#F37438', '#F5844E', '#F69364', '#F7A37A', '#F9B291'],
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex]
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Public Sans, sans-serif',
                fontWeight: 500,
                colors: ['#fff']
            },
            dropShadow: { enabled: false }
        },
        xaxis: {
            categories: [
                'Marketing : 7,898', 'Sales : 4,658', 'Email : 2,898',
                'Chat : 789', 'Operational : 655', 'Calls : 454'
            ],
            min: -25,
            max: 125
        },
        tooltip: { enabled: false },
        states: {
            hover: { filter: { type: 'none' } },
            active: { filter: { type: 'none' } }
        },
        grid: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        }
    }
};

const dealsStage = {

    series: [{
        name: 'Income',
        data: [80, 40, 100, 20]
    }, {
        name: 'Expenses',
        data: [100, 100, 100, 100]
    }],
    stages: {
        chart: {
            height: 310,
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
                borderRadius: 20,
                horizontal: false,
                endingShape: 'rounded'
            },
        },
        xaxis: {
            categories: ['Inpipeline', 'Follow Up', 'Schedule', 'Conversion'],
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '13px',
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -15,
                style: {
                    colors: '#6B7280',
                    fontSize: '13px',
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

const topDeals = {
    series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
        color: '#F37438',

    }, {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
        color: '#B359C3',
    }, {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
        color: '#1CCE6B',
    }],
    dealsCharts: {
        chart: {
            height: 200,
            type: 'radar',
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
            }
        },
        stroke: {
            width: 2
        },
        fill: {
            opacity: 1
        },
        markers: {
            size: 0
        },
        yaxis: {
            stepSize: 20
        },
        legend: {
            show: false,
        },
        xaxis: {
            categories: ['Mar', 'Feb', 'Jan', 'Aug', 'Jul', 'Jun', 'May', 'Apr']
        }
    }
};

export { pipelineCharts, dealsStage, topDeals }