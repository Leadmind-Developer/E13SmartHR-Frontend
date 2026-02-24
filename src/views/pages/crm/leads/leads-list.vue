<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="d-flex align-items-center border bg-white rounded p-1 me-2">
              <router-link to="/crm/leads-list" class="btn btn-icon btn-sm active bg-primary text-white me-1"><i
                  class="ti ti-list-tree"></i></router-link>
              <router-link to="/crm/leads-grid" class="btn btn-icon btn-sm"><i
                  class="ti ti-layout-grid"></i></router-link>
            </div>
          </div>
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
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_leads"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add Lead</a>
          </div>
          <div class="head-icons ms-2">
            <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <!-- Leads List -->
      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Leads List</h5>
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div class="me-3">
              <div class="input-icon-end position-relative">
                <input type="text" class="form-control date-range bookingrange" ref="dateRangeInput"
                  placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span class="input-icon-addon">
                  <i class="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Tags
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Closed</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Contacted</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Lost</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Not Contacted</a>
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
                <template v-if="column.key === 'LeadName'">
                  <h6 class="fs-14 fw-medium">
                    <router-link to="/crm/leads-details">{{
                      record.LeadName
                    }}</router-link>
                  </h6>
                </template>
                <template v-if="column.key === 'CompanyName'">
                  <div class="d-flex align-items-center file-name-icon">
                    <router-link to="/crm/companies-details" class="avatar avatar-md border avatar-rounded">
                      <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
                    </router-link>
                    <div class="ms-2">
                      <h6 class="fw-normal fs-14 text-gray-5">
                        <router-link to="/crm/companies-details">{{
                          record.CompanyName
                        }}</router-link>
                      </h6>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'Tags'">
                  <span :class="[
                    'badge',
                    {
                      'badge-success-transparent': record.Tags === 'Closed',
                      'badge-purple-transparent': record.Tags === 'Contacted',
                      'badge-danger-transparent': record.Tags === 'Lost',
                      'badge-warning-transparent': record.Tags === 'Not Contacted',
                    },
                  ]">{{ record.Tags }}</span>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_leads"><i
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
      <!-- /Leads List -->
    </div>

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
  <leads-modal></leads-modal>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
