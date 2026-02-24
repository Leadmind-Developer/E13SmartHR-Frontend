<template>
    <div class="chartjs-wrapper-demo position-relative">
        <canvas id="training-chart" height="50" width="50"></canvas>
    </div>
</template>

<script>
import {
    Chart,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default {
    name: 'TrainingChart',
    mounted() {
        if (document.getElementById('training-chart')) {
            const centerTextPlugin = {
                id: 'centerText',
                beforeDraw(chart) {
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return;

                    const value = '20%';

                    ctx.save();
                    ctx.font = '600 12px Arial';
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    const x = (chartArea.left + chartArea.right) / 2;
                    const y = (chartArea.top + chartArea.bottom) / 2;

                    ctx.fillText(value, x, y);
                    ctx.restore();
                }
            };

            var ctx = document.getElementById('training-chart').getContext('2d');
            var mySemiDonutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Training', 'Completed'],
                    datasets: [{
                        label: 'Semi Donut',
                        data: [80, 20],
                        backgroundColor: ['#fff', '#F26522'],
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: '#3B7080',
                        hoverBorderWidth: 0,
                        cutout: '60%',
                    }]
                },
                options: {
                    rotation: -90,
                    circumference: 360,
                    layout: {
                        padding: {
                            top: -20,
                            bottom: -20,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        // THIS REMOVES THE HOVER LABEL ONLY
                        tooltip: {
                            enabled: false
                        }
                    },
                },
                plugins: [centerTextPlugin]
            });
        }
    }
}
</script>