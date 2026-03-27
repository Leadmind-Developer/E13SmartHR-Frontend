<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div class="my-auto mb-2">
          <h2 class="mb-1">Dashboard</h2>
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
              </li>
              <li class="breadcrumb-item">Super Admin</li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </nav>
        </div>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="input-icon mb-2 position-relative">
            <span class="input-icon-addon">
              <i class="ti ti-calendar text-gray-9"></i>
            </span>
            <input
              type="text"
              class="form-control date-range bookingrange"
              v-model="dateRange"
              placeholder="dd/mm/yyyy - dd/mm/yyyy"
            />
          </div>
          <div class="ms-2 head-icons">
            <a
              href="javascript:void(0);"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Collapse"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <!-- Welcome Wrap -->
      <div class="welcome-wrap mb-4">
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <div class="mb-3">
            <h2 class="mb-1 text-white">Welcome Back, {{ user.name }}</h2>
            <p class="text-light">{{ stats.newCompaniesToday }} New Companies Subscribed Today !!!</p>
          </div>
          <div class="d-flex align-items-center flex-wrap mb-1">
            <router-link to="/super-admin/companies" class="btn btn-dark btn-md me-2 mb-2">Companies</router-link>
            <router-link to="/super-admin/packages" class="btn btn-light btn-md mb-2">All Packages</router-link>
          </div>
        </div>
        <div class="welcome-bg">
          <img v-for="(img, i) in welcomeBackgrounds" :key="i" :src="img.src" :alt="img.alt" :class="img.class" />
        </div>
      </div>
      <!-- /Welcome Wrap -->

      <!-- Summary Cards -->
      <div class="row">
        <div
          v-for="card in summaryCards"
          :key="card.id"
          class="col-xl-3 col-sm-6 d-flex"
        >
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <span :class="['avatar avatar-md', card.avatarClass, 'mb-3']">
                  <i :class="card.icon"></i>
                </span>
                <span :class="['badge', card.badgeClass, 'fw-normal mb-3']">
                  {{ card.badgeText }}
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h2 class="mb-1">{{ card.value }}</h2>
                  <p class="fs-13">{{ card.label }}</p>
                </div>
                <div :id="card.chartId">
                  <apexchart
                    :type="card.chartType"
                    :width="card.chartWidth"
                    :options="card.chartOptions"
                    :series="card.chartSeries"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Summary Cards -->

      <div class="row">

        <!-- Companies Chart -->
        <div class="col-xxl-3 col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Companies</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1"></i>{{ companyChart.selectedRange }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li v-for="range in companyChart.ranges" :key="range">
                    <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="updateCompanyRange(range)">{{ range }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div id="company-chart">
                <apexchart
                  type="bar"
                  height="290"
                  :options="companyChart.options"
                  :series="companyChart.series"
                />
              </div>
              <p class="f-13 d-inline-flex align-items-center">
                <span class="badge badge-success me-1">+{{ companyChart.percentChange }}%</span>
                {{ companyChart.delta }} Companies from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Revenue Chart -->
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Revenue</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1"></i>{{ revenueChart.selectedYear }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li v-for="year in revenueChart.years" :key="year">
                    <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="updateRevenueYear(year)">{{ year }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body pb-0">
              <div class="d-flex align-items-center justify-content-between flex-wrap mb-2">
                <div>
                  <h5 class="mb-1">{{ revenueChart.total | currency }}</h5>
                  <p><span class="text-success fw-bold">+{{ revenueChart.change }}%</span> increased from last year</p>
                </div>
                <p class="fs-13 text-gray-9 d-flex align-items-center mb-1">
                  <i class="ti ti-circle-filled me-1 fs-6 text-primary"></i>Revenue
                </p>
              </div>
              <div id="revenue-income">
                <apexchart
                  type="bar"
                  height="280"
                  :options="revenueChart.options"
                  :series="revenueChart.series"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Top Plans -->
        <div class="col-xxl-3 col-xl-12 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Top Plans</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1"></i>{{ topPlans.selectedRange }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li v-for="range in topPlans.ranges" :key="range">
                    <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="updateTopPlansRange(range)">{{ range }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div id="plan-overview">
                <apexchart
                  type="donut"
                  height="240"
                  :options="topPlans.options"
                  :series="topPlans.series"
                />
              </div>
              <div v-for="plan in topPlans.details" :key="plan.name" class="d-flex align-items-center justify-content-between mb-2">
                <p class="f-13 mb-0">
                  <i :class="['ti ti-circle-filled', plan.color, 'me-1']"></i>{{ plan.name }}
                </p>
                <p class="f-13 fw-medium text-gray-9">{{ plan.percent }}%</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Tables: Transactions, Registered, Expired -->
      <div class="row">

        <dashboard-table
          title="Recent Transactions"
          :items="recentTransactions"
          :view-all-link="'/super-admin/purchase-transaction'"
        />

        <dashboard-table
          title="Recently Registered"
          :items="recentlyRegistered"
          :view-all-link="'/super-admin/purchase-transaction'"
        />

        <dashboard-expired-plans
          :expired-plans="expiredPlans"
          :request-plans="requestPlans"
        />

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDashboardData } from "@/services/superDashboard.service.js";

import LayoutHeader from "@/components/LayoutHeader.vue";
import LayoutSidebar from "@/components/LayoutSidebar.vue";
import ApexChart from "vue3-apexcharts";
import DashboardTable from "@/components/DashboardTable.vue";
import DashboardExpiredPlans from "@/components/DashboardExpiredPlans.vue";

// State
const user = ref({ name: "Loading..." });
const dateRange = ref("");
const stats = ref({ newCompaniesToday: 0 });
const welcomeBackgrounds = ref([
  { src: require("@/assets/img/bg/welcome-bg-01.svg"), alt: "Welcome BG 1", class: "welcome-bg-01" },
  { src: require("@/assets/img/bg/welcome-bg-02.svg"), alt: "Welcome BG 2", class: "welcome-bg-02" },
  { src: require("@/assets/img/bg/welcome-bg-03.svg"), alt: "Welcome BG 3", class: "welcome-bg-03" },
]);

// Summary Cards
const summaryCards = ref([]);

// Company Chart
const companyChart = ref({
  selectedRange: "This Week",
  ranges: ["Today", "This Week", "This Month"],
  options: {},
  series: [],
  delta: 0,
  percentChange: 0,
});

// Revenue Chart
const revenueChart = ref({
  selectedYear: new Date().getFullYear(),
  years: [2023, 2024, 2025],
  total: 0,
  change: 0,
  options: {},
  series: [],
});

// Top Plans
const topPlans = ref({
  selectedRange: "This Month",
  ranges: ["Today", "This Week", "This Month"],
  options: {},
  series: [],
  details: [],
});

// Tables
const recentTransactions = ref([]);
const recentlyRegistered = ref([]);
const expiredPlans = ref([]);
const requestPlans = ref([]);

// Methods
const toggleHeader = () => {
  console.log("Toggle header collapse");
};

const updateCompanyRange = (range) => (companyChart.value.selectedRange = range);
const updateRevenueYear = (year) => (revenueChart.value.selectedYear = year);
const updateTopPlansRange = (range) => (topPlans.value.selectedRange = range);

// Fetch dashboard data
onMounted(async () => {
  const data = await getDashboardData();

  user.value = data.user;
  stats.value = data.stats;
  summaryCards.value = data.summaryCards;
  companyChart.value = data.companyChart;
  revenueChart.value = data.revenueChart;
  topPlans.value = data.topPlans;
  recentTransactions.value = data.recentTransactions;
  recentlyRegistered.value = data.recentlyRegistered;
  expiredPlans.value = data.expiredPlans;
  requestPlans.value = data.requestPlans;
});
</script>

<style scoped>
/* Add any necessary overrides here */
</style>
