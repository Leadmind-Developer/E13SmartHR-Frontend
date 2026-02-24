<script>
const data = [
  {
    key: "1",
    Image: "user-32.jpg",
    Name: "Anthony Lewis",
    Role: "Finance",
    Date: "14 Jan 2024",
    Department: "Finance",
    Status: "Present",
  },
  {
    key: "2",
    Image: "user-09.jpg",
    Name: "Brian Villalobos",
    Role: "Developer",
    Date: "14 Jan 2024",
    Department: "Application Development",
    Status: "Present",
  },
  {
    key: "3",
    Image: "user-01.jpg",
    Name: "Harvey Smith",
    Role: "Developer",
    Date: "14 Jan 2024",
    Department: "IT Management",
    Status: "Present",
  },
  {
    key: "4",
    Image: "user-33.jpg",
    Name: "Stephan Peralt",
    Role: "Executive Officer",
    Date: "14 Jan 2024",
    Department: "Web Development",
    Status: "Present",
  },
  {
    key: "5",
    Image: "user-33.jpg",
    Name: "Doglas Martini",
    Role: "Manager",
    Date: "14 Jan 2024",
    Department: "Sales",
    Status: "Present",
  },
  {
    key: "6",
    Image: "user-02.jpg",
    Name: "Linda Ray",
    Role: "Finance",
    Date: "14 Jan 2024",
    Department: "UI / UX",
    Status: "Present",
  },
  {
    key: "7",
    Image: "user-35.jpg",
    Name: "Elliot Murray",
    Role: "Finance",
    Date: "14 Jan 2024",
    Department: "Account Management",
    Status: "Present",
  },
  {
    key: "8",
    Image: "user-36.jpg",
    Name: "Rebecca Smtih",
    Role: "Executive",
    Date: "14 Jan 2024",
    Department: "Marketing",
    Status: "Present",
  },
  {
    key: "9",
    Image: "user-37.jpg",
    Name: "Connie Waters",
    Role: "Developer",
    Date: "14 Jan 2024",
    Department: "Administration",
    Status: "Present",
  },
  {
    key: "10",
    Image: "user-38.jpg",
    Name: "Lori Broaddus",
    Role: "Developer",
    Date: "14 Jan 2024",
    Department: "Business Development",
    Status: "Absent",
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
    title: "Date",
    dataIndex: "Date",
    sorter: {
      compare: (a, b) => {
        a = a.Date.toLowerCase();
        b = b.Date.toLowerCase();
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
          record.Role.toLowerCase().includes(query) ||
          record.Date.toLowerCase().includes(query) ||
          record.Department.toLowerCase().includes(query) ||
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
            <div class="d-flex align-items-center">
              <a href="javascript:void(0);" class="avatar avatar-md" data-bs-toggle="modal"
                data-bs-target="#view_details"><img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle"
                  alt="img" />
              </a>
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
              record.Status === 'Present' ? 'badge-soft-success' : 'badge-soft-danger',
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
