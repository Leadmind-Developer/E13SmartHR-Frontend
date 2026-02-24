const totalChart = {
    series: [{
        name: "Messages",
        data: [25, 66, 41, 12, 36, 9, 21]
    }],
    total: {
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0, // Start with 0 opacity (transparent)
                opacityTo: 0    // End with 0 opacity (transparent)
            }
        },
        chart: {
            foreColor: '#fff',
            type: "bar",
            width: 50,
            toolbar: {
                show: !1
            },
            zoom: {
                enabled: !1
            },
            dropShadow: {
                enabled: 0,
                top: 3,
                left: 14,
                blur: 4,
                opacity: .12,
                color: "#fff"
            },
            sparkline: {
                enabled: !0
            }
        },
        markers: {
            size: 0,
            colors: ["#F26522"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "35%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            show: !0,
            width: 2.5,
            curve: "smooth"
        },
        colors: ["#F26522"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
        },
        tooltip: {
            theme: "dark",
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    }
};

const activeChart = {
    series: [{
        name: "Active Company",
        data: [25, 40, 35, 20, 36, 9, 21]
    }],
    active: {
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0, // Start with 0 opacity (transparent)
                opacityTo: 0    // End with 0 opacity (transparent)
            }
        },
        chart: {
            foreColor: '#fff',
            type: "area",
            width: 50,
            toolbar: {
                show: !1
            },
            zoom: {
                enabled: !1
            },
            dropShadow: {
                enabled: 0,
                top: 3,
                left: 14,
                blur: 4,
                opacity: .12,
                color: "#fff"
            },
            sparkline: {
                enabled: !0
            }
        },
        markers: {
            size: 0,
            colors: ["#F26522"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "35%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            show: !0,
            width: 2.5,
            curve: "smooth"
        },
        colors: ["#4B3088"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
        },
        tooltip: {
            theme: "dark",
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    }
};

const inactiveChart = {
    series: [{
        name: "Inactive Company",
        data: [25, 10, 35, 5, 25, 28, 21]
    }],
    inactive: {
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0, // Start with 0 opacity (transparent)
                opacityTo: 0    // End with 0 opacity (transparent)
            }
        },
        chart: {
            foreColor: '#fff',
            type: "area",
            width: 50,
            toolbar: {
                show: !1
            },
            zoom: {
                enabled: !1
            },
            dropShadow: {
                enabled: 0,
                top: 3,
                left: 14,
                blur: 4,
                opacity: .12,
                color: "#fff"
            },
            sparkline: {
                enabled: !0
            }
        },
        markers: {
            size: 0,
            colors: ["#F26522"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "35%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            show: !0,
            width: 2.5,
            curve: "smooth"
        },
        colors: ["#177DBC"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
        },
        tooltip: {
            theme: "dark",
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    }
};

const locationChart = {
    series: [{
        name: "Inactive Company",
        data: [30, 40, 15, 23, 20, 23, 25]
    }],
    location: {
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0, // Start with 0 opacity (transparent)
                opacityTo: 0    // End with 0 opacity (transparent)
            }
        },
        chart: {
            foreColor: '#fff',
            type: "area",
            width: 50,
            toolbar: {
                show: !1
            },
            zoom: {
                enabled: !1
            },
            dropShadow: {
                enabled: 0,
                top: 3,
                left: 14,
                blur: 4,
                opacity: .12,
                color: "#fff"
            },
            sparkline: {
                enabled: !0
            }
        },
        markers: {
            size: 0,
            colors: ["#F26522"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "35%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            show: !0,
            width: 2.5,
            curve: "smooth"
        },
        colors: ["#2DCB73"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
        },
        tooltip: {
            theme: "dark",
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    }
};

const ticketReport = {
    series: [
        {
            name: 'Access Issue',
            data: [
                { x: 'Critical', y: 80 },
                { x: 'High', y: 70 },
                { x: 'Medium', y: 20 },
                { x: 'Low', y: 15 }
            ]
        },
        {
            name: 'Module Issue',
            data: [
                { x: 'Critical', y: 15 },
                { x: 'High', y: 30 },
                { x: 'Medium', y: 35 },
                { x: 'Low', y: 65 }
            ]
        },
        {
            name: 'Billing & Payments',
            data: [
                { x: 'Critical', y: 20 },
                { x: 'High', y: 65 },
                { x: 'Medium', y: 60 },
                { x: 'Low', y: 30 }
            ]
        },
        {
            name: 'Integration Issues',
            data: [
                { x: 'Critical', y: 15 },
                { x: 'High', y: 70 },
                { x: 'Medium', y: 30 },
                { x: 'Low', y: 20 }
            ]
        },
        {
            name: 'Subscription Issues',
            data: [
                { x: 'Critical', y: 30 },
                { x: 'High', y: 75 },
                { x: 'Medium', y: 70 },
                { x: 'Low', y: 35 }
            ]
        }
    ],
    ticket: {
        chart: {
            type: 'heatmap',
            height: 260,
            toolbar: { show: false }
        },

        plotOptions: {
            heatmap: {
                radius: 6,            // rounded blocks
                shadeIntensity: 0.6,
                colorScale: {
                    ranges: [
                        { from: 0, to: 20, color: '#E9EFF2' },
                        { from: 21, to: 40, color: '#C9D9DF' },
                        { from: 41, to: 60, color: '#9FBAC4' },
                        { from: 61, to: 100, color: '#6F97A4' }
                    ]
                }
            }
        },

        dataLabels: {
            enabled: false // no numbers inside blocks
        },

        stroke: {
            width: 4,
            colors: ['#ffffff'] // spacing between blocks
        },

        xaxis: {
            labels: {
                style: {
                    fontSize: '13px',
                    colors: '#6B7280'
                }
            }
        },

        yaxis: {
            labels: {
                style: {
                    fontSize: '13px',
                    colors: '#6B7280'
                }
            }
        },

        grid: {
            show: false
        },

        legend: {
            show: false
        },

        tooltip: {
            theme: 'light',
            y: {
                formatter: val => `Tickets: ${val}`
            }
        }
    }
};

export { totalChart, activeChart, inactiveChart, locationChart, ticketReport }