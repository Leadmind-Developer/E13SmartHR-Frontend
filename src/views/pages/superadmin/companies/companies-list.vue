<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-2">
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_company"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add Company</a>
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

      <div class="row">
        <!-- Total Companies -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <span class="avatar avatar-lg bg-primary flex-shrink-0">
                  <i class="ti ti-building fs-16"></i>
                </span>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">Total Companies</p>
                  <h4>950</h4>
                </div>
              </div>
              <div id="total-chart">
                <apexchart type="area" width="50" :options="totalChart.total" :series="totalChart.series">
                </apexchart>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Companies -->

        <!-- Total Companies -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <span class="avatar avatar-lg bg-success flex-shrink-0">
                  <i class="ti ti-building fs-16"></i>
                </span>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">Active Companies</p>
                  <h4>920</h4>
                </div>
              </div>
              <div id="active-chart">
                <apexchart type="area" width="50" :options="activeChart.active" :series="activeChart.series">
                </apexchart>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Companies -->

        <!-- Inactive Companies -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <span class="avatar avatar-lg bg-danger flex-shrink-0">
                  <i class="ti ti-building fs-16"></i>
                </span>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">Inactive Companies</p>
                  <h4>30</h4>
                </div>
              </div>
              <div id="inactive-chart">
                <apexchart type="area" width="50" :options="inactiveChart.inactive" :series="inactiveChart.series">
                </apexchart>
              </div>
            </div>
          </div>
        </div>
        <!-- /Inactive Companies -->

        <!-- Company Location -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <span class="avatar avatar-lg bg-skyblue flex-shrink-0">
                  <i class="ti ti-map-pin-check fs-16"></i>
                </span>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">Company Location</p>
                  <h4>180</h4>
                </div>
              </div>
              <div id="location-chart">
                <apexchart type="area" width="50" :options="locationChart.location" :series="locationChart.series">
                </apexchart>
              </div>
            </div>
          </div>
        </div>
        <!-- /Company Location -->
      </div>

      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Companies List</h5>
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div class="me-3">
              <div class="input-icon-end position-relative">
                <input type="text" class="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span class="input-icon-addon">
                  <i class="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Select Plan
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Advanced</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Basic</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Enterprise</a>
                </li>
              </ul>
            </div>
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Select Status
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Active</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Inactive</a>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Recently Added</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Descending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Month</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last 7 Days</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div class="dataTables_length" id="DataTables_Table_0_length"><label>Row Per Page
                  <select v-model="pageSize" name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                    class="form-select form-select-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select> Entries</label></div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input v-model="searchQuery"
                    type="search" class="form-control form-control-sm" placeholder="Search"
                    aria-controls="DataTables_Table_0"></label>
              </div>
            </div>
          </div>
          <div class="custom-datatable-filter table-responsive">
            <a-table class="table datatable thead-light" :columns="columns" :data-source="paginatedData"
              :row-selection="rowSelection">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'CompanyName'">
                  <div class="d-flex align-items-center file-name-icon">
                    <a href="javascript:void(0);" class="avatar avatar-md border rounded-circle">
                      <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
                    </a>
                    <div class="ms-2">
                      <h6 class="fw-medium">
                        <a href="javascript:void(0);">{{ record.CompanyName }}</a>
                      </h6>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'Plan'">
                  <div class="d-flex align-items-center justify-content-between">
                    <p class="mb-0 me-2">{{ record.Plan }}</p>
                    <a href="javascript:void(0);" data-bs-toggle="modal" class="badge badge-purple badge-xs"
                      data-bs-target="#upgrade_info">Upgrade</a>
                  </div>
                </template>
                <template v-if="column.key === 'Status'">
                  <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                    <i class="ti ti-point-filled me-1"></i>Active
                  </span>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                      data-bs-target="#company_detail"><i class="ti ti-eye"></i></a>
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_company"><i
                        class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                        class="ti ti-trash"></i></a>
                  </div>
                </template>
              </template>
            </a-table>
          </div>
          <div class="row pagination">
            <div class="col-sm-12 col-md-5">
              <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                Showing {{
                  (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize,
                  filteredPages.length) }} of {{
                  filteredPages.length }}
                entries</div>
            </div>
            <div class="col-sm-12 col-md-7">
              <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                <ul class="pagination">
                  <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }"
                    id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true"
                      role="link" data-dt-idx="previous" tabindex="-1" class="page-link" href="javascript:void(0);"
                      @click.prevent="currentPage > 1 ? currentPage-- : null"><i class="ti ti-chevron-left"></i>
                    </a></li>
                  <li class="paginate_button page-item" :class="{ active: page === currentPage }"
                    v-for="page in totalPages" :key="page">
                    <a href="javascript:void(0);" @click.prevent="currentPage = page" aria-controls="DataTables_Table_0"
                      role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">{{ page }}</a>
                  </li>
                  <li class="paginate_button page-item next" :class="{ disabled: currentPage === totalPages }"
                    id="DataTables_Table_0_next">
                    <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next"
                      tabindex="-1" class="page-link" href="javascript:void(0);"
                      @click.prevent="currentPage < totalPages ? currentPage++ : null"><i
                        class="ti ti-chevron-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }}2025 &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
  <companies-modal></companies-modal>
