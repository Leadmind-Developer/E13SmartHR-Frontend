<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <div class="my-auto mb-2">
          <h2 class="mb-1">Clients</h2>

          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">
                  <i class="ti ti-smart-home"></i>
                </router-link>
              </li>

              <li class="breadcrumb-item">Projects</li>

              <li class="breadcrumb-item active">
                Client List
              </li>
            </ol>
          </nav>
        </div>

        <div class="d-flex align-items-center flex-wrap">

          <div class="me-2 mb-2">
            <div class="d-flex align-items-center border bg-white rounded p-1">
              <router-link
                to="/projects/clients"
                class="btn btn-icon btn-sm active bg-primary text-white me-1"
              >
                <i class="ti ti-list-tree"></i>
              </router-link>

              <router-link
                to="/projects/clients-grid"
                class="btn btn-icon btn-sm"
              >
                <i class="ti ti-layout-grid"></i>
              </router-link>
            </div>
          </div>

          <div class="mb-2">
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add_client"
            >
              <i class="ti ti-circle-plus me-2"></i>
              Add Client
            </button>
          </div>

          <div class="ms-3 head-icons">
            <a
              href="javascript:void(0)"
              id="collapse-header"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- Stats -->
      <div class="row">

        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h4>{{ stats.total }}</h4>
              <p class="mb-0 text-muted">Total Clients</p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h4>{{ stats.active }}</h4>
              <p class="mb-0 text-muted">Active Clients</p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h4>{{ stats.inactive }}</h4>
              <p class="mb-0 text-muted">Inactive Clients</p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h4>{{ stats.newClients }}</h4>
              <p class="mb-0 text-muted">New This Month</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Client Table -->
      <div class="card">

        <div class="card-header d-flex justify-content-between align-items-center">

          <h5>Client List</h5>

          <div class="d-flex">

            <select
              v-model="statusFilter"
              class="form-select me-2"
              @change="reloadClients"
            >
              <option value="">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

            </select>

            <input
              v-model="search"
              class="form-control"
              placeholder="Search clients..."
              @keyup.enter="reloadClients"
            />

          </div>

        </div>

        <div class="card-body p-0">

          <div
            v-if="loading"
            class="text-center py-5"
          >
            <div class="spinner-border"></div>
          </div>

          <div
            v-else-if="clients.length === 0"
            class="text-center py-5 text-muted"
          >
            No clients found.
          </div>

          <div
            v-else
            class="table-responsive"
          >

            <table class="table table-hover mb-0">

              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th width="120">Action</th>
                </tr>
              </thead>

              <tbody>

                <tr
                  v-for="client in clients"
                  :key="client.id"
                >
                  <td>
                    <router-link :to="`/projects/clients/${client.id}`">
                      {{ client.clientCode || ('CL-' + client.id) }}
                    </router-link>
                  </td>

                  <td>
                    <div class="d-flex align-items-center">

                      <div class="avatar avatar-md border avatar-rounded me-2">

                        <img
                          :src="client.avatar || fallbackAvatar"
                          @error="useFallback"
                        />

                      </div>

                      <div>

                        <h6 class="mb-0">
                          <router-link
                            :to="`/projects/clients/${client.id}`"
                          >
                            {{ client.name }}
                          </router-link>
                        </h6>

                        <small class="text-muted">
                          {{ client.contactTitle || 'Client' }}
                        </small>

                      </div>

                    </div>
                  </td>

                  <td>
                    {{ client.company || '-' }}
                  </td>

                  <td>
                    {{ client.email || '-' }}
                  </td>

                  <td>
                    {{ client.phone || '-' }}
                  </td>

                  <td>
                    <span
                      class="badge"
                      :class="statusBadge(client.status)"
                    >
                      {{ client.status || 'ACTIVE' }}
                    </span>
                  </td>

                  <td>

                    <div class="d-flex">

                      <router-link
                        :to="`/projects/clients/${client.id}`"
                        class="me-3"
                      >
                        <i class="ti ti-eye"></i>
                      </router-link>

                      <a
                        href="javascript:void(0)"
                        @click="confirmDelete(client)"
                      >
                        <i class="ti ti-trash"></i>
                      </a>

                    </div>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          <!-- Pagination -->
          <div class="p-3 d-flex justify-content-between align-items-center">

            <div>
              Showing page
              {{ currentPage }}
              of
              {{ totalPages }}
            </div>

            <div>

              <button
                class="btn btn-sm btn-outline-secondary me-2"
                :disabled="currentPage===1"
                @click="prevPage"
              >
                Prev
              </button>

              <button
                class="btn btn-sm btn-outline-secondary"
                :disabled="currentPage===totalPages"
                @click="nextPage"
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>

  <clients-list-modal />

