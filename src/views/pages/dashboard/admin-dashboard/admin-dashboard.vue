<script>
import { ref } from "vue";
import { DashboardService } from "@/services/dashboard.service";

export default {
  data() {
    return {
      // UI
      title: "Admin Dashboard",
      text: "Dashboard",
      text1: "Admin Dashboard",
      isCollapsed: false,
      value5: ref(),

      // Data
      overview: null,
      loading: false,
      error: null,
    };
  },

  async mounted() {
    await this.loadDashboard();
  },

  methods: {
    async loadDashboard() {
      this.loading = true;
      this.error = null;

      try {
        const data = await DashboardService.getOverview();
        this.overview = data;

        console.log("✅ Dashboard data:", data);
      } catch (err) {
        console.error("❌ Dashboard error:", err);
        this.error = err?.response?.data?.message || "Failed to load dashboard";
      } finally {
        this.loading = false;
      }
    },

    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;

      if (this.isCollapsed) {
        document.body.classList.add("header-collapse");
      } else {
        document.body.classList.remove("header-collapse");
      }
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
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          
          <!-- Export -->
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">
                    <i class="ti ti-file-type-pdf me-1"></i>Export as PDF
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">
                    <i class="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Date Picker -->
          <div class="mb-2">
            <div class="input-icon w-100 position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-calendar text-gray-9"></i>
              </span>
              <a-date-picker
                class="form-control yearpicker"
                v-model:value="value5"
                picker="month"
                format="MMM YYYY"
                placeholder="Select Month"
              />
            </div>
          </div>

          <!-- Collapse -->
          <div class="ms-2 mb-2 head-icons">
            <a href="javascript:void(0);" :class="{ active: isCollapsed }"
              @click="toggleCollapse">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>
      <!-- /Breadcrumb -->

      <!-- ========================= -->
      <!-- Dashboard State Handling -->
      <!-- ========================= -->

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <p>Loading dashboard...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Data -->
      <template v-else>
        <!-- Pass real data into components -->
        <welcome-wrap :overview="overview" />

        <employee-status :data="overview?.employees" />

        <job-applicants />

        <sales-overview />

        <project-table :data="overview?.projects" />

        <schedules-index />
      </template>

    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <admin-dashboard-modal />
</template>
