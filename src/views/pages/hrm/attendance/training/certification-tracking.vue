<script>
import api from "@/services/api";

export default {
  name: "CertificationTracking",

  data() {
    return {
      loading: false,
      certifications: [],
      total: 0,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,

      columns: [
        { title: "Employee", key: "employee" },
        { title: "Training", key: "training" },
        { title: "Trainer", key: "trainer" },
        { title: "Date", key: "date" },
        { title: "Status", key: "status" },
        { title: "", key: "action" },
      ],
    };
  },

  mounted() {
    this.fetchCertifications();
  },

  watch: {
    currentPage() {
      this.fetchCertifications();
    },
    pageSize() {
      this.fetchCertifications();
    },
    searchQuery() {
      this.debouncedFetch();
    },
  },

  created() {
    this.debouncedFetch = this.debounce(this.fetchCertifications, 500);
  },

  methods: {
    async fetchCertifications() {
      this.loading = true;

      try {
        const { data } = await api.get("/certifications", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery,
          },
        });

        const result = data?.data;

        this.certifications = result?.rows || [];
        this.total = result?.count || 0;
      } catch (err) {
        console.error("Failed to fetch certifications:", err);
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    debounce(fn, delay) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
      };
    },

    canIssue() {
      // Replace with real permission check if stored in auth state
      return true;
    },

    downloadCertification(record) {
      // TODO: hook to backend download endpoint
      console.log("Download:", record.id);
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-md-flex justify-content-between mb-3">
        <div>
          <h2>Certification Tracking</h2>
        </div>

        <div v-if="canIssue()">
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_modal"
          >
            + Issue Certification
          </button>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h5>Certification List</h5>

          <input
            v-model="searchQuery"
            type="text"
            class="form-control w-25"
            placeholder="Search..."
          />
        </div>

        <div class="card-body p-0">

          <!-- Table -->
          <div class="table-responsive">
            <a-table
              :columns="columns"
              :data-source="certifications"
              :loading="loading"
              :pagination="false"
              row-key="id"
            >
              <template #bodyCell="{ column, record }">

                <!-- Employee -->
                <template v-if="column.key === 'employee'">
                  <div>
                    <strong>{{ record.User?.email || "N/A" }}</strong>
                  </div>
                </template>

                <!-- Training -->
                <template v-if="column.key === 'training'">
                  {{ record.Training?.title || "N/A" }}
                </template>

                <!-- Trainer -->
                <template v-if="column.key === 'trainer'">
                  {{ record.Trainer?.name || "N/A" }}
                </template>

                <!-- Date -->
                <template v-if="column.key === 'date'">
                  {{ formatDate(record.issuedAt) }}
                </template>

                <!-- Status -->
                <template v-if="column.key === 'status'">
                  <span class="badge bg-success">Issued</span>
                </template>

                <!-- Actions -->
                <template v-if="column.key === 'action'">
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-sm btn-light"
                      @click="downloadCertification(record)"
                    >
                      <i class="ti ti-download"></i>
                    </button>
                  </div>
                </template>

              </template>
            </a-table>
          </div>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center p-3">

            <div>
              Showing
              {{ (currentPage - 1) * pageSize + 1 }}
              -
              {{ Math.min(currentPage * pageSize, total) }}
              of {{ total }}
            </div>

            <div class="d-flex align-items-center gap-2">
              <select v-model="pageSize" class="form-select form-select-sm">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>

              <button
                class="btn btn-sm btn-light"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Prev
              </button>

              <span>Page {{ currentPage }}</span>

              <button
                class="btn btn-sm btn-light"
                :disabled="currentPage * pageSize >= total"
                @click="currentPage++"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <certification-tracking-modal />
</template>