const columns = [
  {
    sorter: false,
  },
  {
    title: "Lead Name",
    dataIndex: "LeadName",
    key: "LeadName",
    sorter: {
      compare: (a, b) => {
        a = a.LeadName.toLowerCase();
        b = b.LeadName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
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
    title: "Phone",
    dataIndex: "Phone",
    sorter: {
      compare: (a, b) => {
        a = a.Phone.toLowerCase();
        b = b.Phone.toLowerCase();
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
    title: "Tags",
    dataIndex: "Tags",
    key: "Tags",
    sorter: {
      compare: (a, b) => {
        a = a.Tags.toLowerCase();
        b = b.Tags.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: " Created Date",
    dataIndex: "CreatedDate",
    key: "CreatedDate",
    sorter: {
      compare: (a, b) => {
        a = a.CreatedDate.toLowerCase();
        b = b.CreatedDate.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Lead Owner",
    dataIndex: "LeadOwner",
    sorter: {
      compare: (a, b) => {
        a = a.LeadOwner.toLowerCase();
        b = b.LeadOwner.toLowerCase();
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
    LeadName: "Collins",
    CompanyName: "BrightWave Innovations",
    Phone: "(123) 4567 890",
    Email: "anthony@example.com",
    Tags: "Closed",
    CreatedDate: "14 Jan 2024",
    Image: "company-01.svg",
    LeadOwner: "Hendry",
  },
  {
    key: "2",
    LeadName: "Konopelski",
    CompanyName: "Stellar Dynamics",
    Phone: "(179) 7382 829",
    Email: "brian@example.com",
    Tags: "Contacted",
    CreatedDate: "21 Jan 2024",
    Image: "company-02.svg",
    LeadOwner: "Guilory",
  },
  {
    key: "3",
    LeadName: "Adams",
    CompanyName: "Quantum Nexus",
    Phone: "(184) 2719 738",
    Email: "harvey@example.com",
    Tags: "Lost",
    CreatedDate: "20 Feb 2024",
    Image: "company-03.svg",
    LeadOwner: "Jami",
  },
  {
    key: "4",
    LeadName: "Schumm",
    CompanyName: "EcoVision Enterprises",
    Phone: "(193) 7839 748",
    Email: "peral@example.com",
    Tags: "Not Contacted",
    CreatedDate: "15 Mar 2024",
    Image: "company-04.svg",
    LeadOwner: "Theresa",
  },
  {
    key: "5",
    LeadName: "Wisozk",
    CompanyName: "Aurora Technologies",
    Phone: "(183) 9302 890",
    Email: "martniwr@example.com",
    Tags: "Closed",
    CreatedDate: "12 Apr 2024",
    Image: "company-05.svg",
    LeadOwner: "Smith",
  },
  {
    key: "6",
    LeadName: "Heller",
    CompanyName: "BlueSky Ventures",
    Phone: "(120) 3728 039",
    Email: "ray456@example.com",
    Tags: "Contacted",
    CreatedDate: "20 May 2024",
    Image: "company-06.svg",
    LeadOwner: "Martin",
  },
  {
    key: "7",
    LeadName: "Gutkowski",
    CompanyName: "TerraFusion Energy",
    Phone: "(102) 8480 832",
    Email: "murray@example.com",
    Tags: "Not Contacted",
    CreatedDate: "06 Jul 2024",
    Image: "company-07.svg",
    LeadOwner: "Newell",
  },
  {
    key: "8",
    LeadName: "Walter",
    CompanyName: "UrbanPulse Design",
    Phone: "(162) 8920 713",
    Email: "smtih@example.com",
    Tags: "Closed",
    CreatedDate: "02 Sep 2024",
    Image: "company-08.svg",
    LeadOwner: "Janet",
  },
  {
    key: "9",
    LeadName: "Hansen",
    CompanyName: "Nimbus Networks",
    Phone: "(189) 0920 723",
    Email: "connie@example.com",
    Tags: "Closed",
    CreatedDate: "15 Nov 2024",
    Image: "company-09.svg",
    LeadOwner: "Craig",
  },
  {
    key: "10",
    LeadName: "Leuschke",
    CompanyName: "Epicurean Delights",
    Phone: "(168) 8392 823",
    Email: "broaddus@example.com",
    Tags: "Lost",
    CreatedDate: "10 Dec 2024",
    Image: "company-10.svg",
    LeadOwner: "Daniel",
  },
];
const rowSelection = {
  onChange: () => { },
  onSelect: () => { },
  onSelectAll: () => { },
};
export default {
  data() {
    return {
      title: "Leads",
      text: "CRM",
      text1: "Leads List",
      data,
      columns,
      rowSelection,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.LeadName.toLowerCase().includes(query) ||
          record.CompanyName.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Tags.toLowerCase().includes(query) ||
          record.CreatedDate.toLowerCase().includes(query) ||
          record.LeadOwner.toLowerCase().includes(query)
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
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/company/${imageName}`, import.meta.url)
        .href;
    },
  },
  setup() {
    const dateRangeInput = ref(null);

    // Move the function declaration outside of the onMounted callback
    function booking_range(start, end) {
      return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
    }

    onMounted(() => {
      if (dateRangeInput.value) {
        const start = moment().subtract(6, "days");
        const end = moment();

        new DateRangePicker(
          dateRangeInput.value,
          {
            startDate: start,
            endDate: end,
            ranges: {
              Today: [moment(), moment()],
              Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
              "Last Month": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              ],
            },
          },
          booking_range
        );

        booking_range(start, end);
      }
    });

    return {
      dateRangeInput,
    };
  },
};
</script>
