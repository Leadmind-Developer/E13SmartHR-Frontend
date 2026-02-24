<template>
  <div :data-layout="layoutType">
    <layout-header-rtl></layout-header-rtl>
    <layout-sidebar></layout-sidebar>
    <div class="page-wrapper">
      <div class="content">

        <!-- Breadcrumb -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div class="my-auto mb-2">
            <h2 class="mb-1">Admin Dashboard</h2>
            <nav>
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                </li>
                <li class="breadcrumb-item">
                  Dashboard
                </li>
                <li class="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
              </ol>
            </nav>
          </div>
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
            <div class="ms-2 mb-2">
              <div class="dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-file-export ms-1"></i>Export
                </a>
                <ul class="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                        class="ti ti-file-type-pdf ms-1"></i>Export as PDF</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                        class="ti ti-file-type-xls ms-1"></i>Export as Excel </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mb-2">
              <div class="input-icon w-100 position-relative">
                <span class="input-icon-addon">
                  <i class="ti ti-calendar text-gray-9"></i>
                </span>
                <a-date-picker class="form-control yearpicker" v-model:value="value5" picker="month" format="MMM YYYY"
                  placeholder="Dec 2025" />
              </div>
            </div>
          </div>
        </div>
        <!-- /Breadcrumb -->

        <rtl-welcome-wrap></rtl-welcome-wrap>

        <rtl-employee-status></rtl-employee-status>

        <rtl-job-applicants></rtl-job-applicants>

        <rtl-sales-overview></rtl-sales-overview>

        <rtl-project-table></rtl-project-table>

        <rtl-schedules-index></rtl-schedules-index>

      </div>

      <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
        <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
      </div>

    </div>
  </div>
  <admin-dashboard-modal></admin-dashboard-modal>
</template>

<script>
import { ref, computed, watchEffect, onBeforeUnmount } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export default {
  setup() {
    const value5 = ref();
    const route = useRoute(); // Get the current route

    // Compute the layout type (data-layout attribute)
    const layoutType = computed(() => {
      return route.path === "/layouts/layout-rtl" ? "layout-mode-rtl" : "vertical";
    });

    // Function to update body class based on route path
    const updateBodyClass = () => {
      if (route.path === "/layouts/layout-rtl") {
        document.body.classList.add("layout-mode-rtl");
      } else {
        document.body.classList.remove("layout-mode-rtl");
      }
    };

    // Watch for route changes and update the class
    watchEffect(() => {
      updateBodyClass();
    });

    // Cleanup the class before component is destroyed
    onBeforeUnmount(() => {
      document.body.classList.remove("layout-mode-rtl");
    });

    // Cleanup when route changes before the component updates
    onBeforeRouteUpdate(() => {
      document.body.classList.remove("layout-mode-rtl");
    });

    return {
      value5,
      layoutType,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
