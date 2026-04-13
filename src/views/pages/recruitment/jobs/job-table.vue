<script>
import api from "@/services/api";

export default {
  name: "JobTable",

  data() {
    return {
      jobs: [],
      loading: false,

      searchQuery: "",

      currentPage: 1,
      pageSize: 10,
      total: 0,

      selectedRowKeys: [],

      columns: [
        {
          title: "Job ID",
          dataIndex: "jobCode",
          key: "jobCode",
          sorter: true,
        },
        {
          title: "Job Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },
        {
          title: "Salary Range",
          key: "salary",
        },
        {
          title: "Posted Date",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "",
          key: "action",
        },
      ],
    };
  },

  computed: {
    formattedJobs() {
      return this.jobs.map((job) => ({
        ...job,

        salary: job.salaryMin && job.salaryMax
          ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`
          : "Not specified",

        createdAt: job.createdAt
          ? new Date(job.createdAt).toLocaleDateString()
          : "-",
      }));
    },
  },

  watch: {
    currentPage() {
      this.fetchJobs();
    },

    pageSize() {
      this.currentPage = 1;
      this.fetchJobs();
    },
  },

  mounted() {
    this.fetchJobs();
  },

  methods: {
    /**
     * FETCH JOBS FROM BACKEND
     */
    async fetchJobs() {
      try {
        this.loading = true;

        const { data } = await api.get("/jobs", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery || undefined,
          },
        });

        this.jobs = data.data || [];
        this.total = data.total || 0;
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * SEARCH HANDLER (debounce-ready)
     */
    onSearch() {
      this.currentPage = 1;
      this.fetchJobs();
    },

    /**
     * IMAGE RESOLVER (optional icons)
     */
    getImageUrl(imageName) {
      return new URL(
        `/src/assets/img/icons/${imageName}`,
        import.meta.url
      ).href;
    },

    /**
     * ROW SELECTION
     */
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- SEARCH + PAGE SIZE -->
    <div class="row p-3">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select form-select-sm w-auto">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          @input="onSearch"
          type="search"
          class="form-control form-control-sm w-auto d-inline-block"
          placeholder="Search jobs..."
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="formattedJobs"
        :loading="loading"
        :row-selection="{
          selectedRowKeys,
          onChange: onSelectChange
        }"
        row-key="id"
        class="table datatable"
        :pagination="false"
      >

        <!-- JOB TITLE SLOT -->
        <template #bodyCell="{ column, record }">

          <template v-if="column.key === 'title'">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-md bg-light rounded me-2">
                <i class="ti ti-briefcase"></i>
              </div>

              <div>
                <h6 class="mb-0 fw-medium">{{ record.title }}</h6>
                <small class="text-muted">{{ record.jobCode }}</small>
              </div>
            </div>
          </template>

          <!-- ACTIONS -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2">
                <i class="ti ti-eye"></i>
              </a>

              <a href="javascript:void(0);" class="me-2">
                <i class="ti ti-edit"></i>
              </a>

              <a href="javascript:void(0);" class="text-danger">
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>

        </template>

      </a-table>
    </div>

    <!-- PAGINATION -->
    <div class="row align-items-center p-3">
      <div class="col-md-6">
        <small class="text-muted">
          Showing {{ (currentPage - 1) * pageSize + 1 }}
          -
          {{ Math.min(currentPage * pageSize, total) }}
          of {{ total }} jobs
        </small>
      </div>

      <div class="col-md-6 text-end">
        <ul class="pagination justify-content-end mb-0">

          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="currentPage--">
              <i class="ti ti-chevron-left"></i>
            </a>
          </li>

          <li class="page-item active">
            <span class="page-link">{{ currentPage }}</span>
          </li>

          <li class="page-item" :class="{ disabled: jobs.length < pageSize }">
            <a class="page-link" href="#" @click.prevent="currentPage++">
              <i class="ti ti-chevron-right"></i>
            </a>
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>
