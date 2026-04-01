<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
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
              <li class="breadcrumb-item">
                Super Admin
              </li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </nav>
        </div>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
          <div class="input-icon mb-2 position-relative">
            <span class="input-icon-addon">
              <i class="ti ti-calendar text-gray-9"></i>
            </span>
            <input type="text" class="form-control date-range bookingrange" ref="dateRangeInput"
              placeholder="dd/mm/yyyy - dd/mm/yyyy">
          </div>
          <div class="ms-2 head-icons">
            <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <!-- Welcome Wrap -->
      <div class="welcome-wrap mb-4">
        <div class=" d-flex align-items-center justify-content-between flex-wrap">
          <div class="mb-3">
            <h2 class="mb-1 text-white">
              Welcome Back, {{ dashboard?.admin?.name || 'Admin' }}
              </h2>
              <p class="text-light">
              {{ dashboard?.companies?.today || 0 }} New Companies Subscribed Today
           </p>
          </div>
          <div class="d-flex align-items-center flex-wrap mb-1">
            <router-link to="/super-admin/companies" class="btn btn-dark btn-md me-2 mb-2">Companies</router-link>
            <router-link to="/super-admin/packages" class="btn btn-light btn-md mb-2">All Packages</router-link>
          </div>
        </div>
        <div class="welcome-bg">
          <img src="@/assets/img/bg/welcome-bg-02.svg" alt="img" class="welcome-bg-01">
          <img src="@/assets/img/bg/welcome-bg-03.svg" alt="img" class="welcome-bg-02">
          <img src="@/assets/img/bg/welcome-bg-01.svg" alt="img" class="welcome-bg-03">
        </div>
      </div>
      <!-- /Welcome Wrap -->

      <div class="row">

        
        <!-- Total Companies -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <span class="avatar avatar-md bg-dark mb-3">
                  <i class="ti ti-building fs-16"></i>
                </span>
                <span class="badge bg-success fw-normal mb-3">
                  +19.01%
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h2 class="mb-1">
                     {{ loading ? '...' : totalCompanies }}
                  </h2>
                  <p class="fs-13">Total Companies</p>
                </div>
                <div id="total-chart">
                  <apexchart type="bar" width="50" :options="totalChart.total" :series="totalChart.series">
                  </apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Companies -->

        <!-- Active Companies -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <span class="avatar avatar-md bg-dark mb-3">
                  <i class="ti ti-carousel-vertical fs-16"></i>
                </span>
                <span class="badge bg-danger fw-normal mb-3">
                  -12%
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h2 class="mb-1">
                    {{ loading ? '...' : activeCompanies }}
                  </h2>
                  <p class="fs-13">Active Companies</p>
                </div>
                <div id="active-chart">
                  <apexchart type="bar" width="50" :options="activeChart.active" :series="activeChart.series">
                  </apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Active Companies -->

        <!-- Total Subscribers -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <span class="avatar avatar-md bg-dark mb-3">
                  <i class="ti ti-chalkboard-off fs-16"></i>
                </span>
                <span class="badge bg-success fw-normal mb-3">
                  +6%
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h2 class="mb-1">
                    {{ loading ? '...' : totalSubscribers }}
                  </h2>
                  <p class="fs-13">Total Subscribers</p>
                </div>
                <div id="inactive-chart">
                  <apexchart type="bar" width="50" :options="inactiveChart.inactive" :series="inactiveChart.series">
                  </apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Subscribers -->

        <!-- Total Earnings -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <span class="avatar avatar-md bg-dark mb-3">
                  <i class="ti ti-businessplan fs-16"></i>
                </span>
                <span class="badge bg-danger fw-normal mb-3">
                  -16%
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h2 class="mb-1">
                    {{ loading ? '...' : formatCurrency(totalRevenue) }}
                  </h2>
                  <p class="fs-13">Total Earnings</p>
                </div>
                <div id="location-chart">
                  <apexchart type="bar" width="50" :options="locationChart.location" :series="locationChart.series">
                  </apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Earnings -->

      </div>

      <div class="row">

        <!-- Companies -->
        <div class="col-xxl-3 col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Companies</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1"></i>This Week
                </a>
                <ul class="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div id="company-chart">
                <apexchart type="bar" height="290" :options="companyChart.company" :series="companyChart.series">
                </apexchart>
              </div>
              <p class="f-13 d-inline-flex align-items-center"><span class="badge badge-success me-1">+6%</span> 5
                Companies from last month</p>
            </div>
          </div>
        </div>
        <!-- /Companies -->

        <!-- Revenue -->
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Revenue</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1"></i>2025
                </a>
                <ul class="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">2024</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">2025</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">2023</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body pb-0">
              <div class="d-flex align-items-center justify-content-between flex-wrap">
                <div class="mb-1">
                  <h5 class="mb-1">
                    {{ loading ? '...' : formatCurrency(totalRevenue) }}
                  </h5>
                  <p><span class="text-success fw-bold">+40%</span> increased from last year</p>
                </div>
                <p class="fs-13 text-gray-9 d-flex align-items-center mb-1"><i
                    class="ti ti-circle-filled me-1 fs-6 text-primary"></i>Revenue</p>
              </div>
              <div id="revenue-income">
                <apexchart type="bar" height="280" :options="revenueCharts.income" :series="revenueCharts.series">
                </apexchart>
              </div>
            </div>
          </div>
        </div>
        <!-- /Revenue -->

        <!-- Top Plans -->
        <div class="col-xxl-3 col-xl-12 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Top Plans</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1"></i>This Month
                </a>
                <ul class="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div id="plan-overview">
                <apexchart type="donut" height="240" :options="donutChart.donut" :series="donutChart.series">
                </apexchart>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <p class="f-13 mb-0"><i class="ti ti-circle-filled text-primary me-1"></i>Basic </p>
                <p class="f-13 fw-medium text-gray-9">60%</p>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <p class="f-13 mb-0"><i class="ti ti-circle-filled text-warning me-1"></i>Premium</p>
                <p class="f-13 fw-medium text-gray-9">20%</p>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-0">
                <p class="f-13 mb-0"><i class="ti ti-circle-filled text-info me-1"></i>Enterprise</p>
                <p class="f-13 fw-medium text-gray-9">20%</p>
              </div>
            </div>
          </div>
        </div>
        <!-- /Top Plans -->

      </div>

      <div class="row">

        <!-- Recent Transactions -->
        <div class="col-xxl-4 col-xl-12 d-flex">
  <div class="card flex-fill">
    <div class="card-header ...">
    </div>

    <div class="card-body pb-2">
      <RecentTransactions :transactions="dashboard?.transactions || []" />
    </div>
  </div>
