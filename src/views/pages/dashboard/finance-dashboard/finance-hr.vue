<template>
    <div class="mb-2">
        <canvas ref="cost_chart" height="180"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
    Chart,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const cost_chart = ref(null);

onMounted(() => {
    if (cost_chart.value) {
        const centerTextPlugin = {
            id: 'centerText',
            beforeDraw(chart) {
                const { ctx, chartArea } = chart;
                if (!chartArea) return;

                const value = '$2,458,900'; // text you want to show

                ctx.save();
                ctx.font = '600 12px Arial';
                ctx.fillStyle = '#111827';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                const x = (chartArea.left + chartArea.right) / 2;
                const y = chartArea.bottom - 50;

                ctx.fillText(value, x, y);
                ctx.restore();
            }
        };

        const ctx = cost_chart.value.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut', // Chart type
            data: {
                labels: ['Salaries', 'Benefits', 'Bonuses', 'Overtime', 'Training', 'Incentives'],
                datasets: [{
                    label: 'Semi Donut',
                    data: [40, 10, 10, 20, 10, 10],
                    backgroundColor: ['#0C4B5E', '#618B98', '#7298A4', '#84A5AF', '#95B2BB', '#A7BFC6'],
                    borderWidth: 5,
                    borderRadius: 10,
                    borderColor: '#fff', // Border between segments
                    hoverBorderWidth: 0,   // Border radius for curved edges
                    cutout: '80%',
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                layout: {
                    padding: {
                        top: -20,    // Set to 0 to remove top padding
                        bottom: -20, // Set to 0 to remove bottom padding
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Hide the legend
                    }
                },
            },
            plugins: [centerTextPlugin]
        });
    }
});
</script>
