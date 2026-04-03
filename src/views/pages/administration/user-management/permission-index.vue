<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center">
          <select v-model="selectedRoleId" class="form-select w-auto">
            <option disabled value="">Select Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Permissions Table -->
      <div class="card">
        <div class="card-header">
          <h5>Permissions</h5>
          <p v-if="selectedRole">Role: <strong>{{ selectedRole.name }}</strong></p>
        </div>

        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th v-for="action in actions" :key="action">
                    {{ action }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="module in modules" :key="module">
                  <td>{{ module }}</td>

                  <td v-for="action in actions" :key="action">
                    <input
                      type="checkbox"
                      :checked="hasPermission(module, action)"
                      @change="togglePermission(module, action)"
                    />
                  </td>
                </tr>
              </tbody>

            </table>
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
      title: "Permissions",
      text: "User management",
      text1: "Permissions",

      roles: [],
      selectedRoleId: "",
      selectedRole: null,

      permissions: {},

      modules: [
        "Employee",
        "Holidays",
        "Leaves",
        "Events",
        "Sales",
        "Training",
        "Reports",
        "Tickets",
        "Payroll",
      ],

      actions: [
        "read",
        "write",
        "create",
        "delete",
        "import",
        "export",
      ],
    };
  },

  watch: {
    selectedRoleId: "fetchRolePermissions",
  },

  async mounted() {
    await this.fetchRoles();
  },

  methods: {
    /*
    |--------------------------------------------------------------------------
    | Fetch Roles
    |--------------------------------------------------------------------------
    */
    async fetchRoles() {
      try {
        const res = await api.get("/permissions");
        this.roles = res.data;

        if (this.roles.length) {
          this.selectedRoleId = this.roles[0].id;
        }
      } catch (err) {
        console.error("Failed to load roles", err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | Fetch Permissions (Future-ready)
    |--------------------------------------------------------------------------
    */
    async fetchRolePermissions() {
      try {
        this.selectedRole = this.roles.find(
          (r) => r.id === this.selectedRoleId
        );

        // 🔥 Replace this with real API when ready
        // const res = await api.get(`/roles/${this.selectedRoleId}/permissions`);
        // this.permissions = res.data;

        // TEMP MOCK (until backend supports permissions)
        this.permissions = {};
      } catch (err) {
        console.error("Failed to load permissions", err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | Permission Helpers
    |--------------------------------------------------------------------------
    */
    hasPermission(module, action) {
      return this.permissions?.[module]?.[action] || false;
    },

    togglePermission(module, action) {
      if (!this.permissions[module]) {
        this.permissions[module] = {};
      }

      this.permissions[module][action] =
        !this.permissions[module][action];

      // 🔥 Future: persist to backend
      // api.put(`/roles/${this.selectedRoleId}/permissions`, this.permissions);
    },
  },
};
</script>
