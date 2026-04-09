<script>
import api from "@/services/api";

export default {
  name: "PerformanceReview",

  data() {
    return {
      title: "Performance Review",
      text: "Performance",
      text1: "Performance Review",

      loading: false,
      submitting: false,

      appraisalId: this.$route.params.id || null,

      appraisal: null,
      scores: [],
      review360: null,

      form: {
        status: "",
      },
    };
  },

  async mounted() {
    if (this.appraisalId) {
      await this.fetchAppraisal();
      await this.fetch360();
    }
  },

  computed: {
    totalScore() {
      if (!this.scores.length) return 0;
      const sum = this.scores.reduce((acc, s) => acc + (Number(s.score) || 0), 0);
      return (sum / this.scores.length).toFixed(2);
    },
  },

  methods: {
    toggleHeader() {
      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    // -----------------------------
    // Fetch Appraisal
    // -----------------------------
    async fetchAppraisal() {
      this.loading = true;
      try {
        const res = await api.get(`/appraisals/${this.appraisalId}`);
        this.appraisal = res.data.data;

        this.scores = this.appraisal?.scores || [];
      } catch (err) {
        console.error(err);
        this.$toast?.error("Failed to load appraisal");
      } finally {
        this.loading = false;
      }
    },

    // -----------------------------
    // Fetch 360 Review
    // -----------------------------
    async fetch360() {
      try {
        const res = await api.get(`/appraisals/${this.appraisalId}/360`);
        this.review360 = res.data.data;
      } catch (err) {
        console.error(err);
      }
    },

    // -----------------------------
    // Update KPI Score
    // -----------------------------
    updateScore(index, value) {
      this.scores[index].score = Number(value);
    },

    // -----------------------------
    // Approval Action
    // -----------------------------
    async handleApproval(action) {
      this.submitting = true;

      try {
        await api.patch(`/appraisals/${this.appraisalId}/status`, {
          action,
        });

        this.$toast?.success(`Appraisal ${action.toLowerCase()}ed`);

        await this.fetchAppraisal();
      } catch (err) {
        console.error(err);
        this.$toast?.error("Action failed");
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="head-icons ms-2">
          <a
            href="javascript:void(0);"
            id="collapse-header"
            data-bs-toggle="tooltip"
            title="Collapse"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="text-center py-5">
        Loading appraisal...
      </div>

      <!-- Appraisal Content -->
      <div v-if="appraisal">

        <!-- Employee Info -->
        <section class="card border-0">
          <div class="card-header text-center">
            <h3 class="mb-2">Employee Information</h3>
          </div>

          <div class="card-body row">
            <div class="col-md-4">
              <p><strong>Name:</strong> {{ appraisal.employee?.name }}</p>
              <p><strong>Department:</strong> {{ appraisal.departmentId }}</p>
            </div>

            <div class="col-md-4">
              <p><strong>Reviewer:</strong> {{ appraisal.reviewer?.name }}</p>
              <p><strong>Status:</strong> {{ appraisal.status }}</p>
            </div>

            <div class="col-md-4">
              <p><strong>Date:</strong> {{ appraisal.appraisalDate }}</p>
            </div>
          </div>
        </section>

        <!-- KPI Scores -->
        <section class="card border-0">
          <div class="card-header text-center">
            <h3>KPI Scores</h3>
          </div>

          <div class="card-body table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Indicator</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(score, index) in scores" :key="index">
                  <td>{{ score.indicatorId }}</td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      v-model="score.score"
                      @input="updateScore(index, $event.target.value)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="mt-3">
              <strong>Total Average Score: </strong> {{ totalScore }}
            </div>
          </div>
        </section>

        <!-- 360 Review -->
        <section class="card border-0" v-if="review360">
          <div class="card-header text-center">
            <h3>360 Review Summary</h3>
          </div>

          <div class="card-body">
            <pre>{{ review360 }}</pre>
          </div>
        </section>

        <!-- Actions -->
        <section class="card border-0">
          <div class="card-body text-end">

            <button
              class="btn btn-success me-2"
              :disabled="submitting"
              @click="handleApproval('APPROVE')"
            >
              Approve
            </button>

            <button
              class="btn btn-danger"
              :disabled="submitting"
              @click="handleApproval('REJECT')"
            >
              Reject
            </button>

          </div>
        </section>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">{{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed & Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>

  </div>
</template>