</div>

<!-- Recently Registered -->
<div class="col-xxl-4 col-xl-12 d-flex">
  <div class="card flex-fill">
    <div class="card-body pb-2">
      <RecentCompanies :companies="dashboard?.recentCompanies || []" />
    </div>
  </div>
</div>

        <!-- Recent Plan Expired -->
        <div class="col-xxl-4 col-xl-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
              <h5 class="mb-2">Recent Plan Expired</h5>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);"
                  class="dropdown-toggle btn btn-white border btn-sm d-inline-flex align-items-center fs-13"
                  data-bs-toggle="dropdown">
                  Expired
                </a>
                <div class="dropdown-menu dropdown-menu-end p-3">
                  <ul class="nav d-block">
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item d-block rounded-1" data-bs-toggle="tab"
                        data-bs-target="#expired">Expired</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item d-block rounded-1" data-bs-toggle="tab"
                        data-bs-target="#request">Request</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body pb-2">
              <div class="tab-content">
                <div class="tab-pane fade show active" id="expired">
                  <div class="d-sm-flex justify-content-between flex-wrap mb-3">
                    <div class="d-flex align-items-center mb-2">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/icons/company-icon-16.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Silicon Corp</a></h6>
                        <p class="fs-13">Expired : 10 Apr 2025</p>
                      </div>
                    </div>
                    <div class="text-sm-end mb-2">
                      <a href="javascript:void(0);" class="link-info text-decoration-underline d-block mb-1">Send
                        Reminder</a>
                      <p class="fs-13">Basic (Monthly)</p>
                    </div>
                  </div>
                  <div class="d-sm-flex justify-content-between flex-wrap mb-3">
                    <div class="d-flex align-items-center mb-2">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/icons/company-icon-14.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Hubspot</a></h6>
                        <p class="fs-13">Expired : 12 Jun 2025</p>
                      </div>
                    </div>
                    <div class="text-sm-end mb-2">
                      <a href="javascript:void(0);" class="link-info text-decoration-underline d-block mb-1">Send
                        Reminder</a>
                      <p class="fs-13">Enterprise (Yearly)</p>
                    </div>
                  </div>
                  <div class="d-sm-flex justify-content-between flex-wrap mb-3">
                    <div class="d-flex align-items-center mb-2">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/icons/company-icon-18.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Licon Industries</a></h6>
                        <p class="fs-13">Expired : 16 Jun 2025</p>
                      </div>
                    </div>
                    <div class="text-sm-end mb-2">
                      <a href="javascript:void(0);" class="link-info text-decoration-underline d-block mb-1">Send
                        Reminder</a>
                      <p class="fs-13">Advanced (Monthly)</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between flex-wrap mb-3">
                    <div class="d-flex align-items-center mb-2">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/company/company-07.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">TerraFusion Energy</a>
                        </h6>
                        <p class="fs-13">Expired : 12 May 2025</p>
                      </div>
                    </div>
                    <div class="text-sm-end mb-2">
                      <a href="javascript:void(0);" class="link-info text-decoration-underline d-block mb-1">Send
                        Reminder</a>
                      <p class="fs-13">Enterprise (Monthly)</p>
                    </div>
                  </div>
                  <div class="d-sm-flex justify-content-between flex-wrap mb-1">
                    <div class="d-flex align-items-center mb-2">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/company/company-08.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Epicurean Delights</a>
                        </h6>
                        <p class="fs-13">Expired : 15 May 2025</p>
                      </div>
                    </div>
                    <div class="text-sm-end mb-2">
                      <a href="javascript:void(0);" class="link-info text-decoration-underline d-block mb-1">Send
                        Reminder</a>
                      <p class="fs-13">Premium (Yearly)</p>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="request">
                  <div class="d-flex justify-content-between mb-4">
                    <div class="d-flex align-items-center overflow-hidden">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/icons/company-icon-16.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill overflow-hidden">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Silicon Corp</a></h6>
                        <p class="fs-13 text-info text-truncate">silicon.example.com</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <a href="javascript:void(0);"
                        class="link-success text-decoration-underline fs-13 fw-medium me-3">Approve</a>
                      <a href="javascript:void(0);"
                        class="link-danger text-decoration-underline fs-13 fw-medium">Reject</a>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-4">
                    <div class="d-flex align-items-center overflow-hidden">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/icons/company-icon-14.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill overflow-hidden">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Hubspot</a></h6>
                        <p class="fs-13 text-info text-truncate">hubspot.example.com</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <a href="javascript:void(0);"
                        class="link-success text-decoration-underline fs-13 fw-medium me-3">Approve</a>
                      <a href="javascript:void(0);"
                        class="link-danger text-decoration-underline fs-13 fw-medium">Reject</a>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-4">
                    <div class="d-flex align-items-center overflow-hidden">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/icons/company-icon-18.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill overflow-hidden">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Licon Industries</a></h6>
                        <p class="fs-13 text-info text-truncate">licon.example.com</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <a href="javascript:void(0);"
                        class="link-success text-decoration-underline fs-13 fw-medium me-3">Approve</a>
                      <a href="javascript:void(0);"
                        class="link-danger text-decoration-underline fs-13 fw-medium">Reject</a>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-4">
                    <div class="d-flex align-items-center overflow-hidden">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/company/company-07.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill overflow-hidden">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">TerraFusion Energy</a>
                        </h6>
                        <p class="fs-13 text-info text-truncate">fusion.example.com</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <a href="javascript:void(0);"
                        class="link-success text-decoration-underline fs-13 fw-medium me-3">Approve</a>
                      <a href="javascript:void(0);"
                        class="link-danger text-decoration-underline fs-13 fw-medium">Reject</a>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-0">
                    <div class="d-flex align-items-center overflow-hidden">
                      <a href="javascript:void(0);" class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
                        <img src="@/assets/img/company/company-08.svg" class="img-fluid w-auto h-auto" alt="img">
                      </a>
                      <div class="ms-2 flex-fill overflow-hidden">
                        <h6 class="fs-medium text-truncate mb-1"><a href="javascript:void(0);">Epicurean Delights</a>
                        </h6>
                        <p class="fs-13 text-info text-truncate">epicuran.example.com</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <a href="javascript:void(0);"
                        class="link-success text-decoration-underline fs-13 fw-medium me-3">Approve</a>
                      <a href="javascript:void(0);"
                        class="link-danger text-decoration-underline fs-13 fw-medium">Reject</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Recent Plan Expired -->
       <!-- Loading State -->
