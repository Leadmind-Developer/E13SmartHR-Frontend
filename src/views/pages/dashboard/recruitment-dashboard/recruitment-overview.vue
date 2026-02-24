<template>
    <div class="col-xl-4 d-flex flex-column">
        <!-- Salary Range Distribution -->
        <div class="card">
            <div class="card-body">
                <div class="pb-2 d-flex align-items-center justify-content-between flex-wrap mb-3 gap-2">
                    <h3 class="mb-0 card-title">Recruitment Overview</h3>
                    <div class="d-flex align-items-center gap-3">
                        <a href="javascript:void(0);"> <span><i
                                    class="ti ti-square-arrow-down-filled text-dark"></i></span>
                            Monthly</a>
                    </div>
                </div>

                <!-- Top Stats -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="text-center">
                        <p class="mb-1  fw-medium">Offer Acceptance</p>
                        <h3 class="fw-bold mb-0">74.4%</h3>
                    </div>
                    <div class="text-center">
                        <p class="mb-1  fw-medium">Overall Hire Rate</p>
                        <h3 class="fw-bold mb-0">2.7%</h3>
                    </div>
                </div>

                <!-- Chart -->
                <div class="position-relative mx-auto recruitment-chart">
                    <canvas ref="recruitmentChart"></canvas>

                    <!-- Center Text -->
                    <div class="position-absolute text-center"
                        style="bottom:18%; left:50%; transform:translateX(-50%);">
                        <h2 class="fw-bold mb-0">2,384</h2>
                        <p class="mb-0 ">Total Applications</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Overview -->
        <div class="card bg-secondary position-relative overflow-hidden flex-fill">
            <div class="card-body d-flex flex-column justify-content-between z-2">
                <div class="mb-4">
                    <p class="text-white mb-3">Quick Reminder</p>
                    <h3 class="text-white fw-normal fs-20 mb-2">You have 21 Interview Schedule Today!</h3>
                    <p class="text-white">Dont forget to schedule interviews </p>
                </div>
                <div>
                    <a href="javascript:void(0);"
                        class="btn-primary-gradient rounded-pill d-inline-flex align-items-center gap-2 p-1 ps-3">
                        Schedule Now
                        <span
                            class="btn btn-sm btn-icon bg-white rounded-circle d-flex align-items-center justify-content-center text-dark"><i
                                class="ti ti-chevrons-right fs-20"></i></span>
                    </a>
                </div>
            </div>
            <img src="@/assets/img/bg/bg-05.png" alt="bg" class="img-fluid recruitment-bg">
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue';
import Chart from 'chart.js/auto';

const recruitmentChart = ref(null);

onMounted(() => {
    if (recruitmentChart.value) {
        const ctx = recruitmentChart.value.getContext('2d');

        const totalSegments = 15;
        const filledSegments = 7;
        const data = Array(totalSegments).fill(1);

        const colors = data.map((_, i) =>
            i < filledSegments ? '#FF7028' : '#F3F4F6'
        );

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    borderRadius: 12,
                    spacing: 10,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                rotation: -110,
                circumference: 220,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }
});
</script>