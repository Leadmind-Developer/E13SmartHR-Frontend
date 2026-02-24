<script>
const data = [
  {
    key: "1",
    Image: "user-32.jpg",
    Name: "Anthony Lewis",
    Email: "anthony@example.com",
    Created_Date: "12 Sep 2024",
    Role: "Employee",
    Status: "Active",
  },
  {
    key: "2",
    Image: "user-09.jpg",
    Name: "Brian Villalobos",
    Email: "brian@example.com",
    Created_Date: "24 Oct 2024",
    Role: "Employee",
    Status: "Active",
  },
  {
    key: "3",
    Image: "user-40.jpg",
    Name: "Sophie Headrick",
    Email: "sophie@example.com",
    Created_Date: "18 Feb 2024",
    Role: "Client",
    Status: "Active",
  },
  {
    key: "4",
    Image: "user-33.jpg",
    Name: "Stephan Peralt",
    Email: "peral@example.com",
    Created_Date: "17 Oct 2024",
    Role: "Employee",
    Status: "Active",
  },
  {
    key: "5",
    Image: "user-44.jpg",
    Name: "Thomas Bordelon",
    Email: "thomas@example.com",
    Created_Date: "20 Jul 2024",
    Role: "Client",
    Status: "Active",
  },
  {
    key: "6",
    Image: "user-34.jpg",
    Name: "Doglas Martini",
    Email: "martniwr@example.com",
    Created_Date: "10 Apr 2024",
    Role: "Employee",
    Status: "Active",
  },
  {
    key: "7",
    Image: "user-41.jpg",
    Name: "Cameron Drake",
    Email: "cameron@example.com",
    Created_Date: "29 Aug 2024",
    Role: "Client",
    Status: "Active",
  },
  {
    key: "8",
    Image: "user-01.jpg",
    Name: "Harvey Smith",
    Email: "harvey@example.com",
    Created_Date: "22 Feb 2024",
    Role: "Employee",
    Status: "Inactive",
  },
  {
    key: "9",
    Image: "user-39.jpg",
    Name: "Michael Walker",
    Email: "michael@example.com",
    Created_Date: "03 Nov 2024",
    Role: "Client",
    Status: "Active",
  },
  {
    key: "10",
    Image: "user-42.jpg",
    Name: "Doris Crowley",
    Email: "doris@example.com",
    Created_Date: "17 Dec 2024",
    Role: "Client",
    Status: "Active",
  },
];

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
    title: "Created Date",
    dataIndex: "Created_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Created_Date.toLowerCase();
        b = b.Created_Date.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Role",
    dataIndex: "Role",
    key: "Role",
    sorter: {
      compare: (a, b) => {
        a = a.Role.toLowerCase();
        b = b.Role.toLowerCase();
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
          record.Name.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query) ||
          record.Role.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Name'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Name }}</a>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Role'">
            <span class="d-inline-flex align-items-center badge-xs" :class="[
              'badge',
              record.Role === 'Employee'
                ? 'badge-pink-transparent'
                : 'badge-purple-transparent',
            ]">
              {{ record.Role }}
            </span>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="d-inline-flex align-items-center badge-xs" :class="[
              'badge',
              record.Status === 'Active' ? 'badge-success' : 'badge-danger',
            ]">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
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