<div v-if="loading" class="text-center p-5">
  Loading dashboard...
</div>

<!-- Footer -->
<div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
  <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; E13solution.</p>
  <p>
    Designed &amp; Developed By 
    <a href="javascript:void(0);" class="text-primary">E13solution Dev Team</a>
  </p>

    </div> <!-- END content -->
  </div> <!-- END page-wrapper -->
  <!-- /Page Wrapper -->
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker"; // important (no direct constructor)

import RecentTransactions from "@/components/dashboard/RecentTransactions.vue";
import RecentCompanies from "@/components/dashboard/RecentCompanies.vue";

import { ref, reactive, onMounted, nextTick } from "vue";
import moment from "moment";
import $ from "jquery";

import { getSuperDashboard } from "@/services/superDashboard.service";

import {
  companyChart,
  revenueCharts,
  donutChart,
  totalChart,
  activeChart,
  inactiveChart,
  locationChart,
} from "./data";

export default {
  name: "SuperDashboard",

  components: {
    RecentTransactions,
    RecentCompanies,
  },

  setup() {
    // =========================
    // STATE
    // =========================
    const loading = ref(true);
    const dashboard = ref(null);

    const totalCompanies = ref(0);
    const activeCompanies = ref(0);
    const totalSubscribers = ref(0);
    const totalRevenue = ref(0);

    const dateRangeInput = ref(null);

    // Charts (reactive safe structure)
    const charts = reactive({
      totalChart,
      activeChart,
      inactiveChart,
      locationChart,
      companyChart,
      revenueCharts,
      donutChart,
    });

    // =========================
    // HELPERS
    // =========================
    const formatCurrency = (value) => {
      if (!value) return "₦0";
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(value);
    };

    // =========================
    // METHODS
    // =========================
    const toggleHeader = () => {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    };

    const loadDashboard = async (filters = {}) => {
      try {
        loading.value = true;

        const data = await getSuperDashboard(filters);

        dashboard.value = {
          ...data,
          transactions: data?.transactions || [],
          recentCompanies: data?.recentCompanies || [],
        };

        // =========================
        // BIND DATA → UI
        // =========================
        totalCompanies.value = data?.companies?.total || 0;
        activeCompanies.value = data?.companies?.active || 0;
        totalSubscribers.value = data?.users?.total || 0;
        totalRevenue.value = data?.revenue?.total || 0;

        // =========================
        // UPDATE CHARTS (SAFE MUTATION)
        // =========================
        if (data?.revenue?.chart) {
          charts.revenueCharts.series = data.revenue.chart.series || [];

          if (charts.revenueCharts?.income?.xaxis) {
            charts.revenueCharts.income.xaxis.categories =
              data.revenue.chart.categories || [];
          }
        }

        if (data?.companies?.chart) {
          charts.companyChart.series = data.companies.chart.series || [];

          if (charts.companyChart?.company?.xaxis) {
            charts.companyChart.company.xaxis.categories =
              data.companies.chart.categories || [];
          }
        }
      } catch (err) {
        console.error("❌ Dashboard error:", err);
      } finally {
        loading.value = false;
      }
    };

    // =========================
    // DATE RANGE
    // =========================
    const initDatePicker = async () => {
      await nextTick(); // ensure DOM is ready

      if (!dateRangeInput.value) return;

      const start = moment().subtract(6, "days");
      const end = moment();

      $(dateRangeInput.value).daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days"),
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [
              moment().startOf("month"),
              moment().endOf("month"),
            ],
            "Last Month": [
              moment().subtract(1, "month").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
          },
        },
        (start, end) => {
          // Reload dashboard with filters
          loadDashboard({
            from: start.format("YYYY-MM-DD"),
            to: end.format("YYYY-MM-DD"),
          });
        }
      );

      // Set initial display value
      $(dateRangeInput.value).val(
        start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY")
      );
    };

    // =========================
    // LIFECYCLE
    // =========================
    onMounted(async () => {
      await initDatePicker();
      await loadDashboard();
    });

    // =========================
    // RETURN
    // =========================
    return {
      // state
      loading,
      dashboard,
      totalCompanies,
      activeCompanies,
      totalSubscribers,
      totalRevenue,
      formatCurrency,

      // charts
      ...charts,

      // refs
      dateRangeInput,

      // methods
      toggleHeader,
      loadDashboard,
    };
  },
};
</script>
