<script>
const data = [
  {
    key: "1",
    Image: "user-32.jpg",
    Training_Type: "Git Training",
    Trainer: "Anthony Lewis",
    Employee: "4",
    Img1: "user-01.jpg",
    Img2: "user-02.jpg",
    Img3: "user-03.jpg",
    Img4: "user-04.jpg",
    Img5: "user-05.jpg",
    Time_Duration: "12 Jan 2024 - 12 Feb 2024",
    Description: "Version control and code collaboration.",
    Cost: "$200",
    Status: "Active",
  },
  {
    key: "2",
    Image: "user-09.jpg",
    Training_Type: "HTML Training",
    Trainer: "Brian Villalobos",
    Employee: "3",
    Img1: "user-30.jpg",
    Img2: "user-28.jpg",
    Img3: "user-03.jpg",
    Img4: "user-07.jpg",
    Img5: "user-09.jpg",
    Time_Duration: "17 Jan 2024 - 17 Feb 2024",
    Description: "Basics of web page structure and markup.",
    Cost: "$100",
    Status: "Active",
  },
  {
    key: "3",
    Image: "user-01.jpg",
    Training_Type: "React Training",
    Trainer: "Harvey Smith",
    Employee: "6",
    Img1: "user-32.jpg",
    Img2: "user-21.jpg",
    Img3: "user-01.jpg",
    Img4: "user-05.jpg",
    Img5: "user-18.jpg",
    Time_Duration: "10 Feb 2024 - 10 Mar 2024",
    Description: "Dynamic web applications with components",
    Cost: "$300",
    Status: "Active",
  },
  {
    key: "4",
    Image: "user-33.jpg",
    Training_Type: "Nodejs Training",
    Trainer: "Stephan Peralt",
    Employee: "5",
    Img1: "user-28.jpg",
    Img2: "user-19.jpg",
    Img3: "user-11.jpg",
    Img4: "user-22.jpg",
    Img5: "user-17.jpg",
    Time_Duration: "20 Feb 2024 - 20 Mar 2024",
    Description: "Building scalable server-side applications",
    Cost: "$250",
    Status: "Active",
  },
  {
    key: "5",
    Image: "user-34.jpg",
    Training_Type: "Vuejs Training",
    Trainer: "Doglas Martini",
    Employee: "7",
    Img1: "user-23.jpg",
    Img2: "user-13.jpg",
    Img3: "user-12.jpg",
    Img4: "user-25.jpg",
    Img5: "user-19.jpg",
    Time_Duration: "16 Mar 2024 - 16 Apr 2024",
    Description: "Interactive single-page applications",
    Cost: "$280",
    Status: "Active",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Training Type",
    dataIndex: "Training_Type",
    sorter: {
      compare: (a, b) => {
        a = a.Training_Type.toLowerCase();
        b = b.Training_Type.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Trainer",
    dataIndex: "Trainer",
    key: "Trainer",
    sorter: {
      compare: (a, b) => {
        a = a.Trainer.toLowerCase();
        b = b.Trainer.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Employee",
    dataIndex: "Employee",
    key: "Employee",
    sorter: {
      compare: (a, b) => {
        a = a.Employee.toLowerCase();
        b = b.Employee.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Time Duration",
    dataIndex: "Time_Duration",
    sorter: {
      compare: (a, b) => {
        a = a.Time_Duration.toLowerCase();
        b = b.Time_Duration.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Description",
    dataIndex: "Description",
    sorter: {
      compare: (a, b) => {
        a = a.Description.toLowerCase();
        b = b.Description.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Cost",
    dataIndex: "Cost",
    sorter: {
      compare: (a, b) => {
        a = a.Cost.toLowerCase();
        b = b.Cost.toLowerCase();
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
          record.Training_Type.toLowerCase().includes(query) ||
          record.Trainer.toLowerCase().includes(query) ||
          record.Employee.toLowerCase().includes(query) ||
          record.Time_Duration.toLowerCase().includes(query) ||
          record.Description.toLowerCase().includes(query) ||
          record.Cost.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Trainer'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Trainer }}</a>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Employee'">
            <div class="avatar-list-stacked avatar-group-sm">
              <span class="avatar border-0">
                <img :src="getImageUrl(record.Img1)" class="rounded-circle" alt="img" />
              </span>
              <span class="avatar border-0">
                <img :src="getImageUrl(record.Img2)" class="rounded-circle" alt="img" />
              </span>
              <span class="avatar border-0">
                <img :src="getImageUrl(record.Img3)" class="rounded-circle" alt="img" />
              </span>
              <span class="avatar border-0">
                <img :src="getImageUrl(record.Img4)" class="rounded-circle" alt="img" />
              </span>
              <span class="avatar border-0">
                <img :src="getImageUrl(record.Img5)" class="rounded-circle" alt="img" />
              </span>
              <span class="avatar group-counts bg-primary rounded-circle border-0 fs-10">
                +{{ record.Employee }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="badge badge-success d-inline-flex align-items-center badge-xs">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_training"><i
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
