<script>
const data = [
  {
    key: "1",
    Emp_ID: "Emp-001",
    Image: "user-32.jpg",
    Name: "Anthony Lewis",
    Role: "Finance",
    Email: "anthony@example.com",
    Department: "Finance",
    Phone: "(123) 4567 890",
    Joining_Date: "12 Sep 2024",
    Status: "Active",
  },
  {
    key: "2",
    Emp_ID: "Emp-002",
    Image: "user-09.jpg",
    Name: "Brian Villalobos",
    Role: "Developer",
    Email: "brian@example.com",
    Department: "Application Development",
    Phone: "(179) 7382 829",
    Joining_Date: "24 Oct 2024",
    Status: "Active",
  },
  {
    key: "3",
    Emp_ID: "Emp-003",
    Image: "user-01.jpg",
    Name: "Harvey Smith",
    Role: "Developer",
    Email: "harvey@example.com",
    Department: "IT Management",
    Phone: "(184) 2719 738",
    Joining_Date: "18 Feb 2024",
    Status: "Active",
  },
  {
    key: "4",
    Emp_ID: "Emp-004",
    Image: "user-33.jpg",
    Name: "Stephan Peralt",
    Role: "Executive Officer",
    Email: "peral@example.com",
    Department: "Web Development",
    Phone: "(193) 7839 748",
    Joining_Date: "17 Oct 2024",
    Status: "Active",
  },
  {
    key: "5",
    Emp_ID: "Emp-005",
    Image: "user-33.jpg",
    Name: "Doglas Martini",
    Role: "Manager",
    Email: "martniwr@example.com",
    Department: "Sales",
    Phone: "(183) 9302 890",
    Joining_Date: "20 Jul 2024",
    Status: "Active",
  },
  {
    key: "6",
    Emp_ID: "Emp-006",
    Image: "user-02.jpg",
    Name: "Linda Ray",
    Role: "Finance",
    Email: "ray456@example.com",
    Department: "UI / UX",
    Phone: "(120) 3728 039",
    Joining_Date: "10 Apr 2024",
    Status: "Active",
  },
  {
    key: "7",
    Emp_ID: "Emp-007",
    Image: "user-35.jpg",
    Name: "Elliot Murray",
    Role: "Finance",
    Email: "murray@example.com",
    Department: "Account Management",
    Phone: "(102) 8480 832",
    Joining_Date: "29 Aug 2024",
    Status: "Active",
  },
  {
    key: "8",
    Emp_ID: "Emp-008",
    Image: "user-36.jpg",
    Name: "Rebecca Smtih",
    Role: "Executive",
    Email: "smtih@example.com",
    Department: "Marketing",
    Phone: "(162) 8920 713",
    Joining_Date: "22 Feb 2024",
    Status: "Inactive",
  },
  {
    key: "9",
    Emp_ID: "Emp-009",
    Image: "user-37.jpg",
    Name: "Connie Waters",
    Role: "Developer",
    Email: "connie@example.com",
    Department: "Administration",
    Phone: "(189) 0920 723",
    Joining_Date: "03 Nov 2024",
    Status: "Active",
  },
  {
    key: "10",
    Emp_ID: "Emp-010",
    Image: "user-38.jpg",
    Name: "Lori Broaddus",
    Role: "Developer",
    Email: "broaddus@example.com",
    Department: "Business Development",
    Phone: "(168) 8392 823",
    Joining_Date: "17 Dec 2024",
    Status: "Active",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Emp ID",
    dataIndex: "Emp_ID",
    key: "Emp_ID",
    sorter: {
      compare: (a, b) => {
        a = a.Emp_ID.toLowerCase();
        b = b.Emp_ID.toLowerCase();
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
    title: "Joining Date",
    dataIndex: "Joining_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Joining_Date.toLowerCase();
        b = b.Joining_Date.toLowerCase();
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
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Emp_ID.toLowerCase().includes(query) ||
          record.Name.toLowerCase().includes(query) ||
          record.Role.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Department.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.Joining_Date.toLowerCase().includes(query) ||
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
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
        .href;
    },
  }
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
          <template v-if="column.key === 'Emp_ID'">
            <router-link to="/employee/employee-details" class="link-default">{{
              record.Emp_ID
            }}</router-link>
          </template>
          <template v-if="column.key === 'Name'">
            <div class="d-flex align-items-center">
              <a href="javascript:void(0);" class="avatar avatar-md" data-bs-toggle="modal"
                data-bs-target="#view_details"><img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle"
                  alt="img" /></a>
              <div class="ms-2">
                <p class="text-dark mb-0">
                  <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_details">{{ record.Name
                  }}</a>
                </p>
                <span class="fs-12">{{ record.Role }}</span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="d-inline-flex align-items-center badge-xs" :class="[
              'badge',
              record.Status === 'Active' ? 'badge-success' : 'badge-danger',
            ]">
              <i class="ti ti-point-filled me-1"></i>Active
            </span>
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
