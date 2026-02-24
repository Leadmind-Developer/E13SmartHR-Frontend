<template>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="day">
            <div class="chart-container">
                <canvas ref="dayChart" height="110"></canvas>
            </div>
        </div>

        <div class="tab-pane fade" id="week">
            <div class="chart-container">
                <canvas ref="weekChart" height="110"></canvas>
            </div>
        </div>

        <div class="tab-pane fade" id="month">
            <div class="chart-container">
                <canvas ref="monthChart" height="110"></canvas>
            </div>
        </div>

        <div class="tab-pane fade" id="year">
            <div class="chart-container">
                <canvas ref="yearChart" height="110"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const dayChart = ref(null);
const weekChart = ref(null);
const monthChart = ref(null);
const yearChart = ref(null);

import user01 from '@/assets/img/users/user-01.jpg';
import user05 from '@/assets/img/users/user-05.jpg';
import user03 from '@/assets/img/users/user-03.jpg';
import user04 from '@/assets/img/users/user-04.jpg';
import user02 from '@/assets/img/users/user-02.jpg';
import user06 from '@/assets/img/users/user-06.jpg';
import user07 from '@/assets/img/users/user-07.jpg';
import user08 from '@/assets/img/users/user-08.jpg';
import user30 from '@/assets/img/users/user-30.jpg';
import user27 from '@/assets/img/users/user-27.jpg';

const imageUrls = [
    user01,
    user05,
    user03,
    user04,
    user02,
    user06,
    user07,
    user08,
    user30,
    user27,
];

const chartData = [100, 95, 100, 100, 100, 70, 45, 78, 75, 80];
const labels = ['Micheal', 'Martinz', 'Clark', 'Hensrita', 'Lisa', 'Davis', 'Anderson', 'James', 'Merkel', 'Daniel'];

// Array to store loaded Image objects
const preloadedImages = [];

// Helper to load images once
const loadImages = () => {
    return new Promise((resolve) => {
        let imagesLoadedCount = 0;
        if (imageUrls.length === 0) resolve();

        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                imagesLoadedCount++;
                if (imagesLoadedCount === imageUrls.length) {
                    resolve();
                }
            };
            img.onerror = () => {
                // Resolve anyway to prevent blocking if an image fails
                imagesLoadedCount++;
                if (imagesLoadedCount === imageUrls.length) {
                    resolve();
                }
            }
            preloadedImages[index] = img;
        });
    });
};

const imageLabelsPlugin = {
    id: 'imageLabels',
    afterDraw(chart) {
        const { ctx, chartArea: { bottom }, scales: { x } } = chart;
        ctx.save();

        preloadedImages.forEach((image, index) => {
            if (!image || !image.complete) return;

            const xPos = x.getPixelForValue(index);
            const imageSize = 24;
            const imageY = bottom + 10;
            const radius = imageSize / 2;
            const centerX = xPos;
            const centerY = imageY + radius;

            // Draw image
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(image, xPos - radius, imageY, imageSize, imageSize);
            ctx.restore();

            // White border
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        });
        ctx.restore();
    }
};

const verticalLinesPlugin = {
    id: 'verticalLines',
    afterDatasetsDraw(chart) {
        const { ctx, scales: { x, y } } = chart;
        ctx.save();
        ctx.strokeStyle = '#B9CBD1';
        ctx.lineWidth = 6;
        const offset = 2;

        const dataset = chart.data.datasets[0];
        if (!dataset) return;

        for (let i = 0; i < dataset.data.length; i++) {
            const xPos = x.getPixelForValue(i);
            const val = dataset.data[i];
            const yPos = y.getPixelForValue(val);

            ctx.beginPath();
            ctx.moveTo(xPos, yPos + offset);
            ctx.lineTo(xPos, y.getPixelForValue(0));
            ctx.stroke();
        }
        ctx.restore();
    }
};

const createChartConfig = () => {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score',
                data: chartData,
                pointBackgroundColor: '#0C4B5E',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                showLine: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 10, bottom: 25 } },
            scales: {
                y: { min: 0, max: 110, ticks: { stepSize: 25, color: '#9CA3AF' }, grid: { color: '#F3F4F6' } },
                x: { grid: { display: false }, ticks: { display: false } }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        },
        plugins: [imageLabelsPlugin, verticalLinesPlugin]
    };
};
const createChartConfigOne = () => {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score',
                data: chartData,
                pointBackgroundColor: '#0C4B5E',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                showLine: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 10, bottom: 25 } },
            scales: {
                y: { min: 0, max: 110, ticks: { stepSize: 25, color: '#9CA3AF' }, grid: { color: '#F3F4F6' } },
                x: { grid: { display: false }, ticks: { display: false } }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        },
        plugins: [imageLabelsPlugin, verticalLinesPlugin]
    };
};
const createChartConfigTwo = () => {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score',
                data: chartData,
                pointBackgroundColor: '#0C4B5E',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                showLine: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 10, bottom: 25 } },
            scales: {
                y: { min: 0, max: 110, ticks: { stepSize: 25, color: '#9CA3AF' }, grid: { color: '#F3F4F6' } },
                x: { grid: { display: false }, ticks: { display: false } }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        },
        plugins: [imageLabelsPlugin, verticalLinesPlugin]
    };
};
const createChartConfigThree = () => {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score',
                data: chartData,
                pointBackgroundColor: '#0C4B5E',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                showLine: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 10, bottom: 25 } },
            scales: {
                y: { min: 0, max: 110, ticks: { stepSize: 25, color: '#9CA3AF' }, grid: { color: '#F3F4F6' } },
                x: { grid: { display: false }, ticks: { display: false } }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        },
        plugins: [imageLabelsPlugin, verticalLinesPlugin]
    };
};

const initChart = (canvasRef) => {
    if (canvasRef.value) {
        new Chart(canvasRef.value.getContext('2d'), createChartConfig());
    }
};
const initChartOne = (canvasRef) => {
    if (canvasRef.value) {
        new Chart(canvasRef.value.getContext('2d'), createChartConfigOne());
    }
};
const initChartTwo = (canvasRef) => {
    if (canvasRef.value) {
        new Chart(canvasRef.value.getContext('2d'), createChartConfigTwo());
    }
};
const initChartThree = (canvasRef) => {
    if (canvasRef.value) {
        new Chart(canvasRef.value.getContext('2d'), createChartConfigThree());
    }
};

onMounted(async () => {
    await loadImages();
    // Initialize all 4 charts
    initChart(dayChart);
    initChartOne(weekChart);
    initChartTwo(monthChart);
    initChartThree(yearChart);
});
</script>

<style scoped>
.chart-container {
    position: relative;
    height: 140px;
    width: 100%;
}
</style>
