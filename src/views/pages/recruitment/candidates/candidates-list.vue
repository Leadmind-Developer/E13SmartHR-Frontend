<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

/**
 * ===============================
 * STATE
 * ===============================
 */
const loading = ref(false);
const candidates = ref([]);
const nextCursor = ref(null);

const filters = ref({
  search: "",
  stage: "",
  limit: 10,
});

/**
 * ===============================
 * FETCH CANDIDATES (CURSOR BASED)
 * ===============================
 */
const fetchCandidates = async (reset = false) => {
  try {
    loading.value = true;

    const params = {
      ...filters.value,
      cursor: reset ? null : nextCursor.value,
    };

    const { data } = await api.get("/candidate", { params });

    if (reset) {
      candidates.value = data.data;
    } else {
      candidates.value = [...candidates.value, ...data.data];
    }

    nextCursor.value = data.nextCursor;
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
};

/**
 * ===============================
 * FILTER HANDLERS
 * ===============================
 */
const onSearch = () => {
  nextCursor.value = null;
  fetchCandidates(true);
};

const setStage = (stage) => {
  filters.value.stage = stage;
  nextCursor.value = null;
  fetchCandidates(true);
};

/**
 * ===============================
 * DELETE
 * ===============================
 */
const deleteCandidate = async (id) => {
  if (!confirm("Delete this candidate?")) return;

  try {
    await api.delete(`/candidate/${id}`);
    candidates.value = candidates.value.filter((c) => c.id !== id);
  } catch (err) {
    console.error(err);
  }
};

/**
 * ===============================
 * STAGE UPDATE
 * ===============================
 */
const updateStage = async (id, stage) => {
  try {
    await api.patch(`/candidate/${id}/stage`, { stage });

    const c = candidates.value.find((x) => x.id === id);
    if (c) c.stage = stage;
  } catch (err) {
    console.error(err);
  }
};

/**
 * ===============================
 * INIT
 * ===============================
 */
onMounted(() => {
  fetchCandidates(true);
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Candidates</h4>

        <router-link
          to="/recuritment/candidates-kanban"
          class="btn btn-outline-primary btn-sm"
        >
          Kanban View
        </router-link>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <!-- SEARCH -->
          <input
            v-model="filters.search"
            @keyup.enter="onSearch"
            placeholder="Search candidate..."
            class="form-control w-auto"
          />

          <!-- STAGE FILTER -->
          <select
            v-model="filters.stage"
            @change="onSearch"
            class="form-select w-auto"
          >
            <option value="">All Stages</option>
            <option value="NEW">New</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="INTERVIEWED">Interviewed</option>
            <option value="OFFERED">Offered</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button class="btn btn-primary btn-sm" @click="onSearch">
            Search
          </button>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-body table-responsive">

          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Stage</th>
                <th>Applied</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="loading">
                <td colspan="6" class="text-center">Loading...</td>
              </tr>

              <tr v-for="c in candidates" :key="c.id">
                <td>{{ c.name }}</td>
                <td>{{ c.appliedRole }}</td>
                <td>{{ c.email || 'Restricted' }}</td>

                <!-- STAGE -->
                <td>
                  <select
                    :value="c.stage"
                    @change="updateStage(c.id, $event.target.value)"
                    class="form-select form-select-sm"
                  >
                    <option value="NEW">New</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="INTERVIEWED">Interviewed</option>
                    <option value="OFFERED">Offered</option>
                    <option value="HIRED">Hired</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>

                <td>{{ new Date(c.createdAt).toLocaleDateString() }}</td>

                <!-- ACTIONS -->
                <td class="text-end">
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteCandidate(c.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              <tr v-if="!loading && candidates.length === 0">
                <td colspan="6" class="text-center">
                  No candidates found
                </td>
              </tr>
            </tbody>
          </table>

          <!-- LOAD MORE -->
          <div class="text-center mt-3" v-if="nextCursor">
            <button
              class="btn btn-outline-primary"
              @click="fetchCandidates()"
              :disabled="loading"
            >
              {{ loading ? "Loading..." : "Load More" }}
            </button>
          </div>

        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="footer text-center p-3">
      © {{ new Date().getFullYear() }} SmartHR
    </div>
  </div>
</template>
