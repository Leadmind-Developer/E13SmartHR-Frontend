<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import api from "@/services/api";

// UI state
const title = "Performance Appraisal";
const text = "Performance";
const text1 = "Performance Appraisal";

const appraisals = ref([]);
const loading = ref(false);
const selectedAppraisal = ref(null);
const review360 = ref(null);

// Modal form
const form = ref({
  employeeId: "",
  reviewerId: "",
  departmentId: "",
  appraisalDate: moment().format("YYYY-MM-DD"),
  scores: [],
});

// Toggle header
const toggleHeader = () => {
  const el = document.getElementById("collapse-header");
  if (el) el.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

// -----------------------------
// Fetch appraisals (cached backend)
// -----------------------------
const fetchAppraisals = async () => {
  try {
    loading.value = true;
    const res = await api.get("/performance/appraisals");
    appraisals.value = res.data.data || [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// -----------------------------
// Create appraisal
// -----------------------------
const createAppraisal = async () => {
  try {
    const payload = {
      employeeId: form.value.employeeId,
      reviewerId: form.value.reviewerId,
      departmentId: form.value.departmentId,
      appraisalDate: form.value.appraisalDate,
      scores: form.value.scores,
    };

    await api.post("/performance/appraisals", payload);

    await fetchAppraisals();

    form.value = {
      employeeId: "",
      reviewerId: "",
      departmentId: "",
      appraisalDate: moment().format("YYYY-MM-DD"),
      scores: [],
    };

    alert("Appraisal created successfully");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || err.message);
  }
};

// -----------------------------
// View appraisal (AI report)
// -----------------------------
const viewAppraisal = async (id) => {
  try {
    const res = await api.get(`/performance/appraisals/${id}`);
    selectedAppraisal.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
};

// -----------------------------
// Load 360 review
// -----------------------------
const load360 = async (id) => {
  try {
    const res = await api.get(`/performance/appraisals/${id}/360`);
    review360.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
};

// -----------------------------
// Approval action
// -----------------------------
const updateStatus = async (id, action) => {
  try {
    await api.patch(`/performance/appraisals/${id}/status`, {
      action,
    });

    await fetchAppraisals();

    alert(`Appraisal ${action.toLowerCase()}d`);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || err.message);
  }
};

onMounted(() => {
  fetchAppraisals();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center">
          <button
            class="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add_performance_appraisal"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Appraisal
          </button>

          <a
            href="javascript:void(0);"
            class="ms-3"
            id="collapse-header"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>

      <!-- Table Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h5>Performance Appraisals</h5>
        </div>

        <div class="card-body">
          <div v-if="loading">Loading...</div>

          <table v-else class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Status</th>
                <th>Stage</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in appraisals" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.employeeId }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.approvalStage }}</td>
                <td>{{ item.overallScore }}</td>

                <td class="d-flex gap-2">
                  <button class="btn btn-sm btn-info" @click="viewAppraisal(item.id)">
                    View
                  </button>

                  <button class="btn btn-sm btn-secondary" @click="load360(item.id)">
                    360°
                  </button>

                  <button
                    class="btn btn-sm btn-success"
                    @click="updateStatus(item.id, 'APPROVE')"
                  >
                    Approve
                  </button>

                  <button
                    class="btn btn-sm btn-danger"
                    @click="updateStatus(item.id, 'REJECT')"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- AI Report Modal -->
      <div v-if="selectedAppraisal" class="card mt-4">
        <div class="card-header">
          <h5>AI Performance Report</h5>
        </div>
        <div class="card-body">
          <p><strong>Summary:</strong> {{ selectedAppraisal.report.summary }}</p>

          <p><strong>Recommendation:</strong> {{ selectedAppraisal.report.recommendation }}</p>

          <p><strong>Strengths:</strong></p>
          <ul>
            <li v-for="s in selectedAppraisal.report.strengths" :key="s">{{ s }}</li>
          </ul>

          <p><strong>Improvements:</strong></p>
          <ul>
            <li v-for="i in selectedAppraisal.report.improvements" :key="i">{{ i }}</li>
          </ul>
        </div>
      </div>

      <!-- 360 Review -->
      <div v-if="review360" class="card mt-4">
        <div class="card-header">
          <h5>360 Review</h5>
        </div>
        <div class="card-body">
          <div v-for="(scores, reviewer) in review360" :key="reviewer">
            <h6>Reviewer: {{ reviewer }}</h6>
            <ul>
              <li v-for="s in scores" :key="s.id">
                {{ s.indicatorId }} - Score: {{ s.score }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed & Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <!-- Modal (existing component assumed) -->
  <performance-appraisal-modal @created="fetchAppraisals" />
</template>
