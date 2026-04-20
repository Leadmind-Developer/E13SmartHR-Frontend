<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h6 class="fw-medium d-flex align-items-center">
          <router-link to="/projects/clients">
            <i class="ti ti-arrow-left me-2"></i>
            Clients
          </router-link>
        </h6>

        <a
          href="javascript:void(0)"
          id="collapse-header"
          @click="toggleHeader"
        >
          <i class="ti ti-chevrons-up"></i>
        </a>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border"></div>
      </div>

      <div v-else class="row">

        <!-- LEFT PANEL -->
        <div class="col-xl-4">

          <div class="card">
            <div class="card-body text-center">

              <div class="avatar avatar-xl avatar-rounded mb-3">
                <img :src="client.avatar" alt="client" />
              </div>

              <h5>{{ client.name }}</h5>

              <p class="text-muted mb-2">
                {{ client.company || "-" }}
              </p>

              <span class="badge bg-soft-secondary">
                {{ client.status }}
              </span>

              <hr>

              <div class="text-start">

                <p>
                  <i class="ti ti-mail me-2"></i>
                  {{ client.email || "-" }}
                </p>

                <p>
                  <i class="ti ti-phone me-2"></i>
                  {{ client.phone || "-" }}
                </p>

                <p>
                  <i class="ti ti-map-pin me-2"></i>
                  {{ client.address || "-" }}
                </p>

              </div>

            </div>
          </div>

        </div>

        <!-- RIGHT PANEL -->
        <div class="col-xl-8">

          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-bs-toggle="tab"
                href="#overview"
              >
                Overview
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                href="#projects"
              >
                Projects
              </a>
            </li>
          </ul>

          <div class="tab-content">

            <!-- OVERVIEW -->
            <div
              id="overview"
              class="tab-pane fade show active"
            >
              <div class="card mb-3">
                <div class="card-body">

                  <div class="row">

                    <div class="col-md-4">
                      <h6>{{ projects.length }}</h6>
                      <small class="text-muted">
                        Projects
                      </small>
                    </div>

                    <div class="col-md-4">
                      <h6>{{ totalTasks }}</h6>
                      <small class="text-muted">
                        Tasks
                      </small>
                    </div>

                    <div class="col-md-4">
                      <h6>{{ activeProjects }}</h6>
                      <small class="text-muted">
                        Active Projects
                      </small>
                    </div>

                  </div>

                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <h6 class="mb-3">
                    Notes
                  </h6>

                  <p class="text-muted mb-0">
                    {{ client.notes || "No notes available" }}
                  </p>

                </div>
              </div>
            </div>

            <!-- PROJECTS -->
            <div
              id="projects"
              class="tab-pane fade"
            >

              <div
                v-if="!projects.length"
                class="text-center py-5 text-muted"
              >
                No projects found
              </div>

              <div v-else class="row">

                <div
                  v-for="project in projects"
                  :key="project.id"
                  class="col-md-6 mb-3"
                >
                  <div class="card">
                    <div class="card-body">

                      <h6 class="mb-2">
                        <router-link
                          :to="`/projects/projects-details/${project.id}`"
                        >
                          {{ project.name }}
                        </router-link>
                      </h6>

                      <p class="text-muted small">
                        {{
                          project.description ||
                          "No description"
                        }}
                      </p>

                      <div
                        class="d-flex justify-content-between mt-3"
                      >
                        <span class="badge bg-soft-info">
                          {{ project.status }}
                        </span>

                        <span>
                          {{ project.Tasks?.length || 0 }}
                          tasks
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <!-- ERROR -->
      <div
        v-if="error"
        class="alert alert-danger mt-4"
      >
        {{ error }}
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {

  name: "ClientDetails",

  data() {
    return {

      loading: false,

      error: null,

      client: {
        name: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        notes: "",
        status: "ACTIVE",

        avatar: require(
          "@/assets/img/users/user-13.jpg"
        ),
      },

      projects: [],
    };
  },

  computed: {

    clientId() {
      return this.$route.params.id;
    },

    totalTasks() {
      return this.projects.reduce(
        (sum, p) =>
          sum + (p.Tasks?.length || 0),
        0
      );
    },

    activeProjects() {
      return this.projects.filter(
        p => p.status !== "ARCHIVED"
      ).length;
    },

  },

  mounted() {
    this.fetchClient();
  },

  methods: {

    async fetchClient() {

      this.loading = true;
      this.error = null;

      try {

        /*
        |--------------------------------------------------------------------------
        | NEW REAL CLIENT ENDPOINT
        |--------------------------------------------------------------------------
        */

        const { data } =
          await api.get(
            `/clients/${this.clientId}`
          );

        const client =
          data?.data || {};

        this.client = {
          ...this.client,
          ...client
        };

        this.projects =
          client.Projects || [];

      }
      catch (err) {

        console.error(
          "Failed loading client",
          err
        );

        this.error =
          err.response?.data?.message ||
          "Unable to load client";

      }
      finally {

        this.loading = false;

      }

    },

    toggleHeader() {

      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");

      document.body.classList.toggle(
        "header-collapse"
      );

    }

  }

};
</script>
