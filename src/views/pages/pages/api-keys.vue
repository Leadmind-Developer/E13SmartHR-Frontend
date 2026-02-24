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
          <div class="mb-2">
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_key"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add Key</a>
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

      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>API Keys List</h5>
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Select Status
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Success</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Rejected</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Warning</a>
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
                <template v-if="column.key === 'CreatedBy'">
                  <div class="d-flex align-items-center file-name-icon">
                    <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                      <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
                    </a>
                    <div class="ms-2">
                      <h6 class="fw-medium">
                        <a href="javascript:void(0);">{{ record.CreatedBy }}</a>
                      </h6>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'APIKey'">
                  <div class="d-flex align-items-center">
                    <p class="me-2 mb-0">{{ record.APIKey }}</p>
                    <span><i class="ti ti-clipboard"></i></span>
                  </div>
                </template>
                <template v-if="column.key === 'Status'">
                  <span :class="[
                    'badge',
                    record.Status === 'Success'
                      ? 'badge-success'
                      : record.Status === 'Rejected'
                        ? 'badge-danger'
                        : record.Status === 'Warning'
                          ? 'badge-warning'
                          : 'd-inline-flex',
                    'align-items-center',
                    'badge-xs',
                  ]">
                    <i class="ti ti-point-filled me-1"></i>
                    {{ record.Status }}
                  </span>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_key"><i
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
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
  <api-keys-modal></api-keys-modal>
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
    title: "Service Name",
    dataIndex: "ServiceName",
    sorter: {
      compare: (a, b) => {
        a = a.ServiceName.toLowerCase();
        b = b.ServiceName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Created By",
    dataIndex: "CreatedBy",
    key: "CreatedBy",
    sorter: {
      compare: (a, b) => {
        a = a.CreatedBy.toLowerCase();
        b = b.CreatedBy.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "API key",
    dataIndex: "APIKey",
    key: "APIKey",
    sorter: {
      compare: (a, b) => {
        a = a.APIKey.toLowerCase();
        b = b.APIKey.toLowerCase();
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
    title: "Created Date",
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
    title: "",
    key: "action",
    sorter: true,
  },
];
const data = [
  {
    key: "1",
    ServiceName: "Paytm",
    CreatedBy: "Anthony Lewis",
    APIKey: "paytm1234567890abcdef",
    Status: "Success",
    CreatedDate: "14 Jan 2024",
    Image: "user-32.jpg",
  },
  {
    key: "2",
    ServiceName: "Paytm",
    CreatedBy: "Brian Villalobos",
    APIKey: "paytm1234567890abcdef",
    Status: "Rejected",
    CreatedDate: "21 Jan 2024",
    Image: "user-09.jpg",
  },
  {
    key: "3",
    ServiceName: "Paytm",
    CreatedBy: "Harvey Smith",
    APIKey: "paytm1234567890abcdef",
    Status: "Success",
    CreatedDate: "20 Feb 2024",
    Image: "user-01.jpg",
  },
  {
    key: "4",
    ServiceName: "Paytm",
    CreatedBy: "Stephan Peralt",
    APIKey: "paytm1234567890abcdef",
    Status: "Success",
    CreatedDate: "15 Mar 2024",
    Image: "user-33.jpg",
  },
  {
    key: "5",
    ServiceName: "Paytm",
    CreatedBy: "Doglas Martini",
    APIKey: "paytm1234567890abcdef",
    Status: "Warning",
    CreatedDate: "12 Apr 2024",
    Image: "user-34.jpg",
  },
  {
    key: "6",
    ServiceName: "Paytm",
    CreatedBy: "Linda Ray",
    APIKey: "paytm1234567890abcdef",
    Status: "Success",
    CreatedDate: "20 Apr 2024",
    Image: "user-02.jpg",
  },
  {
    key: "7",
    ServiceName: "Paytm",
    CreatedBy: "Elliot Murray",
    APIKey: "paytm1234567890abcdef",
    Status: "Warning",
    CreatedDate: "06 Jul 2024",
    Image: "user-35.jpg",
  },
  {
    key: "8",
    ServiceName: "Paytm",
    CreatedBy: "Rebecca Smtih",
    APIKey: "paytm1234567890abcdef",
    Status: "Rejected",
    CreatedDate: "02 Sep 2024",
    Image: "user-36.jpg",
  },
  {
    key: "9",
    ServiceName: "Paytm",
    CreatedBy: "Connie Waters",
    APIKey: "paytm1234567890abcdef",
    Status: "Success",
    CreatedDate: "15 Nov 2024",
    Image: "user-37.jpg",
  },
  {
    key: "10",
    ServiceName: "Paytm",
    CreatedBy: "Lori Broaddus",
    APIKey: "paytm1234567890abcdef",
    Status: "Success",
    CreatedDate: "10 Dec 2024",
    Image: "user-38.jpg",
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
      data,
      columns,
      rowSelection,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      title: "API Keys",
      text: "Pages",
      text1: "API Keys",
    };
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.ServiceName.toLowerCase().includes(query) ||
          record.CreatedBy.toLowerCase().includes(query) ||
          record.APIKey.toLowerCase().includes(query) ||
          record.Status.toLowerCase().includes(query) ||
          record.CreatedDate.toLowerCase().includes(query)
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
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
        .href;
    },
  },
};
</script>
