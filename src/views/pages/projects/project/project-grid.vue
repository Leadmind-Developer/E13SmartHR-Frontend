<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="d-flex border bg-white rounded p-1">
              <router-link to="/projects/projects-list" class="btn btn-sm">
                <i class="ti ti-list-tree"></i>
              </router-link>
              <router-link to="/projects/projects-grid" class="btn btn-sm bg-primary text-white">
                <i class="ti ti-layout-grid"></i>
              </router-link>
            </div>
          </div>

          <div class="mb-2">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_project">
              <i class="ti ti-circle-plus me-1"></i> Add Project
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2 justify-content-between">
          
          <input
            v-model="filters.search"
            @input="debouncedFetch"
            class="form-control w-auto"
            placeholder="Search projects..."
          />

          <select v-model="filters.status" @change="fetchProjects" class="form-select w-auto">
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <select v-model="filters.sort" @change="fetchProjects" class="form-select w-auto">
            <option value="DESC">Newest</option>
            <option value="ASC">Oldest</option>
          </select>
        </div>
      </div>

      <!-- Grid -->
      <div class="row">

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border"></div>
        </div>

        <!-- Empty -->
        <div v-else-if="projects.length === 0" class="text-center py-5">
          <h6>No projects found</h6>
        </div>

        <!-- Cards -->
        <div
          v-else
          v-for="project in projects"
          :key="project.id"
          class="col-xxl-3 col-lg-4 col-md-6"
        >
          <div class="card">
            <div class="card-body">

              <!-- Header -->
              <div class="d-flex justify-content-between mb-2">
                <h6>
                  <router-link :to="`/projects/projects-details/${project.id}`">
                    {{ project.name }}
                  </router-link>
                </h6>

                <div class="dropdown">
                  <a href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                      <a class="dropdown-item" @click="editProject(project)">
                        <i class="ti ti-edit me-1"></i>Edit
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" @click="deleteProject(project.id)">
                        <i class="ti ti-trash me-1"></i>Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Description -->
              <p class="text-muted small mb-3 line-clamp-3">
                {{ project.description || "No description provided" }}
              </p>

              <!-- Meta -->
              <div class="d-flex justify-content-between mb-3 border-top pt-2">
                <div>
                  <small>Created</small>
                  <p class="mb-0 small">{{ formatDate(project.createdAt) }}</p>
                </div>

                <div>
                  <small>Status</small>
                  <p class="mb-0 small">
                    <span :class="statusClass(project.status)">
                      {{ project.status }}
                    </span>
                  </p>
                </div>
              </div>

              <!-- Tasks -->
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <small>Tasks</small>
                  <p class="mb-0">
                    {{ completedTasks(project) }}/{{ totalTasks(project) }}
                  </p>
                </div>

                <div class="progress w-50" style="height:6px;">
                  <div
                    class="progress-bar"
                    :style="{ width: progress(project) + '%' }"
                  ></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="meta.page < meta.pages" class="text-center mt-4">
          <button class="btn btn-primary" @click="loadMore">
            Load More
          </button>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer text-center p-3">
      © {{ new Date().getFullYear() }} SmartHR
    </div>
  </div>

  <project-grid-modal />
</template>

<script>
import api from "@/services/api";
import _ from "lodash";

export default {
  data() {
    return {
      title: "Projects",
      text: "Projects",
      text1: "Projects Grid",

      loading: false,

      projects: [],
      meta: {
        page: 1,
        pages: 1,
      },

      filters: {
        search: "",
        status: "",
        sort: "DESC",
      },
    };
  },

  created() {
    this.fetchProjects();
  },

  methods: {
    async fetchProjects(reset = true) {
      try {
        this.loading = true;

        const page = reset ? 1 : this.meta.page;

        const { data } = await api.get("/projects", {
          params: {
            page,
            limit: 12,
            search: this.filters.search,
            status: this.filters.status,
          },
        });

        const res = data.data;

        this.projects = reset
          ? res.data
          : [...this.projects, ...res.data];

        this.meta = res.meta;

      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      this.meta.page++;
      this.fetchProjects(false);
    },

    debouncedFetch: _.debounce(function () {
      this.fetchProjects();
    }, 500),

    completedTasks(project) {
      return project.Tasks?.filter(t => t.status === "Completed").length || 0;
    },

    totalTasks(project) {
      return project.Tasks?.length || 0;
    },

    progress(project) {
      const total = this.totalTasks(project);
      if (!total) return 0;
      return (this.completedTasks(project) / total) * 100;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    statusClass(status) {
      return {
        "badge bg-success": status === "ACTIVE",
        "badge bg-secondary": status === "ARCHIVED",
      };
    },

    editProject(project) {
      this.$emit("edit-project", project);
    },

    async deleteProject(id) {
      if (!confirm("Are you sure?")) return;

      try {
        await api.delete(`/projects/${id}`);
        this.fetchProjects();
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
