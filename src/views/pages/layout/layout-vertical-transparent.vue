<template>
  <div :data-layout="layoutType">
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <div class="page-wrapper">
      <div class="content">

        <!-- Breadcrumb -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <breadcrumb :title="title" :text="text" :text1="text1" />
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
            <div class="me-2 mb-2">
              <div class="dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-file-export me-1"></i>Export
                </a>
                <ul class="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                        class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                        class="ti ti-file-type-xls me-1"></i>Export as Excel </a>
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
            <div class="ms-2 mb-2 head-icons">
              <a href="javascript:void(0);" :class="{ active: isCollapsed }" @click="toggleCollapse"
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
                <i class="ti ti-chevrons-up"></i>
              </a>
            </div>
          </div>
        </div>
        <!-- /Breadcrumb -->

        <welcome-wrap></welcome-wrap>

        <employee-status></employee-status>

        <job-applicants></job-applicants>

        <sales-overview></sales-overview>

        <project-table></project-table>

        <schedules-index></schedules-index>

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
import { ref, computed, watchEffect, onBeforeUnmount, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export default {
  setup() {
    const value5 = ref();
    const route = useRoute(); // Get the current route

    // Compute the layout type (data-layout attribute)
    const layoutType = computed(() => {
      return route.path === "/layouts/layout-vertical-transparent"
        ? "vertical-transparent"
        : "vertical";
    });

    // Function to update body class based on route path
    const updateBodyClass = () => {
      if (route.path === "/layouts/layout-vertical-transparent") {
        document.body.classList.add("data-layout-transparent");
      } else {
        document.body.classList.remove("data-layout-transparent");
      }
    };

    // Watch for route changes and update the class
    watchEffect(() => {
      updateBodyClass();
    });

    // Cleanup the class before component is destroyed
    onBeforeUnmount(() => {
      document.body.classList.remove("data-layout-transparent");
    });

    // Cleanup when route changes before the component updates
    onBeforeRouteUpdate(() => {
      document.body.classList.remove("data-layout-transparent");
      updateThemeAttribute(); // Update the theme when route changes
    });

    // Watch for changes in route and update the data-layout attribute
    onMounted(() => {
      updateThemeAttribute(); // Set the theme on initial load
    });

    // Function to update the data-theme attribute on <html> for light mode
    const updateThemeAttribute = () => {
      if (route.path === "/layouts/layout-vertical-transparent") {
        document.documentElement.setAttribute("data-theme", "light");
      }
    };

    return {
      title: "Admin Dashboard",
      text: "Dashboard",
      text1: "Admin Dashboard",
      value5,
      isCollapsed: false,
      layoutType,
    };
  },
  methods: {
    toggleCollapse() {
      // Toggle the collapsed state
      this.isCollapsed = !this.isCollapsed;

      // Optionally add/remove class on body to collapse header globally
      if (this.isCollapsed) {
        document.body.classList.add("header-collapse");
      } else {
        document.body.classList.remove("header-collapse");
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
