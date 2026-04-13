<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import moment from "moment";

const loading = ref(false);
const candidates = ref([]);
const nextCursor = ref(null);

const search = ref("");
const stage = ref("");

const fetchCandidates = async (append = false) => {
  try {
    loading.value = true;

    const { data } = await api.get("/candidates", {
      params: {
        limit: 12,
        cursor: append ? nextCursor.value : null,
        search: search.value || undefined,
        stage: stage.value || undefined,
      },
    });

    if (append) {
      candidates.value.push(...data.data);
    } else {
      candidates.value = data.data;
    }

    nextCursor.value = data.nextCursor;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  if (nextCursor.value) fetchCandidates(true);
};

const getBadge = (stage) => {
  const map = {
    NEW: "bg-purple",
    SCHEDULED: "bg-pink",
    INTERVIEWED: "bg-info",
    OFFERED: "bg-warning",
    HIRED: "bg-success",
    REJECTED: "bg-danger",
  };
  return map[stage] || "bg-secondary";
};

onMounted(() => {
  fetchCandidates();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Candidates</h4>

        <div class="d-flex gap-2">
          <input
            v-model="search"
            @input="fetchCandidates()"
            type="text"
            class="form-control"
            placeholder="Search candidates..."
          />

          <select v-model="stage" @change="fetchCandidates()" class="form-select">
            <option value="">All</option>
            <option value="NEW">New</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="INTERVIEWED">Interviewed</option>
            <option value="OFFERED">Offered</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <!-- Grid -->
      <div class="row">
        <div
          v-for="c in candidates"
          :key="c.id"
          class="col-xxl-3 col-xl-4 col-md-6"
        >
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <div>
                  <h6 class="mb-0">{{ c.name }}</h6>
                  <small class="text-muted">{{ c.candidateCode }}</small>
                </div>
              </div>

              <p class="text-muted mb-1" v-if="c.email">{{ c.email }}</p>

              <div class="bg-light p-2 rounded">
                <div class="d-flex justify-content-between">
                  <span>Role</span>
                  <strong>{{ c.appliedRole }}</strong>
                </div>

                <div class="d-flex justify-content-between">
                  <span>Date</span>
                  <strong>{{ moment(c.createdAt).format("DD MMM YYYY") }}</strong>
                </div>

                <div class="d-flex justify-content-between">
                  <span>Status</span>
                  <span :class="`badge ${getBadge(c.stage)}`">
                    {{ c.stage }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-3 d-flex gap-2">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="$router.push(`/recruitment/candidates/${c.id}`)"
                >
                  View
                </button>

                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="async () => {
                    await api.delete(`/candidates/${c.id}`);
                    fetchCandidates();
                  }"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-4" v-if="nextCursor">
        <button class="btn btn-primary" @click="loadMore" :disabled="loading">
          {{ loading ? "Loading..." : "Load More" }}
        </button>
      </div>
    </div>

    <div class="footer text-center p-3">
      <small>{{ new Date().getFullYear() }} © SmartHR</small>
    </div>
  </div>
</template>
