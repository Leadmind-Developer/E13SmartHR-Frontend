<template>
    <div class="agent-grid-wrapper">
        <div class="card shadow-none">
            <div class="d-flex align-items-center">
                <router-link to="/sales/invoice-details" class="avatar">
                    <img src="@/assets/img/avatar/avatar-01.png" class="img-fluid rounded-circle" alt="img">
                </router-link>
                <div class="ms-2">
                    <h4 class="fw-medium fs-14 mb-1">Michael Johnson</h4>
                    <p class="d-inline-flex align-items-center mb-0"><i
                            class="ti ti-star-filled text-warning me-1"></i>4.6</p>
                </div>
            </div>
            <div>
                <p class="fs-13 mb-1">Avg Resolution Time</p>
                <p class="fw-medium mb-0 text-dark">1.8h</p>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center chart-title">
                    <p class="text-dark mb-0">Resolution Rate</p>
                    <p class="text-dark mb-0">70%</p>
                </div>
                <div class="agent-performance" data-filled="17">
                    <apexchart type="scatter" height="18" :options="agentPerformance" :series="getSeries(17)">
                    </apexchart>
                </div>
            </div>
        </div>
        <div class="card shadow-none">
            <div class="d-flex align-items-center">
                <router-link to="/sales/invoice-details" class="avatar">
                    <img src="@/assets/img/avatar/avatar-02.png" class="img-fluid rounded-circle" alt="img">
                </router-link>
                <div class="ms-2">
                    <h4 class="fw-medium fs-14 mb-1">Emily Davis</h4>
                    <p class="d-inline-flex align-items-center mb-0"><i
                            class="ti ti-star-filled text-warning me-1"></i>4.8</p>
                </div>
            </div>
            <div>
                <p class="fs-13 mb-1">Avg Resolution Time</p>
                <p class="fw-medium mb-0 text-dark">1.4h</p>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center chart-title">
                    <p class="text-dark mb-0">Resolution Rate</p>
                    <p class="text-dark mb-0">95%</p>
                </div>
                <apexchart type="scatter" height="18" :options="agentPerformance" :series="getSeries(19)"></apexchart>
            </div>
        </div>
        <div class="card shadow-none">
            <div class="d-flex align-items-center">
                <router-link to="/sales/invoice-details" class="avatar">
                    <img src="@/assets/img/avatar/avatar-03.jpg" class="img-fluid rounded-circle" alt="img">
                </router-link>
                <div class="ms-2">
                    <h4 class="fw-medium fs-14 mb-1">Robert Martinez</h4>
                    <p class="d-inline-flex align-items-center mb-0"><i
                            class="ti ti-star-filled text-warning me-1"></i>4.3</p>
                </div>
            </div>
            <div>
                <p class="fs-13 mb-1">Avg Resolution Time</p>
                <p class="fw-medium mb-0 text-dark">1.1h</p>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center chart-title">
                    <p class="text-dark mb-0">Resolution Rate</p>
                    <p class="text-dark mb-0">60%</p>
                </div>
                <apexchart type="scatter" height="18" :options="agentPerformance" :series="getSeries(16)"></apexchart>
            </div>
        </div>
        <div class="card mb-0 shadow-none">
            <div class="d-flex align-items-center">
                <router-link to="/sales/invoice-details" class="avatar">
                    <img src="@/assets/img/avatar/avatar-04.png" class="img-fluid rounded-circle" alt="img">
                </router-link>
                <div class="ms-2">
                    <h4 class="fw-medium fs-14 mb-1">Megan Walker</h4>
                    <p class="d-inline-flex align-items-center mb-0"><i
                            class="ti ti-star-filled text-warning me-1"></i>4.5 </p>
                </div>
            </div>
            <div>
                <p class="fs-13 mb-1">Avg Resolution Time</p>
                <p class="fw-medium mb-0 text-dark">1.9h</p>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center chart-title">
                    <p class="text-dark mb-0">Resolution Rate</p>
                    <p class="text-dark mb-0">80%</p>
                </div>
                <apexchart type="scatter" height="18" :options="agentPerformance" :series="getSeries(18)"></apexchart>
            </div>
        </div>
    </div>
</template>

<script setup>
import { agentPerformance } from './data';

const getSeries = (filledDots) => {
    const totalDots = 24;
    return [{
        data: Array.from({ length: totalDots }, (_, i) => ({
            x: i + 1,
            y: 1,
            fillColor: i < filledDots ? '#F26522' : '#E5E7EB'
        }))
    }];
};
</script>
