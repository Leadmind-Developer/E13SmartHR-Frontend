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
              <router-link to="/employee/employee-list" class="btn btn-icon btn-sm active bg-primary text-white me-1"><i
                  class="ti ti-list-tree"></i></router-link>
              <router-link to="/employee/employee-grid" class="btn btn-icon btn-sm"><i
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
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_employee"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add New
              Employee</a>
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

      <div class="row">
        <!-- Total Plans -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <div>
                  <span class="avatar avatar-lg bg-dark rounded-circle"><i class="ti ti-users"></i></span>
                </div>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">Total Employee</p>
                  <h4>1007</h4>
                </div>
              </div>
              <div>
                <span class="badge badge-soft-purple badge-sm fw-normal">
                  <i class="ti ti-arrow-wave-right-down"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Plans -->

        <!-- Total Plans -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <div>
                  <span class="avatar avatar-lg bg-success rounded-circle"><i class="ti ti-user-share"></i></span>
                </div>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">Active</p>
                  <h4>1007</h4>
                </div>
              </div>
              <div>
                <span class="badge badge-soft-primary badge-sm fw-normal">
                  <i class="ti ti-arrow-wave-right-down"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- /Total Plans -->

        <!-- Inactive Plans -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <div>
                  <span class="avatar avatar-lg bg-danger rounded-circle"><i class="ti ti-user-pause"></i></span>
                </div>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">InActive</p>
                  <h4>1007</h4>
                </div>
              </div>
              <div>
                <span class="badge badge-soft-dark badge-sm fw-normal">
                  <i class="ti ti-arrow-wave-right-down"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- /Inactive Companies -->

        <!-- No of Plans  -->
        <div class="col-lg-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center overflow-hidden">
                <div>
                  <span class="avatar avatar-lg bg-info rounded-circle"><i class="ti ti-user-plus"></i></span>
                </div>
                <div class="ms-2 overflow-hidden">
                  <p class="fs-12 fw-medium mb-1 text-truncate">New Joiners</p>
                  <h4>67</h4>
                </div>
              </div>
              <div>
                <span class="badge badge-soft-secondary badge-sm fw-normal">
                  <i class="ti ti-arrow-wave-right-down"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- /No of Plans -->
      </div>

      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Plan List</h5>
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
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
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

                <template v-if="column.key === 'Status'">
                  <span :class="[
                    'badge',
                    record.Status === 'Active'
                      ? 'badge-success'
                      : record.Status === 'Inactive'
                        ? 'badge-danger'
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
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_employee"><i
                        class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" @click="deleteEmployee(record.key)">
                        <i class="ti ti-trash"></i>
                      </a>
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
  <employee-list-modal></employee-list-modal>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import employeeService from "@/services/employee.service";

const columns = [
  { sorter: false },
  {
    title: "Emp ID",
    dataIndex: "EmpID",
    sorter: (a, b) => a.EmpID.localeCompare(b.EmpID),
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    sorter: (a, b) => a.Name.localeCompare(b.Name),
  },
  {
    title: "Email",
    dataIndex: "Email",
    sorter: (a, b) => a.Email.localeCompare(b.Email),
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    sorter: (a, b) => a.Phone.localeCompare(b.Phone),
  },
  {
    title: "Designation",
    dataIndex: "Designation",
    key: "Designation",
    sorter: (a, b) => a.Designation.localeCompare(b.Designation),
  },
  {
    title: "Joining Date",
    dataIndex: "JoiningDate",
    key: "JoiningDate",
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    sorter: (a, b) => a.Status.localeCompare(b.Status),
  },
  {
    title: "",
    key: "action",
  },
];

const rowSelection = {
  onChange: () => {},
};

export default {
  data() {
    return {
      employees: [],
      loading: false,

      columns,
      rowSelection,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,

      title: "Employee",
      text: "Employees",
      text1: "Employee List",

      dateRangeInput: null,
    };
  },

  async mounted() {
    this.initDateRange();
    await this.fetchEmployees();
  },

  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();

      return this.employees.filter((record) => {
        return (
          record.EmpID.toLowerCase().includes(query) ||
          record.Name.toLowerCase().includes(query) ||
          record.Work.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.Designation.toLowerCase().includes(query) ||
          record.JoiningDate.toLowerCase().includes(query) ||
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

  methods: {
    // ✅ Fetch from API
    async fetchEmployees() {
      try {
        this.loading = true;

        const res = await employeeService.getEmployees();

        this.employees = res.data.map((emp) => ({
          key: emp.id,
          EmpID: emp.id.slice(0, 8),
          Name: `${emp.firstName} ${emp.lastName}`,
          Email: emp.email,
          Phone: emp.phone || "-",
          Designation: emp.position || "-",
          Work: emp.department || "-",
          JoiningDate: new Date(emp.createdAt).toLocaleDateString(),
          Status: emp.status || "Active",
          Image: "user-01.jpg",
        }));
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      } finally {
        this.loading = false;
      }
    },

    // ✅ Delete
    async deleteEmployee(id) {
      if (!confirm("Delete this employee?")) return;

      try {
        await employeeService.deleteEmployee(id);
        await this.fetchEmployees();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    },

    // ✅ Date picker init (clean)
    initDateRange() {
      this.$nextTick(() => {
        const el = this.$refs.dateRangeInput;
        if (!el) return;

        const start = moment().subtract(6, "days");
        const end = moment();

        const bookingRange = (start, end) => {
          el.value =
            start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
        };

        new DateRangePicker(
          el,
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
          bookingRange
        );

        bookingRange(start, end);
      });
    },

    toggleHeader() {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    getImageUrl(imageName) {
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url).href;
    },
  },
};
</script>
