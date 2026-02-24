<template>
  <div>
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
            <div class="me-2 mb-2 head-icons">
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const value5 = ref();
    const route = useRoute();

    const isHorizontalLayout = computed(() => {
      return route.path === "/layouts/layout-horizontal-overlay";
    });

    const layoutType = computed(() =>
      isHorizontalLayout.value ? "horizontal-overlay" : "vertical"
    );

    const updateBodyClass = (active) => {
      document.body.classList.toggle("menu-horizontal", active);
    };

    const updateLayoutAttribute = (active) => {
      if (active) {
        document.documentElement.setAttribute("data-layout", "horizontal-overlay");
      } else {
        document.documentElement.setAttribute("data-layout", "vertical");
      }
    };

    // Run on initial load
    onMounted(() => {
      updateBodyClass(isHorizontalLayout.value);
      updateLayoutAttribute(isHorizontalLayout.value);
    });

    // Watch route changes
    watch(
      () => route.path,
      (newPath) => {
        const isHorizontal = newPath === "/layouts/layout-horizontal-overlay";
        updateBodyClass(isHorizontal);
        updateLayoutAttribute(isHorizontal);
      },
      { immediate: true }
    );

    // Cleanup (extra safety)
    onBeforeUnmount(() => {
      document.body.classList.remove("menu-horizontal");
      document.documentElement.removeAttribute("data-layout");
    });

    return {
      title: "Admin Dashboard",
      text: "Dashboard",
      text1: "Admin Dashboard",
      value5,
      layoutType,
      isCollapsed: false,
    };
  },

  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      document.body.classList.toggle("header-collapse", this.isCollapsed);
    },
  },
};

</script>
