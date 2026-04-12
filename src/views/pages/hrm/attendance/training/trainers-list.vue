<script>
import api from "@/services/api";

export default {
  name: "TrainersList",

  data() {
    return {
      title: "Trainers",
      text: "Training",
      text1: "Trainers",

      loading: false,
      error: null,

      trainers: [],
      total: 0,

      query: {
        page: 1,
        limit: 10,
        search: "",
      },
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.query.limit);
    },
  },

  mounted() {
    this.fetchTrainers();
  },

  methods: {
    toggleHeader() {
      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    async fetchTrainers() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get("/trainings", {
          params: this.query,
        });

        const payload = data?.data;

        this.trainers = payload?.rows || [];
        this.total = payload?.count || 0;
      } catch (err) {
        this.error =
          err?.response?.data?.message || "Failed to fetch trainers";
      } finally {
        this.loading = false;
      }
    },

    handleSearch() {
      this.query.page = 1;
      this.fetchTrainers();
    },

    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.query.page = page;
      this.fetchTrainers();
    },

    refresh() {
      this.fetchTrainers();
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

        <div
          class="d-flex my-xl-auto right-content align-items-center flex-wrap"
        >
          <div class="mb-2">
            <!-- Only show if user is ADMIN (future: permission-based) -->
            <a
              href="javascript:void(0);"
              data-bs-toggle="modal"
              data-bs-target="#add_trainer"
              class="btn btn-primary d-flex align-items-center"
            >
              <i class="ti ti-circle-plus me-2"></i>
              Add Trainer
            </a>
          </div>

          <div class="head-icons ms-2">
            <a
              href="javascript:void(0);"
              data-bs-toggle="tooltip"
              title="Collapse"
              id="collapse-header"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <!-- Header -->
        <div
          class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3"
        >
          <h5>Trainers List</h5>

          <div
            class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3"
          >
            <!-- Search -->
            <div class="input-group">
              <input
                v-model="query.search"
                @keyup.enter="handleSearch"
                type="text"
                class="form-control"
                placeholder="Search trainings..."
              />
              <button class="btn btn-primary" @click="handleSearch">
                Search
              </button>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="card-body">
          <!-- Loading -->
          <div v-if="loading" class="text-center py-5">
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
                  <th>#</th>
                  <th>Title</th>
                  <th>Trainer</th>
                  <th>Type</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in trainers" :key="item.id">
                  <td>
                    {{ (query.page - 1) * query.limit + index + 1 }}
                  </td>
                  <td>{{ item.title }}</td>
                  <td>
                    {{ item.Trainer?.name || "—" }}
                  </td>
                  <td>
                    {{ item.TrainingType?.name || "—" }}
                  </td>
                  <td>
                    {{ new Date(item.createdAt).toLocaleDateString() }}
                  </td>
                </tr>

                <tr v-if="!trainers.length">
                  <td colspan="5" class="text-center py-4">
                    No data found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="d-flex justify-content-between align-items-center mt-3"
          >
            <button
              class="btn btn-light"
              :disabled="query.page === 1"
              @click="changePage(query.page - 1)"
            >
              Prev
            </button>

            <span>Page {{ query.page }} of {{ totalPages }}</span>

            <button
              class="btn btn-light"
              :disabled="query.page === totalPages"
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
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <!-- Modal -->
  <trainers-modal @created="refresh" />
</template>
