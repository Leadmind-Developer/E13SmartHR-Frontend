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
            <div class="d-flex align-items-center border bg-white rounded p-1 me-2">
              <router-link to="/crm/companies-crm" class="btn btn-icon btn-sm active bg-primary text-white me-1"><i
                  class="ti ti-list-tree"></i></router-link>
              <router-link to="/crm/companies-grid" class="btn btn-icon btn-sm"><i
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
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_company"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add New
              Company</a>
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
          <h5>Companies List</h5>
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
                Company
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">BrightWave Innovations
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Quantum Nexus</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">TerraFusion Energy</a>
                </li>
              </ul>
            </div>
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Owner
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Hendry</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Jami</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Newell</a>
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
                    <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                      <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
                    </router-link>
                    <div class="ms-2">
                      <h6 class="fw-medium">
                        <router-link to="/crm/companies-details">{{
                          record.CompanyName
                        }}</router-link>
                      </h6>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'Rating'">
                  <span><i class="ti ti-star-filled text-warning me-2"></i>{{ record.Rating }}</span>
                </template>
                <template v-if="column.key === 'Contact'">
                  <ul class="contact-icon d-flex align-items-center">
                    <li>
                      <a href="javascript:void(0);"
                        class="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
                          class="d-flex align-items-center justify-content-center"><i
                            class="ti ti-mail text-gray-5"></i></span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"
                        class="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
                          class="d-flex align-items-center justify-content-center"><i
                            class="ti ti-phone-call text-gray-5"></i></span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"
                        class="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
                          class="d-flex align-items-center justify-content-center"><i
                            class="ti ti-message-2 text-gray-5"></i></span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"
                        class="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
                          class="d-flex align-items-center justify-content-center"><i
                            class="ti ti-brand-skype text-gray-5"></i></span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"
                        class="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
                          class="d-flex align-items-center justify-content-center"><i
                            class="ti ti-brand-facebook text-gray-5"></i></span></a>
                    </li>
                  </ul>
                </template>
                <template v-if="column.key === 'Status'">
                  <span :class="record.Class">
                    <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
                  </span>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <router-link to="/crm/companies-details" class="me-2"><i class="ti ti-eye"></i></router-link>
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

    <div class="footer d-sm-flex align-items-center justify-content-between bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }}2025 &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <companies-crm-modal></companies-crm-modal>
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
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
    sorter: {
      compare: (a, b) => {
        a = a.Phone.toLowerCase();
        b = b.Phone.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Location",
    dataIndex: "Location",
    sorter: {
      compare: (a, b) => {
        a = a.Location.toLowerCase();
        b = b.Location.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Rating",
    dataIndex: "Rating",
    key: "Rating",
    sorter: {
      compare: (a, b) => {
        a = a.Rating.toLowerCase();
        b = b.Rating.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Owner",
    dataIndex: "Owner",
    sorter: {
      compare: (a, b) => {
        a = a.Owner.toLowerCase();
        b = b.Owner.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Contact",
    dataIndex: "Contact",
    key: "Contact",
    sorter: {
      compare: (a, b) => {
        a = a.Contact.toLowerCase();
        b = b.Contact.toLowerCase();
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
    Phone: "(163) 2459 315",
    Location: "Germany",
    Rating: "4.2",
    Owner: "Hendry",
    Image: "company-01.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "2",
    CompanyName: "Stellar Dynamics",
    Email: "sophie@example.com",
    Phone: "(146) 1249 296",
    Location: "USA",
    Rating: "5",
    Owner: "Guilory",
    Image: "company-02.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "3",
    CompanyName: "Quantum Nexus",
    Email: "cameron@example.com",
    Phone: "(135) 3489 516",
    Location: "Canada",
    Rating: "3.5",
    Owner: "Jami",
    Image: "company-03.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "4",
    CompanyName: "EcoVision Enterprises",
    Email: "doris@example.com",
    Phone: "(158) 3459 596",
    Location: "India",
    Rating: "4.5",
    Owner: "Theresa",
    Image: "company-04.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "5",
    CompanyName: "Aurora Technologies",
    Email: "thomas@example.com",
    Phone: "(196) 4862 196",
    Location: "China",
    Rating: "4.7",
    Owner: "Smith",
    Image: "company-05.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "6",
    CompanyName: "BlueSky Ventures",
    Email: "kathleen@example.com",
    Phone: "(163) 6498 256",
    Location: "Japan",
    Rating: "5",
    Owner: "Martin",
    Image: "company-06.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "7",
    CompanyName: "TerraFusion Energy",
    Email: "bruce@example.com",
    Phone: "(154) 6481 075",
    Location: "Indonesia",
    Rating: "3.1",
    Owner: "Newell",
    Image: "company-07.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "8",
    CompanyName: "UrbanPulse Design",
    Email: "estelle@example.com",
    Phone: "(184) 6348 195",
    Location: "Janet",
    Rating: "5",
    Owner: "Janet",
    Image: "company-08.svg",
    Status: "Inactive",
    Class: "badge badge-danger d-inline-flex align-items-center badge-xs",
  },
  {
    key: "9",
    CompanyName: "Nimbus Networks",
    Email: "stephen@example.com",
    Phone: "(175) 2496 125",
    Location: "Israel",
    Rating: "2.7",
    Owner: "Craig",
    Image: "company-09.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "10",
    CompanyName: "Epicurean Delights",
    Email: "angela@example.com",
    Phone: "(132) 3145 977",
    Location: "Colombia",
    Rating: "3",
    Owner: "Daniel",
    Image: "company-10.svg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
];
const rowSelection = {
  onChange: () => { },
  onSelect: () => { },
  onSelectAll: () => { },
};

import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";

export default {
  data() {
    return {
      title: "Companies",
      text: "Crm",
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
      return new URL(`/src/assets/img/company/${imageName}`, import.meta.url)
        .href;
    },
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.CompanyName.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.Location.toLowerCase().includes(query) ||
          record.Rating.toLowerCase().includes(query) ||
          record.Owner.toLowerCase().includes(query) ||
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