</template>
<script>
const columns = [
  {
    sorter: false,
  },
  {
    title: "Company Name",
    dataIndex: "CompanyName",
    key: "CompanyName",
    sorter: {
      compare: (a, b) => {
        a = a.CompanyName.toLowerCase();
        b = b.CompanyName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Email",
    dataIndex: "Email",
    sorter: {
      compare: (a, b) => {
        a = a.Email.toLowerCase();
        b = b.Email.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Accoun tURL",
    dataIndex: "AccountURL",
    key: "AccountURL",
    sorter: {
      compare: (a, b) => {
        a = a.AccountURL.toLowerCase();
        b = b.AccountURL.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Plan",
    dataIndex: "Plan",
    key: "Plan",
    sorter: {
      compare: (a, b) => {
        a = a.Plan.toLowerCase();
        b = b.Plan.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "CreatedDate",
    dataIndex: "CreatedDate",
    sorter: {
      compare: (a, b) => {
        a = a.CreatedDate.toLowerCase();
        b = b.CreatedDate.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    sorter: {
      compare: (a, b) => {
        a = a.Status.toLowerCase();
        b = b.Status.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "",
    key: "action",
    sorter: true,
  },
];
const data = [
  {
    key: "1",
    CompanyName: "BrightWave Innovations",
    Email: "michael@example.com",
    AccountURL: "bwi.example.com",
    Plan: "Advanced (Monthly)",
    CreatedDate: "12 Sep 2024",
    Image: "company-01.svg",
    Status: "Active",
  },
  {
    key: "2",
    CompanyName: "Stellar Dynamics",
    Email: "sophie@example.com",
    AccountURL: "sd.example.com",
    Plan: "Basic (Yearly)",
    CreatedDate: "24 Oct 2024",
    Image: "company-02.svg",
    Status: "Active",
  },
  {
    key: "3",
    CompanyName: "Quantum Nexus",
    Email: "cameron@example.com",
    AccountURL: "qn.example.com",
    Plan: "Advanced (Monthly)",
    CreatedDate: "18 Feb 2024",
    Image: "company-03.svg",
    Status: "Active",
  },
  {
    key: "4",
    CompanyName: "EcoVision Enterprises",
    Email: "doris@example.com",
    AccountURL: "eve.example.com",
    Plan: "Advanced (Monthly)",
    CreatedDate: "17 Oct 2024",
    Image: "company-04.svg",
    Status: "Active",
  },
  {
    key: "5",
    CompanyName: "Aurora Technologies",
    Email: "thomas@example.com",
    AccountURL: "at.example.com",
    Plan: "Enterprise (Monthly)",
    CreatedDate: "20 Jul 2024",
    Image: "company-05.svg",
    Status: "Active",
  },
  {
    key: "6",
    CompanyName: "BlueSky Ventures",
    Email: "kathleen@example.com",
    AccountURL: "bsv.example.com",
    Plan: "Advanced (Monthly)",
    CreatedDate: "10 Apr 2024",
    Image: "company-06.svg",
    Status: "Active",
  },
  {
    key: "7",
    CompanyName: "TerraFusion Energy",
    Email: "bruce@example.com",
    AccountURL: "tfe.example.com",
    Plan: "Enterprise (Yearly)",
    CreatedDate: "29 Aug 2024",
    Image: "company-07.svg",
    Status: "Active",
  },
  {
    key: "8",
    CompanyName: "UrbanPulse Design",
    Email: "estelle@example.com",
    AccountURL: "upd.example.com",
    Plan: "Basic (Monthly)",
    CreatedDate: "22 Feb 2024",
    Image: "company-08.svg",
    Status: "Inactive",
  },
  {
    key: "9",
    CompanyName: "Nimbus Networks",
    Email: "stephen@example.com",
    AccountURL: "nn.example.com",
    Plan: "Basic (Yearly)",
    CreatedDate: "03 Nov 2024",
    Image: "company-09.svg",
    Status: "Active",
  },
  {
    key: "10",
    CompanyName: "Epicurean Delights",
    Email: "angela@example.com",
    AccountURL: "ed.example.com",
    Plan: "Advanced (Monthly)",
    CreatedDate: "17 Dec 2024",
    Image: "company-10.svg",
    Status: "Active",
  },
];
const rowSelection = {
  onChange: () => { },
  onSelect: () => { },
  onSelectAll: () => { },
};
import { totalChart, activeChart, inactiveChart, locationChart } from "./data";
export default {
  data() {
    return {
      totalChart: totalChart,
      activeChart: activeChart,
      inactiveChart: inactiveChart,
      locationChart: locationChart,
      title: "Companies",
      text: "Superadmin",
      text1: "Companies",
      data,
      columns,
      rowSelection,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/company/${imageName}`, import.meta.url).href;
    }
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.CompanyName.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.AccountURL.toLowerCase().includes(query) ||
          record.Plan.toLowerCase().includes(query) ||
          record.CreatedDate.toLowerCase().includes(query) ||
          record.Status.toLowerCase().includes(query)
        );
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredPages.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filteredPages.length / this.pageSize) || 1;
    },
  },
};
</script>
