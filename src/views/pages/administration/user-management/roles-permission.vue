<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <button class="btn btn-primary" @click="openCreateModal">
          <i class="ti ti-circle-plus me-2"></i> Add Role
        </button>
      </div>

      <!-- Roles Table -->
      <div class="card">
        <div class="card-header">
          <h5>Roles List</h5>
        </div>

        <div class="card-body">

          <!-- Search + Page Size -->
          <div class="d-flex justify-content-between mb-3">
            <input
              v-model="searchQuery"
              class="form-control w-25"
              placeholder="Search roles..."
            />

            <select v-model="pageSize" class="form-select w-auto">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>

          <!-- Table -->
          <table class="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Created</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="role in paginatedRoles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>{{ formatDate(role.createdAt) }}</td>
                <td>
                  <span class="badge bg-success">Active</span>
                </td>

                <td>
                  <div class="d-flex gap-2">

                    <!-- Permissions -->
                    <router-link
                      :to="`/user-management/permission?roleId=${role.id}`"
                    >
                      <i class="ti ti-shield"></i>
                    </router-link>

                    <!-- Edit -->
                    <i class="ti ti-edit cursor-pointer"
                       @click="openEditModal(role)">
                    </i>

                    <!-- Delete -->
                    <i class="ti ti-trash text-danger cursor-pointer"
                       @click="deleteRole(role.id)">
                    </i>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="d-flex justify-content-between mt-3">
            <div>
              Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredRoles.length }}
            </div>

            <div>
              <button
                class="btn btn-sm btn-light me-2"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Prev
              </button>

              <button
                class="btn btn-sm btn-light"
                :disabled="currentPage === totalPages"
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
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Roles",
      text: "User management",
      text1: "Roles",

      roles: [],
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
    };
  },

  async mounted() {
    await this.fetchRoles();
  },

  computed: {
    filteredRoles() {
      return this.roles.filter((role) =>
        role.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    paginatedRoles() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredRoles.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredRoles.length / this.pageSize) || 1;
    },

    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },

    endIndex() {
      return Math.min(
        this.currentPage * this.pageSize,
        this.filteredRoles.length
      );
    },
  },

  methods: {
    /*
    |--------------------------------------------------------------------------
    | API CALLS
    |--------------------------------------------------------------------------
    */

    async fetchRoles() {
      try {
        const res = await api.get("/permissions");
        this.roles = res.data;
      } catch (err) {
        console.error("Failed to fetch roles", err);
      }
    },

    async deleteRole(id) {
      if (!confirm("Delete this role?")) return;

      try {
        await api.delete(`/permissions/${id}`);
        this.fetchRoles();
      } catch (err) {
        console.error("Delete failed", err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | UI ACTIONS
    |--------------------------------------------------------------------------
    */

    openCreateModal() {
      // hook your modal
      console.log("Open create modal");
    },

    openEditModal(role) {
      console.log("Edit role", role);
    },

    /*
    |--------------------------------------------------------------------------
    | UTIL
    |--------------------------------------------------------------------------
    */

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
