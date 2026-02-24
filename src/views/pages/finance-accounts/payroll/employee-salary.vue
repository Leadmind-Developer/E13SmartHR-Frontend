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
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#new-employee-salary"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add Salary</a>
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

      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Employee Salary List</h5>
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
                Designation
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Finance</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Developer</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Executive</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Manager</a>
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
                <template v-if="column.key === 'Name'">
                  <div class="d-flex align-items-center file-name-icon">
                    <a href="javascript:void(0);" class="avatar avatar-md">
                      <img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle" alt="img" />
                    </a>
                    <div class="ms-2">
                      <h6 class="fw-medium">
                        <a href="javascript:void(0);">{{ record.Name }}</a>
                      </h6>
                      <span class="d-block mt-1">{{ record.Work }}</span>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'Designation'">
                  <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown">
                      <span
                        class="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
                      {{ record.Designation }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <a href="javascript:void(0);"
                          class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                            class="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"
                          class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                            class="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"
                          class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                            class="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"
                          class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                            class="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
                        </a>
                      </li>
                    </ul>
                  </div>
                </template>

                <template v-if="column.key === 'Payslip'">
                  <div>
                    <span class="badge badge-dark badge-md">{{ record.Payslip }}</span>
                  </div>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                      data-bs-target="#edit-employee-salary"><i class="ti ti-edit"></i></a>
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
  <employee-salary-modal></employee-salary-modal>
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
    title: "Emp ID",
    dataIndex: "EmpID",
    sorter: {
      compare: (a, b) => {
        a = a.EmpID.toLowerCase();
        b = b.EmpID.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
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
    sorter: {
      compare: (a, b) => {
        a = a.Phone.toLowerCase();
        b = b.Phone.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Designation",
    dataIndex: "Designation",
    key: "Designation",
    sorter: {
      compare: (a, b) => {
        a = a.Designation.toLowerCase();
        b = b.Designation.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Joining Date",
    dataIndex: "JoiningDate",
    key: "JoiningDate",
    sorter: {
      compare: (a, b) => {
        a = a.JoiningDate.toLowerCase();
        b = b.JoiningDate.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Payslip",
    dataIndex: "Payslip",
    key: "Payslip",
    sorter: {
      compare: (a, b) => {
        a = a.Payslip.toLowerCase();
        b = b.Payslip.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "",
    key: "action",
    sorter: false,
  },
];
const data = [
  {
    key: "1",
    EmpID: "Emp-001",
    Name: "Anthony Lewis",
    Work: "Finance",
    Email: "anthony@example.com",
    Phone: "(123) 4567 890",
    Designation: "Finance",
    JoiningDate: "12 Sep 2024",
    Salary: "$40000",
    Payslip: "Generate Slip",
    Image: "user-32.jpg",
  },
  {
    key: "2",
    EmpID: "Emp-002",
    Name: "Brian Villalobos",
    Work: "Developer",
    Email: "brian@example.com",
    Phone: "(179) 7382 829",
    Designation: "Developer",
    JoiningDate: "24 Oct 2024",
    Salary: "$35000",
    Payslip: "Generate Slip",
    Image: "user-09.jpg",
  },
  {
    key: "3",
    EmpID: "Emp-003",
    Name: "Harvey Smith",
    Work: "Developer",
    Email: "harvey@example.com",
    Phone: "(184) 2719 738",
    Designation: "Executive",
    JoiningDate: "18 Feb 2024",
    Salary: "$20000",
    Payslip: "Generate Slip",
    Image: "user-01.jpg",
  },
  {
    key: "4",
    EmpID: "Emp-004",
    Name: "Stephan Peralt",
    Work: "Executive Officer",
    Email: "peral@example.com",
    Phone: "(193) 7839 748",
    Designation: "Executive ",
    JoiningDate: "17 Oct 2024",
    Salary: "$$22000",
    Payslip: "Generate Slip",
    Image: "user-33.jpg",
  },
  {
    key: "5",
    EmpID: "Emp-005",
    Name: "Doglas Martini",
    Work: "Manager",
    Email: "martniwr@example.com",
    Phone: "(183) 9302 890",
    Designation: "Manager",
    JoiningDate: "20 Jul 2024",
    Salary: "$25000",
    Payslip: "Generate Slip",
    Image: "user-34.jpg",
  },
  {
    key: "6",
    EmpID: "Emp-006",
    Name: "Linda Ray",
    Work: "Finance",
    Email: "ray456@example.com",
    Phone: "(120) 3728 039",
    Designation: "Finance",
    JoiningDate: "10 Apr 2024",
    Salary: "$30000",
    Payslip: "Generate Slip",
    Image: "user-02.jpg",
  },
  {
    key: "7",
    EmpID: "Emp-007",
    Name: "Elliot Murray",
    Work: "Developer",
    Email: "murray@example.com",
    Phone: "(102) 8480 832",
    Designation: "Finance",
    JoiningDate: "29 Aug 2024",
    Salary: "$35000",
    Payslip: "Generate Slip",
    Image: "user-35.jpg",
  },
  {
    key: "8",
    EmpID: "Emp-008",
    Name: "Rebecca Smtih",
    Work: "Executive",
    Email: "smtih@example.com",
    Phone: "(162) 8920 713",
    Designation: "Executive",
    JoiningDate: "22 Feb 2024",
    Salary: "$45000",
    Payslip: "Generate Slip",
    Image: "user-36.jpg",
  },
  {
    key: "9",
    EmpID: "Emp-009",
    Name: "Connie Waters",
    Work: "Developer",
    Email: "connie@example.com",
    Phone: "(189) 0920 723",
    Designation: "Developer",
    JoiningDate: "03 Nov 2024",
    Salary: "$50000",
    Payslip: "Generate Slip",
    Image: "user-37.jpg",
  },
  {
    key: "10",
    EmpID: "Emp-010",
    Name: "Lori Broaddus",
    Work: "Finance",
    Email: "broaddus@example.com",
    Phone: "(168) 8392 823",
    Designation: "Finance ",
    JoiningDate: "17 Dec 2024",
    Salary: "$25000",
    Payslip: "Generate Slip",
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
      title: "Employee Salary",
      text: "Payroll",
      text1: "Employee Salary",
    };
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.EmpID.toLowerCase().includes(query) ||
          record.Name.toLowerCase().includes(query) ||
          record.Work.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.Designation.toLowerCase().includes(query) ||
          record.JoiningDate.toLowerCase().includes(query) ||
          record.Salary.toLowerCase().includes(query) ||
          record.Payslip.toLowerCase().includes(query)
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
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
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
