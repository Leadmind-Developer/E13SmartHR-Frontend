<script>
const data = [
  {
    key: "1",
    Image: "user-01.jpg",
    Author: "Ivan Lucas",
    Role: "HR Manager",
    Content:
      "This system streamlined our HR processes, saving us time and boosting team efficiency.",
    Created_Date: "12 Sep 2024",
  },
  {
    key: "2",
    Image: "user-02.jpg",
    Author: "John Mason",
    Role: "HR Manager",
    Content:
      "This system has made payroll and attendance tracking so much easier for our team",
    Created_Date: "24 Oct 2024",
  },
  {
    key: "3",
    Image: "user-03.jpg",
    Author: "Susan Hill",
    Role: "HR Manager",
    Content:
      "We've significantly reduced paperwork and manual errors since implementing this platform",
    Created_Date: "18 Feb 2024",
  },
  {
    key: "4",
    Image: "user-04.jpg",
    Author: "Gary Payton",
    Role: "HR Manager",
    Content: "Managing employee leave requests and benefits is now a hassle-free process",
    Created_Date: "17 Oct 2024",
  },
  {
    key: "5",
    Image: "user-05.jpg",
    Author: "Jennifer Vaughn",
    Role: "HR Manager",
    Content:
      "This platform has drastically cut down the time we spend on recruitment and onboarding.",
    Created_Date: "20 July 2024",
  },
  {
    key: "6",
    Image: "user-06.jpg",
    Author: "Ricky Easley",
    Role: "HR Manager",
    Content: "The system's ease of use has greatly improved our HR team's productivity.",
    Created_Date: "10 Apr 2024",
  },
  {
    key: "7",
    Image: "user-07.jpg",
    Author: "David Rodriguez",
    Role: "HR Manager",
    Content:
      "The platform allows me to update my personal details and view my payslips instantly",
    Created_Date: "29 Aug 2024",
  },
  {
    key: "8",
    Image: "user-08.jpg",
    Author: "Dennis Lorenzo",
    Role: "Employee",
    Content:
      "Submitting my timesheets and checking my attendance is super easy with this tool.",
    Created_Date: "22 Feb 2024",
  },
  {
    key: "9",
    Image: "user-09.jpg",
    Author: "Barry Ducote",
    Role: "Manager",
    Content:
      "Enhanced employee performance tracking and simplified payroll management effortlessly.",
    Created_Date: "03 Nov 2024",
  },
  {
    key: "10",
    Image: "user-10.jpg",
    Author: "Judy Walton",
    Role: "Employee",
    Content:
      "It’s great to see all my benefits and compensation details in one user-friendly interface.",
    Created_Date: "17 Dec 2024",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Author",
    dataIndex: "Author",
    key: "Author",
    sorter: {
      compare: (a, b) => {
        a = a.Author.toLowerCase();
        b = b.Author.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Role",
    dataIndex: "Role",
    sorter: {
      compare: (a, b) => {
        a = a.Role.toLowerCase();
        b = b.Role.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Content",
    dataIndex: "Content",
    sorter: {
      compare: (a, b) => {
        a = a.Content.toLowerCase();
        b = b.Content.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Created_Date",
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
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Author.toLowerCase().includes(query) ||
          record.Role.toLowerCase().includes(query) ||
          record.Content.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query)
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
      return new URL(`/src/assets/img/testimonials/${imageName}`, import.meta.url)
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
          <template v-if="column.key === 'Author'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Author }}</a>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#edit_testimonials" class="me-2"><i
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
