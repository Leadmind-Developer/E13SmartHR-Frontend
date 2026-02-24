<script>
const data = [
  {
    key: "1",
    Job_ID: "Job-001",
    Image: "apple.svg",
    Job_Title: "Senior IOS Developer",
    Roll: "25 Applicants",
    Category: "Software",
    Location: "New York , USA",
    Salary_Range: "30, 000 - 35, 000 / month",
    Posted_Date: "12 Sep 2024",
  },
  {
    key: "2",
    Job_ID: "Job-002",
    Image: "php.svg",
    Job_Title: "Junior PHP Developer",
    Roll: "20 Applicants",
    Category: "Software",
    Location: "Los Angeles, USA",
    Salary_Range: "20, 000 - 25, 000 / month",
    Posted_Date: "24 Oct 2024",
  },
  {
    key: "3",
    Job_ID: "Job-003",
    Image: "black.svg",
    Job_Title: "Junior PHP Developer",
    Roll: "20 Applicants",
    Category: "Software",
    Location: "Los Angeles, USA",
    Salary_Range: "20, 000 - 25, 000 / month",
    Posted_Date: "24 Oct 2024",
  },
  {
    key: "4",
    Job_ID: "Job-004",
    Image: "react.svg",
    Job_Title: "Junior React Developer",
    Roll: "35 Applicants",
    Category: "Software",
    Location: "Bristol, UK",
    Salary_Range: "30, 000 - 35, 000 / month",
    Posted_Date: "18 Feb 2024",
  },
  {
    key: "5",
    Job_ID: "Job-005",
    Image: "laravel.svg",
    Job_Title: "Senior Laravel Developer",
    Roll: "40 Applicants",
    Category: "Software",
    Location: "Washington, USA",
    Salary_Range: "32, 000 - 36, 000 / month",
    Posted_Date: "20 Jul 2024",
  },
  {
    key: "6",
    Job_ID: "Job-006",
    Image: "devops.svg",
    Job_Title: "DevOps Engineer",
    Roll: "20 Applicants",
    Category: "Software",
    Location: "Coventry, UK",
    Salary_Range: "25, 000 - 35, 000 / month",
    Posted_Date: "10 Apr 2024",
  },
  {
    key: "7",
    Job_ID: "Job-007",
    Image: "android.svg",
    Job_Title: "Junior Android Developer",
    Roll: "25 Applicants",
    Category: "Software",
    Location: "Chicago, USA",
    Salary_Range: "28, 000 - 32, 000 / month",
    Posted_Date: "29 Aug 2024",
  },
  {
    key: "8",
    Job_ID: "Job-008",
    Image: "html.svg",
    Job_Title: "Senior HTML Developer",
    Roll: "35 Applicants",
    Category: "Software",
    Location: "Carlisle, UK",
    Salary_Range: "25, 000 - 28, 000 / month",
    Posted_Date: "22 Feb 2024",
  },
  {
    key: "9",
    Job_ID: "Job-009",
    Image: "ui.svg",
    Job_Title: "Junior UI/UX Designer",
    Roll: "20 Applicants",
    Category: "Software",
    Location: "Lancaster, UK",
    Salary_Range: "20, 000 - 25, 000 / month",
    Posted_Date: "03 Nov 2024",
  },
  {
    key: "10",
    Job_ID: "Job-010",
    Image: "grafic.svg",
    Job_Title: "Senior Graphic Designer",
    Roll: "25 Applicants",
    Category: "Software",
    Location: "San Diego, USA",
    Salary_Range: "22, 000 - 28, 000 / month",
    Posted_Date: "17 Dec 2024",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Job ID",
    dataIndex: "Job_ID",
    sorter: {
      compare: (a, b) => {
        a = a.Job_ID.toLowerCase();
        b = b.Job_ID.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Job Title",
    dataIndex: "Job_Title",
    key: "Job_Title",
    sorter: {
      compare: (a, b) => {
        a = a.Job_Title.toLowerCase();
        b = b.Job_Title.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Category",
    dataIndex: "Category",
    sorter: {
      compare: (a, b) => {
        a = a.Category.toLowerCase();
        b = b.Category.toLowerCase();
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
    title: "Salary  Range",
    dataIndex: "Salary_Range",
    sorter: {
      compare: (a, b) => {
        a = a.Salary_Range.toLowerCase();
        b = b.Salary_Range.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Posted Date",
    dataIndex: "Posted_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Posted_Date.toLowerCase();
        b = b.Posted_Date.toLowerCase();
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
      return new URL(`/src/assets/img/icons/${imageName}`, import.meta.url)
        .href;
    },
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Job_ID.toLowerCase().includes(query) ||
          record.Job_Title.toLowerCase().includes(query) ||
          record.Roll.toLowerCase().includes(query) ||
          record.Category.toLowerCase().includes(query) ||
          record.Location.toLowerCase().includes(query) ||
          record.Salary_Range.toLowerCase().includes(query) ||
          record.Posted_Date.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Job_Title'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md bg-light rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Job_Title }}</a>
                </h6>
                <span class="d-block mt-1">{{ record.Roll }}</span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_post"><i
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
