<template>
    <div class="position-relative mb-4" style="height:200px">
        <canvas id="ticket-category"></canvas>
        <div class="gauge-center-text">Compliance</div>
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
    mounted() {
        if (document.getElementById('ticket-category')) {
            const ctx = document.getElementById('ticket-category');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['IT Support', 'HR', 'Payroll', 'Access', 'Hardware', 'Other'],
                    datasets: [{
                        data: [30, 12, 10, 18, 8, 12],
                        backgroundColor: [
                            '#F68B4A',
                            '#6E8F99',
                            '#45C676',
                            '#F2BE1A',
                            '#4C8DFF',
                            '#E53935'
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        borderRadius: 8,
                        spacing: 1
                    }]
                },

                options: {
                    rotation: -90,
                    circumference: 180,
                    cutout: '72%',

                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: { display: false },

                        tooltip: {
                            enabled: true,
                            backgroundColor: '#111827',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            padding: 10,
                            cornerRadius: 6,
                            displayColors: false,

                            callbacks: {
                                label: function (context) {
                                    return `${context.label}: ${context.parsed}`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}
</script>
