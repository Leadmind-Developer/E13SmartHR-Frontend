<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>

  <div class="page-wrapper cardhead">
    <div class="content">
      <!-- Page Header -->
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Counter</h3>
          </div>
        </div>
      </div>
      <!-- /Page Header -->

      <div class="row">
        <!-- Counter for Clients -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>Clients</h5>
              <h6 class="counter">{{ displayedClients }}</h6>
            </div>
          </div>
        </div>

        <!-- Timer for Countdown -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Count Down</h5>
            </div>
            <div class="card-body">
              <h6>Time Count from 3 minutes</h6>
              <span>{{ countdownFormatted }}</span>
            </div>
          </div>
        </div>

        <!-- Timer for Count Up -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Count Up</h5>
            </div>
            <div class="card-body">
              <h6>Time Counting From 0</h6>
              <span>{{ countup }}</span>
            </div>
          </div>
        </div>

        <!-- Count Inbetween -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Count Inbetween</h5>
            </div>
            <div class="card-body">
              <h6>Time counting from 30 to 20</h6>
              <span>{{ countInBetween }}</span>
            </div>
          </div>
        </div>

        <!-- Count Callback -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Count Callback</h5>
            </div>
            <div
              class="card-body"
              :style="{
                'text-decoration': countCallback <= 0 ? 'line-through' : 'none',
                opacity: countCallback <= 0 ? 0.5 : 1,
              }"
            >
              <h6>Count from 10 to 0</h6>
              <span>{{ countCallback }}</span>
            </div>
          </div>
        </div>

        <!-- Custom Output -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Custom Output</h5>
            </div>
            <div class="card-body">
              <h6>Changed output pattern</h6>
              <span>{{ customOutput }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      displayedClients: 3000,
      countdown: 180, // 3 minutes in seconds
      countup: 0,
      countInBetween: 30,
      countCallback: 10,
      customOutput: "",
      countdownInterval: null,
      countupInterval: null,
      countInBetweenInterval: null,
      countCallbackInterval: null,
    };
  },
  computed: {
    countdownFormatted() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
    },
  },
  mounted() {
    this.startCountdown();
    this.startCountUp();
    this.startCountInBetween();
    this.startCountCallback();
    this.customOutputPattern();
  },
  beforeDestroy() {
    this.clearIntervals();
  },
  methods: {
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    },
    startCountUp() {
      this.countupInterval = setInterval(() => {
        this.countup++;
      }, 1000);
    },
    startCountInBetween() {
      this.countInBetweenInterval = setInterval(() => {
        if (this.countInBetween > 20) {
          this.countInBetween--;
        } else {
          clearInterval(this.countInBetweenInterval);
        }
      }, 1000);
    },
    startCountCallback() {
      this.countCallbackInterval = setInterval(() => {
        if (this.countCallback > 0) {
          this.countCallback--;
        } else {
          clearInterval(this.countCallbackInterval);
          this.timerEndCallback();
        }
      }, 1000);
    },
    customOutputPattern() {
      this.customOutput = "Output Pattern: " + new Date().toLocaleTimeString();
    },
    timerEndCallback() {
      alert("Countdown completed!");
    },
    clearIntervals() {
      clearInterval(this.countdownInterval);
      clearInterval(this.countupInterval);
      clearInterval(this.countInBetweenInterval);
      clearInterval(this.countCallbackInterval);
    },
  },
};
</script>
