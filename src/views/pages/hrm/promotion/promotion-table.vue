<script>
const data = [
  {
    key: "1",
    Image: "user-32.jpg",
    Promoted_Employee: "Anthony Lewis",
    Department: "Finance",
    Designation_From: "Accountant",
    Designation_To: "Sr Accountant",
    Promotion_Date: "14 Jan 2024",
  },
  {
    key: "2",
    Image: "user-09.jpg",
    Promoted_Employee: "Brian Villalobos",
    Department: "Application Development",
    Designation_From: "Jr App Developer",
    Designation_To: "Sr App Developer",
    Promotion_Date: "21 Jan 2024",
  },
  {
    key: "3",
    Image: "user-01.jpg",
    Promoted_Employee: "Harvey Smith",
    Department: "Web Development",
    Designation_From: "Sr Web Developer",
    Designation_To: "Team Lead",
    Promotion_Date: "20 Feb 2024",
  },
  {
    key: "4",
    Image: "user-33.jpg",
    Promoted_Employee: "Stephan Peralt",
    Department: "UI / UX",
    Designation_From: "Jr Designer",
    Designation_To: "Sr Designer",
    Promotion_Date: "15 Mar 2024",
  },
  {
    key: "5",
    Image: "user-34.jpg",
    Promoted_Employee: "Doglas Martini",
    Department: "Marketing",
    Designation_From: "SEO Analyst",
    Designation_To: "Sr SEO Analyst",
    Promotion_Date: "10 Apr 2024",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Promoted Employee",
    dataIndex: "Promoted_Employee",
    key: "Promoted_Employee",
    sorter: {
      compare: (a, b) => {
        a = a.Promoted_Employee.toLowerCase();
        b = b.Promoted_Employee.toLowerCase();
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
    title: "Designation From",
    dataIndex: "Designation_From",
    sorter: {
      compare: (a, b) => {
        a = a.Designation_From.toLowerCase();
        b = b.Designation_From.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Designation To",
    dataIndex: "Designation_To",
    sorter: {
      compare: (a, b) => {
        a = a.Designation_To.toLowerCase();
        b = b.Designation_To.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Promotion Date",
    dataIndex: "Promotion_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Promotion_Date.toLowerCase();
        b = b.Promotion_Date.toLowerCase();
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
          record.Promoted_Employee.toLowerCase().includes(query) ||
          record.Department.toLowerCase().includes(query) ||
          record.Designation_From.toLowerCase().includes(query) ||
          record.Designation_To.toLowerCase().includes(query) ||
          record.Promotion_Date.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Promoted_Employee'">
            <div class="d-flex align-items-center">
              <router-link to="/sales/invoice-details" class="avatar avatar-md me-2">
                <img :src="getImageUrl(record.Image)" class="rounded-circle" alt="user" />
              </router-link>
              <h6 class="fw-medium">
                <router-link to="/sales/invoice-details">{{
                  record.Promoted_Employee
                }}</router-link>
              </h6>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2"><i class="ti ti-edit" data-bs-toggle="modal"
                  data-bs-target="#edit_promotion"></i></a>
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
