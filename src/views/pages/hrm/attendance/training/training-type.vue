<script>
import api from "@/services/api";

export default {
  name: "TrainingTypePage",

  data() {
    return {
      title: "Training Type",
      text: "Training",
      text1: "Training Type",

      loading: false,
      trainings: [],
      total: 0,

      query: {
        page: 1,
        limit: 10,
        search: "",
      },

      error: null,
    };
  },

  mounted() {
    this.fetchTrainings();
  },

  methods: {
    toggleHeader() {
      const el = document.getElementById("collapse-header");
      if (el) el.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    async fetchTrainings() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get("/trainings", {
          params: this.query,
        });

        this.trainings = data?.data?.rows || [];
        this.total = data?.data?.count || 0;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Failed to fetch trainings";
      } finally {
        this.loading = false;
      }
    },

    handleSearch() {
      this.query.page = 1;
      this.fetchTrainings();
    },

    changePage(page) {
      this.query.page = page;
      this.fetchTrainings();
    },

    openCreateModal() {
      this.$refs.trainingModal?.open();
    },

    handleCreated() {
      this.fetchTrainings();
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.query.limit);
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
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">
          <div class="mb-2 me-2">
            <button
              class="btn btn-primary d-flex align-items-center"
              @click="openCreateModal"
            >
              <i class="ti ti-circle-plus me-2"></i>
              Add Training
            </button>
          </div>

          <div class="head-icons">
            <a href="javascript:void(0);" @click="toggleHeader">
              <i id="collapse-header" class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <!-- Header -->
        <div
          class="card-header d-flex justify-content-between align-items-center flex-wrap"
        >
          <h5>Training List</h5>

          <!-- Search -->
          <div class="d-flex align-items-center">
            <input
              v-model="query.search"
              @keyup.enter="handleSearch"
              type="text"
              class="form-control me-2"
              placeholder="Search training..."
              style="width: 220px"
            />
            <button class="btn btn-outline-primary" @click="handleSearch">
              Search
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="card-body">
          <!-- Loading -->
          <div v-if="loading" class="text-center py-4">
            <span class="spinner-border"></span>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Table -->
          <div v-else class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Trainer</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in trainings" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.Trainer?.name || "-" }}</td>
                  <td>{{ item.TrainingType?.name || "-" }}</td>
                  <td>
                    {{
                      item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"
                    }}
                  </td>
                </tr>

                <tr v-if="trainings.length === 0">
                  <td colspan="4" class="text-center py-3">
                    No trainings found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="card-footer d-flex justify-content-between align-items-center"
        >
          <small>
            Showing {{ trainings.length }} of {{ total }} results
          </small>

          <div>
            <button
              class="btn btn-sm btn-light me-1"
              :disabled="query.page === 1"
              @click="changePage(query.page - 1)"
            >
              Prev
            </button>

            <button
              class="btn btn-sm btn-light"
              :disabled="query.page >= totalPages"
              @click="changePage(query.page + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
      <p>
        Designed & Developed By
        <span class="text-primary">Dreams</span>
      </p>
    </div>
  </div>

  <!-- Modal -->
  <training-type-modal ref="trainingModal" @created="handleCreated" />
</template>
