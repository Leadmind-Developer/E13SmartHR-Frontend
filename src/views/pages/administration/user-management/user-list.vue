<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <button class="btn btn-primary" @click="openCreateModal">
          <i class="ti ti-circle-plus me-2"></i> Add User
        </button>
      </div>

      <!-- Users Table -->
      <div class="card">
        <div class="card-header">
          <h5>Users List</h5>
        </div>

        <div class="card-body">

          <!-- Filters -->
          <div class="d-flex justify-content-between mb-3">
            <input
              v-model="searchQuery"
              class="form-control w-25"
              placeholder="Search users..."
            />

            <select v-model="selectedRole" class="form-select w-auto">
              <option value="">All Roles</option>
              <option v-for="role in roles" :key="role.id" :value="role.name">
                {{ role.name }}
              </option>
            </select>

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
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ formatDate(user.createdAt) }}</td>

                <td>
                  <span class="badge bg-info">
                    {{ user.Role?.name || "N/A" }}
                  </span>
                </td>

                <td>
                  <span class="badge bg-success">Active</span>
                </td>

                <td>
                  <div class="d-flex gap-2">
                    <i class="ti ti-edit" @click="openEditModal(user)"></i>
                    <i class="ti ti-trash text-danger" @click="deleteUser(user.id)"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="d-flex justify-content-between mt-3">
            <div>
              Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredUsers.length }}
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
      title: "Users",
      text: "User management",
      text1: "Users",

      users: [],
      roles: [],

      searchQuery: "",
      selectedRole: "",

      currentPage: 1,
      pageSize: 10,
    };
  },

  async mounted() {
    await Promise.all([
      this.fetchUsers(),
      this.fetchRoles()
    ]);
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        const matchSearch =
          user.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchRole =
          !this.selectedRole ||
          user.Role?.name === this.selectedRole;

        return matchSearch && matchRole;
      });
    },

    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredUsers.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
    },

    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },

    endIndex() {
      return Math.min(
        this.currentPage * this.pageSize,
        this.filteredUsers.length
      );
    },
  },

  methods: {
    /*
    |--------------------------------------------------------------------------
    | API CALLS
    |--------------------------------------------------------------------------
    */

    async fetchUsers() {
      try {
        const res = await api.get("/users");
        this.users = res.data;
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    },

    async fetchRoles() {
      try {
        const res = await api.get("/permissions"); // tenant roles
        this.roles = res.data;
      } catch (err) {
        console.error("Failed to fetch roles", err);
      }
    },

    async deleteUser(id) {
      if (!confirm("Delete this user?")) return;

      try {
        await api.delete(`/users/${id}`);
        this.fetchUsers();
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
      console.log("Open create user modal");
    },

    openEditModal(user) {
      console.log("Edit user", user);
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
