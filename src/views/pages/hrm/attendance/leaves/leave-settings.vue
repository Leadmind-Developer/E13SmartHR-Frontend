<script>
import api from "@/services/api";

export default {
  name: "LeaveSettings",

  data() {
    return {
      title: "Leave Settings",
      text: "Attendance",
      text1: "Leave Settings",

      loading: false,
      policies: [],
      error: null,

      selectedPolicy: null,
    };
  },

  async mounted() {
    await this.fetchPolicies();
  },

  methods: {
    toggleHeader() {
      document
        .getElementById("collapse-header")
        .classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    /**
     * FETCH POLICIES FROM BACKEND
     * GET /api/leaves/policies
     */
    async fetchPolicies() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/leaves/policies");
        this.policies = res.data?.data || res.data || [];
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Failed to load leave policies";
      } finally {
        this.loading = false;
      }
    },

    /**
     * TOGGLE POLICY STATUS
     * PATCH /api/leaves/policies/:id/toggle
     */
    async togglePolicy(policy) {
      try {
        policy.isToggling = true;

        const res = await api.patch(
          `/leaves/policies/${policy.id}/toggle`
        );

        const updated = res.data?.data;

        this.policies = this.policies.map((p) =>
          p.id === policy.id ? updated : p
        );
      } catch (err) {
        alert(
          err.response?.data?.message ||
            "Failed to update policy"
        );
      } finally {
        policy.isToggling = false;
      }
    },

    /**
     * OPEN MODAL (CUSTOM POLICY / EDIT)
     */
    openPolicy(policy = null) {
      this.selectedPolicy = policy;
      // Bootstrap modal trigger assumed
      this.$nextTick(() => {
        const modal = document.getElementById(
          "leavePolicyModal"
        );
        if (modal) {
          new window.bootstrap.Modal(modal).show();
        }
      });
    },

    /**
     * POLICY TYPE LABEL
     */
    formatPolicyName(code) {
      const map = {
        ANNUAL: "Annual Leave",
        SICK: "Sick Leave",
        MATERNITY: "Maternity",
        PATERNITY: "Paternity",
        HOSPITALISATION: "Hospitalisation",
        LOP: "Loss of Pay",
      };

      return map[code] || code;
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
        <breadcrumb
          :title="title"
          :text="text"
          :text1="text1"
        />

        <div
          class="d-flex my-xl-auto right-content align-items-center flex-wrap"
        >
          <button
            class="btn btn-primary d-flex align-items-center"
            @click="openPolicy()"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Custom Policy
          </button>

          <div class="head-icons ms-2">
            <a
              href="javascript:void(0);"
              id="collapse-header"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="text-center py-4">
        <span class="spinner-border"></span>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Policies Grid -->
      <div class="row" v-if="!loading">
        <div
          class="col-xl-4 col-md-6"
          v-for="policy in policies"
          :key="policy.id"
        >
          <div class="card">
            <div
              class="card-body d-flex align-items-center justify-content-between"
            >
              <!-- LEFT -->
              <div class="d-flex align-items-center">

                <div
                  class="form-check form-switch me-2"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    :checked="policy.isActive"
                    :disabled="policy.isToggling"
                    @change="togglePolicy(policy)"
                  />
                </div>

                <h6 class="mb-0">
                  {{ formatPolicyName(policy.code) }}
                </h6>
              </div>

              <!-- RIGHT ACTIONS -->
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0);"
                  class="text-decoration-underline me-2"
                  @click="openPolicy(policy)"
                >
                  Configure
                </a>

                <a
                  href="javascript:void(0);"
                  @click="openPolicy(policy)"
                >
                  <i class="ti ti-settings"></i>
                </a>
              </div>
            </div>

            <!-- BADGES -->
            <div class="card-footer bg-transparent border-0">
              <small class="text-muted">
                Max Days:
                <b>{{ policy.maxDays }}</b>
                |
                Approval:
                <b>
                  {{
                    policy.requiresApproval
                      ? "Yes"
                      : "No"
                  }}
                </b>
                |
                Accrual:
                <b>
                  {{ policy.isAccrued ? "Yes" : "No" }}
                </b>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">
        {{ new Date().getFullYear() }} &copy; E13solution.
      </p>
      <p>
        Designed & Developed By
        <a href="#" class="text-primary">E13solution Dev Team</a>
      </p>
    </div>
  </div>

  <!-- MODAL (Leave Policy Config) -->
  <leave-settings-modal
    :policy="selectedPolicy"
    @refresh="fetchPolicies"
  />
</template>
