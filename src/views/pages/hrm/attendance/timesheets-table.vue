<script>
const data = [
  {
    key: "1",
    Employee: "Anthony Lewis",
    Image: "user-32.jpg",
    Roll: "UI/UX Team",
    Date: "14 Jan 2024",
    Project: "Office Management",
    Assigned_Hours: "32",
    Worked_Hours: "13",
  },
  {
    key: "2",
    Employee: "Brian Villalobos",
    Image: "user-09.jpg",
    Roll: "Development",
    Date: "21 Jan 2024",
    Project: "Project Management",
    Assigned_Hours: "45",
    Worked_Hours: "14",
  },
  {
    key: "3",
    Employee: "Harvey Smith",
    Image: "user-01.jpg",
    Roll: "HR",
    Date: "20 Feb 2024",
    Project: "Project Management",
    Assigned_Hours: "45",
    Worked_Hours: "22",
  },
  {
    key: "4",
    Employee: "Stephan Peralt",
    Image: "user-33.jpg",
    Roll: "Management",
    Date: "15 Mar 2024",
    Project: "Hospital Administration",
    Assigned_Hours: "45",
    Worked_Hours: "78",
  },
  {
    key: "5",
    Employee: "Doglas Martini",
    Image: "user-34.jpg",
    Roll: "Development",
    Date: "12 Apr 2024",
    Project: "Office Management",
    Assigned_Hours: "36",
    Worked_Hours: "45",
  },
  {
    key: "6",
    Employee: "Linda Ray",
    Image: "user-02.jpg",
    Roll: "UI/UX Team",
    Date: "20 May 2024",
    Project: "Hospital Administration",
    Assigned_Hours: "49",
    Worked_Hours: "14",
  },
  {
    key: "7",
    Employee: "Elliot Murray",
    Image: "user-35.jpg",
    Roll: "Developer",
    Date: "06 Jul 2024",
    Project: "Video Calling App",
    Assigned_Hours: "57",
    Worked_Hours: "16",
  },
  {
    key: "8",
    Employee: "Rebecca Smtih",
    Image: "user-36.jpg",
    Roll: "UI/UX Team",
    Date: "02 Sep 2024",
    Project: "Office Management",
    Assigned_Hours: "21",
    Worked_Hours: "18",
  },
  {
    key: "9",
    Employee: "Connie Waters",
    Image: "user-37.jpg",
    Roll: "Management",
    Date: "15 Nov 2024",
    Project: "Project Management",
    Assigned_Hours: "32",
    Worked_Hours: "19",
  },
  {
    key: "10",
    Employee: "Connie Waters",
    Image: "user-38.jpg",
    Roll: "Management",
    Date: "15 Nov 2024",
    Project: "Project Management",
    Assigned_Hours: "32",
    Worked_Hours: "19",
  },
];

const columns = [
  {
    sorter: false,
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
    title: "Project",
    dataIndex: "Project",
    key: "Project",
    sorter: {
      compare: (a, b) => {
        a = a.Project.toLowerCase();
        b = b.Project.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Assigned Hours",
    dataIndex: "Assigned_Hours",
    sorter: {
      compare: (a, b) => {
        a = a.Assigned_Hours.toLowerCase();
        b = b.Assigned_Hours.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Worked Hours",
    dataIndex: "Worked_Hours",
    sorter: {
      compare: (a, b) => {
        a = a.Worked_Hours.toLowerCase();
        b = b.Worked_Hours.toLowerCase();
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
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Employee.toLowerCase().includes(query) ||
          record.Roll.toLowerCase().includes(query) ||
          record.Date.toLowerCase().includes(query) ||
          record.Project.toLowerCase().includes(query) ||
          record.Assigned_Hours.toLowerCase().includes(query) ||
          record.Worked_Hours.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Employee'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Employee }}</a>
                </h6>
                <span class="fs-12 fw-normal">{{ record.Roll }}</span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Project'">
            <p class="fs-14 fw-medium text-gray-9 d-flex align-items-center">
              {{ record.Project }}
              <a href="javascript:void(0);" class="ms-1" data-bs-toggle="tooltip" data-bs-placement="right"
                data-bs-title="Worked on the Management
                    design & Development"><i class="ti ti-info-circle text-info"></i></a>
            </p>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_timesheet"><i
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
