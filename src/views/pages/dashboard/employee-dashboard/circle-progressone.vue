<template>
    <!-- <div :class="['attendance-circle-progress', containerClass]" :data-value="value" role="img"
        :aria-label="`${ariaLabel}: ${value}%`" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100"
        :style="{ width: size + 'px', height: size + 'px' }">
        <circle-progress :percent="value" :border-width="borderWidth" :border-bg-width="borderBgWidth"
            :fill-color="fillColor" :empty-color="emptyColor" :line-cap="lineCap" :size="size" />
        <div class="progress-content text-center w-100">
            <template v-if="time">
                <span class="fs-13 d-block mb-1">{{ label }}</span>
                <h6>{{ time }}</h6>
            </template>
<template v-else>
                <div class="progress-value">{{ value }}%</div>
            </template>
</div>
</div> -->
    <div class="circle-progress circle-progress-md" :data-value="value"
        :style="{ width: size + 'px', height: size + 'px' }">
        <span class="progress-left">
            <span class="progress-bar" :style="[leftBarStyle, { borderColor: fillColor }]"></span>
        </span>
        <span class="progress-right">
            <span class="progress-bar" :style="[rightBarStyle, { borderColor: fillColor }]"></span>
        </span>
        <div class="progress-value">{{ value }}%</div>
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
        value: { type: Number, required: true },
        borderWidth: { type: Number, default: 10 },
        borderBgWidth: { type: Number, default: 10 },
        fillColor: { type: String, default: "#28a745" },
        emptyColor: { type: String, default: "#E5E5E5" },
        size: { type: Number, default: 120 },
        label: { type: String, default: "Total Hours" },
        time: { type: String, default: "" },
        lineCap: { type: String, default: "round" },
        containerClass: { type: String, default: "" },
        ariaLabel: { type: String, default: "Attendance progress" }
    },
    computed: {
        rightBarStyle() {
            const rotation = Math.min(this.value, 50) * 3.6;
            return {
                transform: `rotate(${rotation}deg)`
            };
        },
        leftBarStyle() {
            const rotation = Math.max(0, this.value - 50) * 3.6;
            return {
                transform: `rotate(${rotation}deg)`
            };
        }
    }
});
</script>
