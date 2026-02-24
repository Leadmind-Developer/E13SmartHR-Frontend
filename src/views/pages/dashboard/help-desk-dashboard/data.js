const ticketTrends = {
    // Data points adjusted to visually match the peaks in your image
    series: [
        { name: 'Created', data: [45, 60, 95, 70, 75, 60, 75] },
        { name: 'Resolved', data: [145, 155, 185, 145, 145, 170, 170] }
    ],
    ticket: {
        chart: {
            type: 'area',
            height: 241,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: "'Public Sans', sans-serif" // Standard clean dashboard font
        },
        colors: ['#F26522', '#0D4C63'], // Exact colors from image
        stroke: {
            curve: 'straight', // Important: The image does not use smooth curves
            width: 1.5
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0,
                opacityFrom: 0.35,   // 👈 visible fill at top
                opacityTo: 0.05,     // 👈 soft fade at bottom
                stops: [0, 100]
            }
        },
        markers: {
            size: 4,
            colors: ['#F26522', '#0D4C63'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: { size: 6 }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 3, // Dashed horizontal lines
            padding: {
                right: -8,
            },
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } }
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                offsetX: 2,
                style: {
                    // Highlights "Thu" in orange, others in gray
                    colors: ['#8e94a9', '#8e94a9', '#8e94a9', '#F26522', '#8e94a9', '#8e94a9', '#8e94a9'],
                    fontSize: '13px'
                }
            }
        },
        yaxis: {
            min: 0,
            max: 400,
            tickAmount: 4, // Forces 0, 100, 200, 300, 400
            labels: {
                offsetX: -15,
                style: {
                    colors: '#8e94a9',
                    fontSize: '13px'
                }
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `
                    <div class="custom-apex-tooltip shadow-sm">
                        <div class="tooltip-title">September</div>
                        <div class="tooltip-row">
                            <div class="tooltip-col">
                                <span class="label"><span class="dot orange"></span> Created</span>
                                <span class="value">${series[0][dataPointIndex]}</span>
                            </div>
                            <div class="tooltip-col">
                                <span class="label"><span class="dot blue"></span> Resolved</span>
                                <span class="value">${series[1][dataPointIndex]}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            markers: { radius: 12 }
        },
        dataLabels: { enabled: false }
    }
};

const ticketStatus = {
    series: [72, 55, 38, 22],
    ticket: {
        chart: {
            height: 296,
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -120,
                endAngle: 240,

                hollow: {
                    size: '18%',
                },

                track: {
                    background: '#f2f2f2',
                    strokeWidth: '100%',
                    opacity: 1,
                    margin: 6
                },

                dataLabels: {
                    show: false
                }
            }
        },

        stroke: {
            lineCap: 'round'
        },

        colors: [
            '#F26522',
            '#1B84FF',
            '#FFC107',
            '#AB47BC',
        ],

        labels: [
            'Open',
            'In Progres',
            'On Hold',
            'Closed',
        ]
    }
};

const slaCompliance = {
    series: [80.5],
    sla: {
        chart: {
            type: 'radialBar',
            height: 230,
            sparkline: { enabled: true }
        },

        colors: ['#F26522'],

        plotOptions: {
            radialBar: {
                startAngle: -110,
                endAngle: 250,

                hollow: {
                    size: '62%'
                },

                track: {
                    background: '#E5E7EB',
                    strokeWidth: '100%'
                },

                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#1F2937',
                        offsetY: 0,
                        offsetX: 0,
                        textAnchor: 'middle',
                        formatter: function (val) {
                            return val.toFixed(1) + '%';
                        }
                    }
                }

            }
        },

        stroke: {
            lineCap: 'round'
        }
    }
};

const maxValue = 700;
const actual = [80, 280, 330, 410, 470, 520, 560];
const remaining = actual.map(v => maxValue - v);

const backlogGrowth = {
    series: [
        {
            name: 'Growth',
            data: actual
        },
        {
            name: 'Remaining',
            data: remaining
        }
    ],
    backlog: {
        chart: {
            height: 300,
            type: 'bar',
            stacked: true,
            toolbar: { show: false }
        },

        colors: ['#0F4C5C', '#EEF2F5'],

        plotOptions: {
            bar: {
                columnWidth: '80%',
                borderRadius: 8,
                borderRadiusWhenStacked: 'last',
                endingShape: 'rounded'
            }
        },

        stroke: {
            width: [0, 1],
            colors: ['transparent', '#CBD5E1'],
            dashArray: [0, 6]            // dotted tube
        },

        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
                offsetX: 1,
                style: {
                    colors: '#6B7280',
                    fontSize: '13px'
                }
            }
        },

        yaxis: {
            max: maxValue,
            tickAmount: 7,
            labels: {
                offsetX: -15,
                style: {
                    colors: '#6B7280',
                    fontSize: '13px'
                }
            }
        },

        grid: {
            borderColor: '#e5e7eb00',
            strokeDashArray: 5,
            padding: {
                right: -13,
                left: -8
            }
        },

        legend: { show: false },
        dataLabels: { enabled: false },

        fill: {
            opacity: [1, 1]
        }
    }
};

const agentPerformance = {
    chart: { type: 'scatter', height: 18, sparkline: { enabled: true } },
    markers: { size: 5.5, shape: 'circle', strokeWidth: 0 },
    xaxis: { min: 0, max: 25, labels: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: false },
    legend: { show: false }
};

export { ticketTrends, ticketStatus, slaCompliance, backlogGrowth, agentPerformance };
