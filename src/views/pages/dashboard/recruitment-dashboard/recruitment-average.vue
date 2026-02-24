<template>
    <div class="col-xl-4 d-flex">
        <div class="card flex-fill">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <div class="pb-2 d-flex align-items-center justify-content-between flex-wrap mb-3 gap-2">
                        <h3 class="mb-0 card-title">Average Time to Hire</h3>
                        <div class="d-flex align-items-center gap-3">
                            <a href="javascript:void(0);"> <span><i
                                        class="ti ti-square-arrow-down-filled text-dark"></i></span> Last 30
                                Days </a>
                        </div>
                    </div>
                    <div class="chartjs-wrapper-demo avghiretime-chart">
                        <canvas ref="avghiretime"></canvas>
                    </div>

                    <div class="d-flex flex-column mb-3 gap-2">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <span
                                    class="d-block border border-2 h-12 border-secondary border-opacity-100 rounded-5 me-2"></span>
                                <p class="fs-14">Applied to Shortlisted</p>
                            </div>
                            <p class="badge bg-light border rounded-3 btn-sm fs-13 text-dark">05</p>
                        </div>

                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <span
                                    class="d-block border border-2 h-12 border-secondary border-opacity-75 rounded-5 me-2"></span>
                                <p class="fs-14">Shortlisted</p>
                            </div>
                            <p class="badge bg-light border rounded-3 btn-sm fs-13 text-dark">07</p>
                        </div>

                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <span
                                    class="d-block border border-2 h-12 border-secondary border-opacity-50 rounded-5 me-2"></span>
                                <p class="fs-14">Interview to Offer</p>
                            </div>
                            <p class="badge bg-light border rounded-3 btn-sm fs-13 text-dark">10</p>
                        </div>

                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <span
                                    class="d-block border border-2 h-12 border-secondary border-opacity-25 rounded-5 me-2"></span>
                                <p class="fs-14">Acceptance</p>
                            </div>
                            <p class="badge bg-light border rounded-3 btn-sm fs-13 text-dark">03</p>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-soft-transparent-success rounded-3 text-start w-100 p-2 d-flex align-items-center gap-2 text-dark">
                    <div class="avatar avatar-md rounded-3 bg-success flex-shrink-0 p-0">
                        <span class="d-flex align-items-center"><i class="ti ti-arrow-up-right fs-20"></i></span>
                    </div>
                    12% faster than industry avg
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const avghiretime = ref(null);
let chartInstance = null;

onMounted(() => {
    if (avghiretime.value) {
        const ctx = avghiretime.value.getContext('2d');

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [
                    {
                        label: 'Applied to Shortlisted',
                        data: [2, 4, 3],
                        backgroundColor: '#0b4c5f',
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        borderDash: [4, 4],
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 70,
                        stack: 'stack1'
                    },
                    {
                        label: 'Shortlisted',
                        data: [1.7, 1.7, 1.7],
                        backgroundColor: '#3e6f7c',
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        borderDash: [4, 4],
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 70,
                        stack: 'stack1'
                    },
                    {
                        label: 'Interview to Offer',
                        data: [4, 2, 2],
                        backgroundColor: '#9fb8bf',
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        borderDash: [4, 4],
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 70,
                        stack: 'stack1'
                    },
                    {
                        label: 'Acceptance',
                        data: [3, 7, 5],
                        backgroundColor: '#c9d8dc',
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        borderDash: [4, 4],
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 70,
                        stack: 'stack1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false,
                            padding: {
                                left: -10
                            }
                        },
                        ticks: {
                            font: { size: 11 }
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            borderDash: [4, 4],
                            color: '#e5e7eb'
                        },
                        ticks: {
                            stepSize: 5,
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }
});

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});
</script>