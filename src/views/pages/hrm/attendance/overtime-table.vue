<script>
const data = [
  {
    key: "1",
    Emp_Image: "user-32.jpg",
    Employee: "Anthony Lewis",
    Roll: "UI/UX Team",
    Date: "14 Jan 2024",
    Overtime_Hours: "32",
    Project: "Office Management",
    Image: "user-39.jpg",
    Name: "Michael Walker",
    Status: "Accepted",
  },
  {
    key: "2",
    Emp_Image: "user-09.jpg",
    Employee: "Brian Villalobos",
    Roll: "Development",
    Date: "21 Jan 2024",
    Overtime_Hours: "45",
    Project: "Project Management",
    Image: "user-02.jpg",
    Name: "Sophie Headrick",
    Status: "Accepted",
  },
  {
    key: "3",
    Emp_Image: "user-01.jpg",
    Employee: "Harvey Smith",
    Roll: "HR",
    Date: "20 Feb 2024",
    Overtime_Hours: "31",
    Project: "Project Management",
    Image: "user-03.jpg",
    Name: "Cameron Drake",
    Status: "Accepted",
  },
  {
    key: "4",
    Emp_Image: "user-33.jpg",
    Employee: "Stephan Peralt",
    Roll: "Management",
    Date: "15 Mar 2024",
    Overtime_Hours: "45",
    Project: "Hospital Administration",
    Image: "user-04.jpg",
    Name: "Doris Crowley",
    Status: "Rejected",
  },
  {
    key: "5",
    Emp_Image: "user-34.jpg",
    Employee: "Doglas Martini",
    Roll: "Development",
    Date: "12 Apr 2024",
    Overtime_Hours: "36",
    Project: "Office Management",
    Image: "user-06.jpg",
    Name: "Thomas Bordelon",
    Status: "Accepted",
  },
  {
    key: "6",
    Emp_Image: "user-02.jpg",
    Employee: "Linda Ray",
    Roll: "UI/UX Team",
    Date: "20 May 2024",
    Overtime_Hours: "49",
    Project: "Hospital Administration",
    Image: "user-06.jpg",
    Name: "Kathleen Gutierrez",
    Status: "Accepted",
  },
  {
    key: "7",
    Emp_Image: "user-35.jpg",
    Employee: "Elliot Murray",
    Roll: "Developer",
    Date: "06 Jul 2024",
    Overtime_Hours: "57",
    Project: "Video Calling App",
    Image: "user-07.jpg",
    Name: "Bruce Wright",
    Status: "Accepted",
  },
  {
    key: "8",
    Emp_Image: "user-36.jpg",
    Employee: "Rebecca Smtih",
    Roll: "UI/UX Team",
    Date: "02 Sep 2024",
    Overtime_Hours: "21",
    Project: "Office Management",
    Image: "user-09.jpg",
    Name: "Estelle Morgan",
    Status: "Rejected",
  },
  {
    key: "9",
    Emp_Image: "user-37.jpg",
    Employee: "Connie Waters",
    Roll: "Management",
    Date: "15 Nov 2024",
    Overtime_Hours: "32",
    Project: "Project Management",
    Image: "user-10.jpg",
    Name: "Stephen Dias",
    Status: "Accepted",
  },
  {
    key: "10",
    Emp_Image: "user-38.jpg",
    Employee: "Connie Waters",
    Roll: "Management",
    Date: "15 Nov 2024",
    Overtime_Hours: "66",
    Project: "Ware house developement",
    Image: "user-05.jpg",
    Name: "Angela Thomas",
    Status: "Accepted",
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
    title: "Overtime Hours",
    dataIndex: "Overtime_Hours",
    sorter: {
      compare: (a, b) => {
        a = a.Overtime_Hours.toLowerCase();
        b = b.Overtime_Hours.toLowerCase();
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
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Emp_Image.toLowerCase().includes(query) ||
          record.Employee.toLowerCase().includes(query) ||
          record.Roll.toLowerCase().includes(query) ||
          record.Date.toLowerCase().includes(query) ||
          record.Overtime_Hours.toLowerCase().includes(query) ||
          record.Project.toLowerCase().includes(query) ||
          record.Name.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Employee'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                <img :src="getImageUrl(record.Emp_Image)" class="img-fluid" alt="img" />
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
            <div class="d-flex align-items-center">
              <a href="javascript:void(0);" class="fs-14 fw-medium text-gray-9 d-flex align-items-center"
                data-bs-toggle="modal" data-bs-target="#overtime_details">{{ record.Project }}
              </a>
              <a href="javascript:void(0);" class="ms-1" data-bs-toggle="tooltip" data-bs-placement="right"
                data-bs-title="Worked on the Management
                    design & Development"><i class="ti ti-info-circle text-info"></i></a>
            </div>
          </template>
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
          <template v-if="column.key === 'Status'">
            <span class="d-inline-flex align-items-center badge-xs" :class="[
              'badge',
              record.Status === 'Accepted' ? 'badge-success' : 'badge-danger',
            ]">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_overtime"><i
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
