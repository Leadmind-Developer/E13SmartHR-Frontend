const learnEmployee = {
    series: [
        {
            name: 'Inprogress',
            type: 'column',
            data: [50, 70, 60, 180, 120, 90, 140, 80, 130, 100, 90, 75]
        },
        {
            name: 'Completed',
            type: 'column',
            data: [90, 130, 170, 260, 150, 130, 180, 220, 200, 280, 240, 300]
        },
        {
            name: 'Total Employees',
            type: 'line',
            data: [140, 200, 260, 460, 310, 260, 370, 340, 370, 420, 350, 430]
        }
    ],
    learn: {
        chart: {
            height: 320,
            type: 'line',
            stacked: true,
            toolbar: { show: false }
        },

        stroke: {
            width: [0, 0, 3],
            curve: 'smooth'
        },

        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 6
            }
        },

        markers: {
            size: 6,
            strokeWidth: 3,
            hover: { size: 7 }
        },

        colors: ['#FF7A45', '#0B3C49', '#FFC107'],

        dataLabels: {
            enabled: false
        },

        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },

        yaxis: {
            min: 0,
            max: 500,
            tickAmount: 5
        },

        legend: {
            position: 'bottom',
            markers: {
                radius: 12
            }
        },

        grid: {
            strokeDashArray: 4
        },

        tooltip: {
            shared: true,
            intersect: false
        }
    }
};

const certificationChart = {
    series: [{
        name: 'Performance',
        data: [20, 45, 30, 60, 40, 70, 35, 55, 30, 65]
    }],
    certification: {
        chart: {
            type: 'area',
            height: 230,
            toolbar: { show: false },
            zoom: { enabled: false }
        },

        stroke: {
            curve: 'smooth',
            width: 4,
            colors: ['#F26522']
        },

        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#F26522',
                        opacity: 0.45
                    },
                    {
                        offset: 100,
                        color: '#FFFFFF',
                        opacity: 0
                    }
                ]
            }
        },

        markers: {
            size: 0
        },

        dataLabels: {
            enabled: false
        },

        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },

        yaxis: {
            labels: { show: false }
        },

        grid: {
            show: false
        },

        tooltip: {
            enabled: true,
            y: {
                formatter: val => val
            }
        }
    }
};

const enrollCourse = {
    series: [{
        name: 'Skill Level',
        data: [35, 55, 40, 15, 25, 45] // Git, HTML, Nodejs, MySQL, React, Java
    }],
    enroll: {
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false }
        },

        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '35%',
                borderRadius: 8,
                distributed: false
            }
        },

        colors: ['#F26522'], // Orange bar color

        dataLabels: {
            enabled: false
        },

        xaxis: {
            categories: ['Git', 'HTML', 'Nodejs', 'MySQL', 'React', 'Java'],
            min: 0,
            max: 60,
            tickAmount: 6,
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px'
                }
            }
        },

        yaxis: {
            labels: {
                style: {
                    colors: '#111827',
                    fontSize: '13px',
                    fontWeight: 500
                }
            }
        },

        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4,
            xaxis: {
                lines: { show: true }
            },
            yaxis: {
                lines: { show: false }
            }
        },

        tooltip: {
            y: {
                formatter: val => `${val} hrs`
            }
        }
    }
};

export { learnEmployee, certificationChart, enrollCourse }