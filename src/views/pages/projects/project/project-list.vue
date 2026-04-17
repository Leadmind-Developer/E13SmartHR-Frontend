<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <!-- View Switch -->
          <div class="me-2 mb-2">
            <div class="d-flex align-items-center border bg-white rounded p-1 me-2">
              <router-link to="/projects/projects-list"
                class="btn btn-icon btn-sm active bg-primary text-white me-1">
                <i class="ti ti-list-tree"></i>
              </router-link>
              <router-link to="/projects/projects-grid" class="btn btn-icon btn-sm">
                <i class="ti ti-layout-grid"></i>
              </router-link>
            </div>
          </div>

          <!-- Export -->
          <div class="me-2 mb-2">
            <button class="btn btn-white" @click="exportData">
              <i class="ti ti-file-export me-1"></i> Export
            </button>
          </div>

          <!-- Add -->
          <div class="mb-2">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_project">
              <i class="ti ti-circle-plus me-2"></i>Add Project
            </button>
          </div>

          <div class="ms-2 head-icons">
            <a href="javascript:void(0);" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between flex-wrap">

          <h5>Project List</h5>

          <div class="d-flex flex-wrap gap-2">

            <!-- Search -->
            <input
              v-model="filters.search"
              @input="debouncedFetch"
              type="text"
              class="form-control"
              placeholder="Search project..."
              style="width: 200px"
            />

            <!-- Date Range -->
            <input
              ref="dateRangeInput"
              type="text"
              class="form-control"
              placeholder="Date Range"
              style="width: 220px"
            />

            <!-- Priority -->
            <select v-model="filters.priority" @change="fetchProjects" class="form-select">
              <option value="">Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <!-- Status -->
            <select v-model="filters.status" @change="fetchProjects" class="form-select">
              <option value="">Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ARCHIVED">Archived</option>
            </select>

          </div>
        </div>

        <!-- TABLE -->
        <div class="card-body p-0">

          <div v-if="loading" class="p-4 text-center">Loading projects...</div>
          <div v-else-if="error" class="p-4 text-danger text-center">{{ error }}</div>

          <table v-else class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Tasks</th>
                <th>Members</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="project in projects" :key="project.id">
                <td>{{ project.name }}</td>
                <td>
                  <span class="badge bg-success" v-if="project.status === 'ACTIVE'">Active</span>
                  <span class="badge bg-secondary" v-else>{{ project.status }}</span>
                </td>
                <td>{{ project.priority }}</td>
                <td>{{ project.Tasks?.length || 0 }}</td>
                <td>{{ project.ProjectMembers?.length || 0 }}</td>
                <td>{{ formatDate(project.createdAt) }}</td>

                <td>
                  <router-link :to="`/projects/${project.id}`" class="btn btn-sm btn-light">
                    View
                  </router-link>
                </td>
              </tr>

              <tr v-if="!projects.length">
                <td colspan="7" class="text-center p-4">No projects found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION -->
        <div class="card-footer d-flex justify-content-between align-items-center">
          <div>
            Page {{ meta.page }} of {{ meta.pages }}
          </div>

          <div>
            <button class="btn btn-sm btn-light me-2"
              :disabled="meta.page === 1"
              @click="changePage(meta.page - 1)">
              Prev
            </button>

            <button class="btn btn-sm btn-light"
              :disabled="meta.page === meta.pages"
              @click="changePage(meta.page + 1)">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>

    <div class="footer p-3 bg-white border-top">
      <p class="mb-0">{{ new Date().getFullYear() }} &copy; SmartHR.</p>
    </div>
  </div>

  <project-grid-modal />
</template>

<script>
import api from "@/services/api";
import { ref, reactive, onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import "daterangepicker/daterangepicker.css";

export default {
  setup() {
    const projects = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const dateRangeInput = ref(null);

    const meta = reactive({
      page: 1,
      pages: 1,
      total: 0,
    });

    const filters = reactive({
      search: "",
      status: "",
      priority: "",
      startDate: "",
      endDate: "",
    });

    let debounceTimer = null;

    const debouncedFetch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(fetchProjects, 500);
    };

    const fetchProjects = async () => {
      loading.value = true;
      error.value = null;

      try {
        const { data } = await api.get("/projects", {
          params: {
            page: meta.page,
            ...filters,
          },
        });

        projects.value = data.data.data;
        Object.assign(meta, data.data.meta);

      } catch (err) {
        error.value = err.response?.data?.message || "Failed to load projects";
      } finally {
        loading.value = false;
      }
    };

    const changePage = (page) => {
      meta.page = page;
      fetchProjects();
    };

    const formatDate = (date) => {
      return moment(date).format("DD MMM YYYY");
    };

    const exportData = () => {
      // Placeholder (backend export endpoint later)
      console.log("Export triggered");
    };

    const initDateRange = () => {
      if (!dateRangeInput.value) return;

      const start = moment().subtract(6, "days");
      const end = moment();

      new DateRangePicker(
        dateRangeInput.value,
        {
          startDate: start,
          endDate: end,
        },
        (start, end) => {
          filters.startDate = start.format("YYYY-MM-DD");
          filters.endDate = end.format("YYYY-MM-DD");
          fetchProjects();
        }
      );
    };

    onMounted(() => {
      fetchProjects();
      initDateRange();
    });

    return {
      projects,
      loading,
      error,
      meta,
      filters,
      dateRangeInput,
      fetchProjects,
      changePage,
      formatDate,
      debouncedFetch,
      exportData,
    };
  },

  data() {
    return {
      title: "Projects",
      text: "Projects",
      text1: "Projects List",
    };
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>