</template>

<script>
import api from "@/services/api";

export default {

  name: "ClientsList",

  data() {
    return {

      loading: false,

      clients: [],

      currentPage: 1,

      pageSize: 10,

      totalPages: 1,

      totalItems: 0,

      search: "",

      statusFilter: "",

      fallbackAvatar: require("@/assets/img/users/user-13.jpg"),

      stats: {
        total: 0,
        active: 0,
        inactive: 0,
        newClients: 0,
      },

    };
  },

  mounted() {
    this.loadStats();
    this.loadClients();
  },

  methods: {

    async loadClients() {

      this.loading = true;

      try {

        const { data } = await api.get("/clients", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.search || undefined,
            status: this.statusFilter || undefined,
          },
        });

        /*
          expected backend:

          {
             success:true,
             data:{
               data:[],
               meta:{
                  page,
                  pages,
                  total
               }
             }
          }
        */

        const payload = data?.data || {};

        this.clients = payload.data || [];

        this.totalPages = payload.meta?.pages || 1;

        this.totalItems = payload.meta?.total || 0;

      } catch (e) {

        console.error("Load clients failed", e);

      } finally {

        this.loading = false;

      }

    },

    async loadStats() {

      try {

        /*
         recommended endpoint:
         GET /clients/stats
        */

        const { data } = await api.get("/clients/stats");

        this.stats = data?.data || this.stats;

      } catch (e) {

        console.warn(
          "Stats endpoint missing, deriving fallback"
        );

        /*
          fallback if stats endpoint not ready
        */

        try {

          const { data } = await api.get("/clients", {
            params: {
              limit: 1000
            }
          });

          const rows = data?.data?.data || [];

          this.stats.total = rows.length;

          this.stats.active =
            rows.filter(
              x => x.status === "ACTIVE"
            ).length;

          this.stats.inactive =
            rows.filter(
              x => x.status === "INACTIVE"
            ).length;

          this.stats.newClients =
            rows.filter(c => {

              if (!c.createdAt) return false;

              const d = new Date(c.createdAt);

              const now = new Date();

              return (
                d.getMonth() === now.getMonth() &&
                d.getFullYear() === now.getFullYear()
              );

            }).length;

        } catch (err) {
          console.error(err);
        }

      }

    },

    reloadClients() {

      this.currentPage = 1;

      this.loadClients();

    },

    nextPage() {

      if (this.currentPage < this.totalPages) {

        this.currentPage++;

        this.loadClients();

      }

    },

    prevPage() {

      if (this.currentPage > 1) {

        this.currentPage--;

        this.loadClients();

      }

    },

    statusBadge(status) {

      if (status === "INACTIVE") {
        return "bg-danger";
      }

      return "bg-success";

    },

    useFallback(e) {

      e.target.src = this.fallbackAvatar;

    },

    async confirmDelete(client) {

      const ok = confirm(
        `Delete ${client.name}?`
      );

      if (!ok) return;

      try {

        await api.delete(
          `/clients/${client.id}`
        );

        this.loadClients();

        this.loadStats();

      } catch (e) {

        console.error(
          "Delete failed",
          e
        );

        alert(
          "Failed to delete client."
        );

      }

    },

    toggleHeader() {

      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");

      document.body.classList.toggle(
        "header-collapse"
      );

    },

  },

};
</script>
