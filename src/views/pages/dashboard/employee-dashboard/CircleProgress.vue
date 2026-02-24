<template>
    <div class="attendance-circle-progress attendance-progress mx-auto mb-3" :data-value="value" role="img"
        :aria-label="`Attendance progress: ${value}%`" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
        <circle-progress :percent="value" :border-width="10" :border-bg-width="10" fill-color="#28a745"
            empty-color="#E5E5E5" line-cap="round" :size="120" />
        <div class="total-work-hours text-center w-100">
            <span class="fs-13 d-block mb-1">Total Hours</span>
            <h6>5:45:32</h6>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";

export default defineComponent({
    name: "CircleProgressWrapper",
    components: {
        CircleProgress,
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
});
</script>

<style scoped>
.attendance-circle-progress {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.total-work-hours {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

/* Ensure the svg from the library is positioned correctly if needed, though default is usually fine */
.attendance-circle-progress :deep(.vue3-circle-progress) {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
