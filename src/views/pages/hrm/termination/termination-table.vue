<script>
const data = [
  {
    key: "1",
    Image: "user-32.jpg",
    Resigning_Employee: "Anthony Lewis",
    Department: "Finance",
    Termination_Type: "Retirement",
    Notice_Date: "14 Jan 2024",
    Reason: "Employee retires",
    Resignation_Date: "14 Mar 2024",
  },
  {
    key: "2",
    Image: "user-09.jpg",
    Resigning_Employee: "Brian Villalobos",
    Department: "Application Development",
    Termination_Type: "Insubordination",
    Notice_Date: "21 Jan 2024",
    Reason: "Entrepreneurial Pursuits",
    Resignation_Date: "21 Mar 2024",
  },
  {
    key: "3",
    Image: "user-01.jpg",
    Resigning_Employee: "Harvey Smith",
    Department: "Web Development",
    Termination_Type: "Layoff",
    Notice_Date: "18 Feb 2024",
    Reason: "Workforce reduction",
    Resignation_Date: "18 Apr 2024",
  },
  {
    key: "4",
    Image: "user-33.jpg",
    Resigning_Employee: "Stephan Peralt",
    Department: "UI / UX",
    Termination_Type: "Breach of Contract",
    Notice_Date: "14 Mar 2024",
    Reason: "Violates the terms of the contract",
    Resignation_Date: "14 May 2024",
  },
  {
    key: "5",
    Image: "user-34.jpg",
    Resigning_Employee: "Doglas Martini",
    Department: "Marketing",
    Termination_Type: "Lack of Skills",
    Notice_Date: "10 Apr 2024",
    Reason: "Unable to perform job duties",
    Resignation_Date: "10 Jun 2024",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Resigning Employee",
    dataIndex: "Resigning_Employee",
    key: "Resigning_Employee",
    sorter: {
      compare: (a, b) => {
        a = a.Resigning_Employee.toLowerCase();
        b = b.Resigning_Employee.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Department",
    dataIndex: "Department",
    sorter: {
      compare: (a, b) => {
        a = a.Department.toLowerCase();
        b = b.Department.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Termination Type",
    dataIndex: "Termination_Type",
    sorter: {
      compare: (a, b) => {
        a = a.Termination_Type.toLowerCase();
        b = b.Termination_Type.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Notice Date",
    dataIndex: "Notice_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Notice_Date.toLowerCase();
        b = b.Notice_Date.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Reason",
    dataIndex: "Reason",
    sorter: {
      compare: (a, b) => {
        a = a.Reason.toLowerCase();
        b = b.Reason.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Resignation Date",
    dataIndex: "Resignation_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Resignation_Date.toLowerCase();
        b = b.Resignation_Date.toLowerCase();
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
    };
  },
  methods: {
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
        .href;
    },
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Resigning_Employee.toLowerCase().includes(query) ||
          record.Department.toLowerCase().includes(query) ||
          record.Termination_Type.toLowerCase().includes(query) ||
          record.Notice_Date.toLowerCase().includes(query) ||
          record.Reason.toLowerCase().includes(query) ||
          record.Resignation_Date.toLowerCase().includes(query)
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

<template>
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
        <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input v-model="searchQuery" type="search"
              class="form-control form-control-sm" placeholder="Search" aria-controls="DataTables_Table_0"></label>
        </div>
      </div>
    </div>
    <div class="custom-datatable-filter table-responsive">
      <a-table class="table datatable thead-light" :columns="columns" :data-source="paginatedData"
        :row-selection="rowSelection">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'Resigning_Employee'">
            <div class="d-flex align-items-center">
              <router-link to="/sales/invoice-details" class="avatar avatar-md me-2">
                <img :src="getImageUrl(record.Image)" class="rounded-circle" alt="user" />
              </router-link>
              <h6 class="fw-medium">
                <router-link to="/sales/invoice-details">{{
                  record.Resigning_Employee
                }}</router-link>
              </h6>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_termination"><i
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
              id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link"
                data-dt-idx="previous" tabindex="-1" class="page-link" href="javascript:void(0);"
                @click.prevent="currentPage > 1 ? currentPage-- : null"><i class="ti ti-chevron-left"></i>
              </a></li>
            <li class="paginate_button page-item" :class="{ active: page === currentPage }" v-for="page in totalPages"
              :key="page">
              <a href="javascript:void(0);" @click.prevent="currentPage = page" aria-controls="DataTables_Table_0"
                role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">{{ page }}</a>
            </li>
            <li class="paginate_button page-item next" :class="{ disabled: currentPage === totalPages }"
              id="DataTables_Table_0_next">
              <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next" tabindex="-1"
                class="page-link" href="javascript:void(0);"
                @click.prevent="currentPage < totalPages ? currentPage++ : null"><i class="ti ti-chevron-right"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
