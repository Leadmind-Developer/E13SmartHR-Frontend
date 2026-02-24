<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="head-icons">
          <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Call History List</h5>
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
                Call Type
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Incoming</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Outgoing</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Missed Call</a>
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
            <a-table class="table datatable" :columns="columns" :data-source="paginatedData"
              :row-selection="rowSelection">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Name'">
                  <div class="d-flex align-items-center">
                    <a href="javascript:void(0);" class="avatar avatar-md" data-bs-toggle="modal"
                      data-bs-target="#view_details">
                      <img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle" alt="img" />
                    </a>
                    <div class="ms-2">
                      <p class="text-dark fw-medium mb-0">
                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_details">{{
                          record.Name }}</a>
                      </p>
                      <span class="fs-12">{{ record.Email }}</span>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'CallType'">
                  <div class="d-inline-flex align-items-center">
                    <i :class="record.Class"></i>{{ record.CallType }}
                  </div>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#call_history"><i
                        class="ti ti-eye"></i></a>
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
  <call-history-modal></call-history-modal>
</template>
<script>
const columns = [
  {
    sorter: false,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    sorter: {
      compare: (a, b) => {
        a = a.Name.toLowerCase();
        b = b.Name.toLowerCase();
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
    title: "Call Type",
    dataIndex: "CallType",
    key: "CallType",
    sorter: {
      compare: (a, b) => {
        a = a.CallType.toLowerCase();
        b = b.CallType.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Duration",
    dataIndex: "Duration",
    sorter: {
      compare: (a, b) => {
        a = a.Duration.toLowerCase();
        b = b.Duration.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Date & Time",
    dataIndex: "DateTime",
    sorter: {
      compare: (a, b) => {
        a = a.DateTime.toLowerCase();
        b = b.DateTime.toLowerCase();
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
    Name: "Anthony Lewis",
    Email: "anthony@example.com",
    Phone: "(123) 4567 890",
    CallType: "Incoming",
    Class: "ti ti-phone-incoming text-success me-2",
    Duration: "0.25",
    Image: "user-32.jpg",
    DateTime: "14 Jan 2024, 04:27 AM",
  },
  {
    key: "2",
    Name: "Brian Villalobos",
    Email: "brian@example.com",
    Phone: "(179) 7382 829",
    CallType: "Outgoing",
    Class: "ti ti-phone-outgoing text-success me-2",
    Duration: "0.1",
    Image: "user-09.jpg",
    DateTime: "21 Jan 2024, 03:19 AM",
  },
  {
    key: "3",
    Name: "Harvey Smith",
    Email: "harvey@example.com",
    Phone: "(184) 2719 738",
    CallType: "Incoming",
    Class: "ti ti-video text-success me-2",
    Duration: "0.4",
    Image: "user-01.jpg",
    DateTime: "20 Feb 2024, 12:15 PM",
  },
  {
    key: "4",
    Name: "peral@example.com",
    Email: "peral@example.com",
    Phone: "(193) 7839 748",
    CallType: "Missed Call",
    Class: "ti ti-phone-x text-danger me-2",
    Duration: "0",
    Image: "user-33.jpg",
    DateTime: "15 Mar 2024, 12:11 AM",
  },
  {
    key: "5",
    Name: "Doglas Martini",
    Email: "martniwr@example.com",
    Phone: "(183) 9302 890",
    CallType: "Outgoing",
    Class: "ti ti-video text-success me-2",
    Duration: "0.35",
    Image: "user-33.jpg",
    DateTime: "12 Apr 2024, 05:48 PM",
  },
  {
    key: "6",
    Name: "Linda Ray",
    Email: "ray456@example.com",
    Phone: "(120) 3728 039",
    CallType: "Incomiing",
    Class: "ti ti-phone-incoming text-success me-2",
    Duration: "1.4",
    Image: "user-02.jpg",
    DateTime: "20 May 2024, 06:11 PM",
  },
  {
    key: "7",
    Name: "Elliot Murray",
    Email: "murray@example.com",
    Phone: "(102) 8480 832",
    CallType: "Missed call",
    Class: "ti ti-video text-danger me-2",
    Duration: "0",
    Image: "user-35.jpg",
    DateTime: "06 Jul 2024, 07:15 PM",
  },
  {
    key: "8",
    Name: "Rebecca Smtih",
    Email: "smtih@example.com",
    Phone: "(162) 8920 713",
    CallType: "Outgoing",
    Class: "ti ti-phone-outgoing text-success me-2",
    Duration: "0.45",
    Image: "user-36.jpg",
    DateTime: "02 Sep 2024, 09:21 PM",
  },
  {
    key: "9",
    Name: "Connie Waters",
    Email: "connie@example.com",
    Phone: "(189) 0920 723",
    CallType: "Incoming",
    Class: "ti ti-phone-incoming text-success me-2",
    Duration: "0.5",
    Image: "user-37.jpg",
    DateTime: "15 Nov 2024, 12:44 PM",
  },
  {
    key: "10",
    Name: "Lori Broaddus",
    Email: "broaddus@example.com",
    Phone: "(168) 8392 823",
    CallType: "Missed call",
    Class: "ti ti-phone-x text-danger me-2",
    Duration: "0",
    Image: "user-38.jpg",
    DateTime: "10 Dec 2024, 11:23 PM",
  },
];
const rowSelection = {
  onChange: () => { },
  onSelect: () => { },
  onSelectAll: () => { },
};

import { defineComponent } from "vue";
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
export default defineComponent({
  data() {
    return {
      title: "Call History",
      text: "Applications",
      text1: "Call History",
      data,
      columns,
      rowSelection,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
    };
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
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Name.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.CallType.toLowerCase().includes(query) ||
          record.Duration.toLowerCase().includes(query) ||
          record.DateTime.toLowerCase().includes(query)
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
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url).href;
    }
  },
});
</script>
