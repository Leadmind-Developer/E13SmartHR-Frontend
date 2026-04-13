<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div class="my-auto mb-2">
          <h2 class="mb-1">Campus Hiring</h2>
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/dashboard/">
                  <i class="ti ti-smart-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">Recruitment</li>
              <li class="breadcrumb-item active">Campus Hiring</li>
            </ol>
          </nav>
        </div>

        <div class="d-flex align-items-center flex-wrap">

          <button class="btn btn-primary me-2" @click="openCreateModal">
            <i class="ti ti-circle-plus me-1"></i>
            Add Candidate
          </button>

          <div class="head-icons ms-2">
            <a href="javascript:void(0);" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- CARD -->
      <div class="card">
        <div class="card-header d-flex justify-content-between flex-wrap">

          <h5>Students List</h5>

          <div class="d-flex align-items-center gap-2">

            <input
              v-model="searchQuery"
              @input="fetchData"
              class="form-control form-control-sm"
              placeholder="Search candidate..."
            />

            <select v-model="pageSize" @change="fetchData" class="form-select form-select-sm">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>

          </div>
        </div>

        <div class="card-body p-0">

          <!-- TABLE -->
          <a-table
            :columns="columns"
            :data-source="rows"
            :loading="loading"
            :pagination="false"
            row-key="id"
          >

            <!-- STUDENT -->
            <template #bodyCell="{ column, record }">

              <template v-if="column.key === 'student'">
                <div class="d-flex align-items-center">
                  <img
                    :src="getImage(record.studentImage)"
                    class="avatar avatar-sm me-2"
                  />
                  <div>
                    <div class="fw-medium">{{ record.studentName }}</div>
                    <small>{{ record.studentEmail }}</small>
                  </div>
                </div>
              </template>

              <!-- RECRUITER -->
              <template v-if="column.key === 'recruiter'">
                <div class="d-flex align-items-center">
                  <img
                    :src="getImage(record.recruiterImage)"
                    class="avatar avatar-sm me-2"
                  />
                  <span>{{ record.recruiterName }}</span>
                </div>
              </template>

              <!-- STATUS -->
              <template v-if="column.key === 'status'">
                <select
                  v-model="record.status"
                  class="form-select form-select-sm"
                  @change="updateStatus(record)"
                >
                  <option value="APPLIED">Applied</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="SELECTED">Selected</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </template>

              <!-- ACTION -->
              <template v-if="column.key === 'action'">
                <button class="btn btn-sm btn-outline-danger" @click="deleteRow(record.id)">
                  Delete
                </button>
              </template>

            </template>

          </a-table>

          <!-- PAGINATION -->
          <div class="p-3 d-flex justify-content-between align-items-center">
            <div>
              Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }}
            </div>

            <div class="btn-group">
              <button class="btn btn-light" @click="prevPage" :disabled="page === 1">
                Prev
              </button>
              <button class="btn btn-light" @click="nextPage" :disabled="page === meta.lastPage">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      rows: [],
      loading: false,

      searchQuery: "",
      page: 1,
      pageSize: 10,

      meta: {
        total: 0,
        lastPage: 1,
        from: 0,
        to: 0,
      },

      columns: [
        { title: "Student", key: "student" },
        { title: "Branch", dataIndex: "branch" },
        { title: "Graduation", dataIndex: "graduationYear" },
        { title: "Job Role", dataIndex: "jobRole" },
        { title: "Recruiter", key: "recruiter" },
        { title: "Status", key: "status" },
        { title: "Action", key: "action" },
      ],
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {

    async fetchData() {
      this.loading = true;

      try {
        const { data } = await api.get("/campusHiring", {
          params: {
            page: this.page,
            limit: this.pageSize,
            search: this.searchQuery,
          },
        });

        const result = data.data;

        this.rows = result.rows;

        this.meta.total = result.count;
        this.meta.lastPage = Math.ceil(result.count / this.pageSize);
        this.meta.from = (this.page - 1) * this.pageSize + 1;
        this.meta.to = Math.min(this.page * this.pageSize, result.count);

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(record) {
      try {
        await api.patch(`/campusHiring/${record.id}/status`, {
          status: record.status,
        });
      } catch (err) {
        console.error("Status update failed", err);
      }
    },

    async deleteRow(id) {
      try {
        await api.delete(`/campusHiring/${id}`);
        this.fetchData();
      } catch (err) {
        console.error("Delete failed", err);
      }
    },

    nextPage() {
      if (this.page < this.meta.lastPage) {
        this.page++;
        this.fetchData();
      }
    },

    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchData();
      }
    },

    getImage(img) {
      return img
        ? new URL(`/src/assets/img/users/${img}`, import.meta.url).href
        : "/default-avatar.png";
    },

    toggleHeader() {
      document.body.classList.toggle("header-collapse");
    },

    openCreateModal() {
      this.$emit("open-create-candidate");
    },
  },
};
</script>
