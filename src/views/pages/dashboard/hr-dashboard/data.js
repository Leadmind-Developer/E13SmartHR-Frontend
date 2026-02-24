const leaveChart = {
    // Use placeholder percentage values for the series data
    series: [85, 50, 20], // Example data: 85% for Present, 50% for Absent, 20% for Late
    leave: {
        chart: {
            type: 'radialBar',
            width: 150,
            height: 150, // Adjust height as needed
            sparkline: {
                enabled: true
            }
        },

        plotOptions: {
            radialBar: {
                startAngle: -90, // Start from the left horizontal axis
                endAngle: 90,   // End at the right horizontal axis
                offsetY: 0, // Move the chart up slightly
                hollow: {
                    margin: 0,
                    size: '40%', // Adjust the inner circle size
                    background: 'transparent',
                },
                track: {
                    show: true,
                    background: '#F3F4F6', // Light gray background for the full track
                    strokeWidth: '97%',
                    margin: 5, // Space between the series
                },
                dataLabels: {
                    show: false, // Hide default percentage labels
                }
            }
        },

        fill: {
            // Manually define the colors to match your image
            colors: ['#F37438', '#F5844E', '#F69364']
        },

        // Add labels or tooltips if you want to show "Present", "Absent", "Late" names
        labels: ['Sick', 'Casual', 'Unpaid'],

        grid: {
            padding: {
                top: -50,
                left: -10,
                bottom: -150,
            }
        },

        legend: {
            show: false // Assuming you have a separate legend as implied by the dots in the image
        }
    }
};

const statusChart = {
    series: [
        { name: 'Full Time', data: [1054] },
        { name: 'Contract', data: [568] },
        { name: 'Probation', data: [80] }
    ],
    status: {
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
        colors: ['#F26522', '#0C4B5E', '#F8F9FA'],
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

const attendanceChart = {
    // 1. Series Data (You need actual data arrays here)
    series: [{
        name: 'Present',
        data: [600, 300, 300, 700, 400, 600, 600]
    }, {
        name: 'Absent',
        data: [50, 100, 50, 50, 100, 100, 100]
    }, {
        name: 'Late',
        data: [100, 50, 150, 100, 150, 50, 150]
    }],

    attendance: {
        // 2. Chart Type (Grouped columns by default)
        chart: {
            type: 'bar',
            height: 260,
            stacked: false,
            toolbar: { show: false },
            sparkline: { enabled: false }
        },

        // 3. Colors (Orange, Dark Teal, Yellow)
        colors: ['#F26522', '#004C6D', '#FFC700'],

        // 4. Plot Options (Controls the 'boxes' look and spacing)
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 2,
                borderRadiusApplication: 'end',
                colors: {
                    backgroundBarColors: ['#F8F9FA'], // Background color for bars
                    backgroundBarOpacity: 0.5,
                    hover: {
                        enabled: true,
                    },
                }
            }
        },
        stroke: {
            show: true,
            width: 2,                // 🔹 THIS creates the inner gap
            colors: ['transparent'] // 🔹 keeps background clean
        },
        fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
                style: 'horizontalLines',
                width: 5,
                height: 20,
                strokeWidth: 24
            }
        },

        // 5. Axes Configuration
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { rotate: 0, style: { colors: '#6B7280' } }
        },
        yaxis: {
            show: true,
            min: 0,
            max: 800,
            labels: {
                offsetX: -16
            }
        },

        // 6. Grid (Subtle background lines)
        grid: {
            show: true,
            borderColor: '#E5E7EB',
            strokeDashArray: 3,
            padding: {
                left: 0
            }
        },

        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: { enabled: true }
    }
};

const employeeDistributionChart = {
    series: [{
        name: 'Company',
        data: [40, 20, 35, 10]
    }],
    employeeDistribution: {
        colors: ['#FF7129'],
        chart: {
            height: 340,
            type: 'bar',
            toolbar: {
                show: false,
            },
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
                        color: '#FF7129', // Top color
                        opacity: 0.5
                    },
                    {
                        offset: 100,
                        color: '#FFFFFF', // Bottom color
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
                columnWidth: '90%',
                borderRadius: 10,
                borderRadiusWhenStacked: 'all',
                horizontal: false,
                endingShape: 'rounded', dataLabels: {
                    position: 'bottom', // Anchors the label to the base of the bar
                },
                colors: {
                    backgroundBarColors: ['#F8F9FA'], // Background color for bars
                    backgroundBarOpacity: 0.5,
                    backgroundBarRadius: 10,
                    hover: {
                        enabled: true,
                        borderColor: '#f2652247', // Color when hovering over the bar
                    }
                }
            },
        },
        dataLabels: {
            enabled: true, // Must be true
            position: 'bottom',
            formatter: function (val) {
                return val + "%"; // Display the raw value
            },
            offsetY: 10, // Adjust this value to nudge the text up or down from the bottom
            style: {
                fontSize: '12px',
                colors: ['#111827'], // Gray color to match your design
                fontWeight: 'bold'
            }
        },
        xaxis: {
            categories: ['Sales', 'Front End', 'React', 'UI'],
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
            max: 50,
            labels: {
                show: false
            }
        },
        grid: {
            show: false,
            strokeDashArray: 5,
            padding: {
                left: -10,
                right: -30,
                bottom: -10
            },
        },
        legend: {
            show: false
        },
    }
};

const deductionChart = {
    series: [{
        name: 'Deduction',
        // Example data where total bar height is represented by absolute values
        data: [15, 40, 30, 35, 40, 35, 32]
    }, {
        name: 'Deduction',
        // The mirror values for the left side (negative)
        data: [-15, -40, -30, -35, -40, -35, -32]
    }],
    deduction: {
        chart: {
            width: 100,
            height: 70,
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        dataLabels: { enabled: false },
        colors: ['#F26522'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                colors: {
                    backgroundBarColors: ['#F8F9FA'], // Background color for bars
                    backgroundBarOpacity: 0.5,
                    backgroundBarRadius: 4,
                    hover: {
                        enabled: true,
                    }
                }
            },
        },
        xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: {
            min: -50,
            max: 50,
            show: false
        },
        grid: { show: false },
        tooltip: { enabled: true }
    }
};

const payrollChart = {
    series: [{
        name: 'Payroll',
        data: [45, 15, 30, 25, 20, 45, 40] // You can adjust these
    }],
    payroll: {
        chart: {
            width: 100,
            height: 40,
            type: 'bar',
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        dataLabels: { enabled: false },
        colors: ['#0C4B5E'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusWhenStacked: 'all',
                borderRadiusApplication: 'around', // Ensures top-only rounding for vertical bars
                endingShape: 'around',
                colors: {
                    backgroundBarColors: ['#F8F9FA'], // Background color for bars
                    backgroundBarOpacity: 0.5,
                    backgroundBarRadius: 4,
                    hover: {
                        enabled: true,
                        borderColor: '#F26522', // Color when hovering over the bar
                    }
                }
            },
        },
        xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: { enabled: true }
    }
};

export { leaveChart, statusChart, attendanceChart, employeeDistributionChart, deductionChart, payrollChart };