<script>
const data = [
  {
    key: "1",
    Project_ID: "PRO-001",
    Image: "user-39.jpg",
    Project_Name: "Office Management App",
    Leader: "Michael Walker",
    Img: "avatar-02.jpg",
    Img1: "avatar-03.jpg",
    Img2: "avatar-05.jpg",
    Team: "1",
    Deadline: "12 Sep 2024",
    Priority: "High",
    Status: "Active",
  },
  {
    key: "2",
    Project_ID: "PRO-002",
    Image: "user-09.jpg",
    Project_Name: "Clinic Management",
    Leader: "Brian Villalobos",
    Img: "avatar-06.jpg",
    Img1: "avatar-07.jpg",
    Img2: "avatar-08.jpg",
    Team: "1",
    Deadline: "24 Oct 2024",
    Priority: "Low",
    Status: "Active",
  },
  {
    key: "3",
    Project_ID: "PRO-003",
    Image: "user-01.jpg",
    Project_Name: "Educational Platform",
    Leader: "Harvey Smith",
    Img: "avatar-09.jpg",
    Img1: "avatar-10.jpg",
    Img2: "avatar-11.jpg",
    Team: "1",
    Deadline: "18 Feb 2024",
    Priority: "Medium",
    Status: "Active",
  },
  {
    key: "4",
    Project_ID: "PRO-004",
    Image: "user-33.jpg",
    Project_Name: "Chat & Call  Mobile App",
    Leader: "Stephan Peralt",
    Img: "avatar-12.jpg",
    Img1: "avatar-13.jpg",
    Img2: "avatar-14.jpg",
    Team: "3",
    Deadline: "17 Oct 2024",
    Priority: "Medium",
    Status: "Active",
  },
  {
    key: "5",
    Project_ID: "PRO-005",
    Image: "user-34.jpg",
    Project_Name: "Travel Planning Website",
    Leader: "Doglas Martini",
    Img: "avatar-15.jpg",
    Img1: "avatar-16.jpg",
    Img2: "avatar-17.jpg",
    Team: "2",
    Deadline: "20 Jul 2024",
    Priority: "Medium",
    Status: "Active",
  },
  {
    key: "6",
    Project_ID: "PRO-006",
    Image: "user-02.jpg",
    Project_Name: "Service Booking Software",
    Leader: "Linda Ray",
    Img: "avatar-18.jpg",
    Img1: "avatar-19.jpg",
    Img2: "avatar-20.jpg",
    Team: "4",
    Deadline: "10 Feb 2024",
    Priority: "High",
    Status: "Active",
  },
  {
    key: "7",
    Project_ID: "PRO-007",
    Image: "user-35.jpg",
    Project_Name: "Hotel Booking App",
    Leader: "Elliot Murray",
    Img: "avatar-21.jpg",
    Img1: "avatar-22.jpg",
    Img2: "avatar-23.jpg",
    Team: "4",
    Deadline: "10 Apr 2024",
    Priority: "Medium",
    Status: "Active",
  },
  {
    key: "8",
    Project_ID: "PRO-008",
    Image: "user-36.jpg",
    Project_Name: "Car & Bike Rental Software",
    Leader: "Rebecca Smtih",
    Img: "avatar-24.jpg",
    Img1: "avatar-25.jpg",
    Img2: "avatar-26.jpg",
    Team: "2",
    Deadline: "22 Feb 2024",
    Priority: "Low",
    Status: "Inactive",
  },
  {
    key: "9",
    Project_ID: "PRO-009",
    Image: "user-37.jpg",
    Project_Name: "Food Order App",
    Leader: "Connie Waters",
    Img: "avatar-27.jpg",
    Img1: "avatar-28.jpg",
    Img2: "avatar-29.jpg",
    Team: "3",
    Deadline: "03 Nov 2024",
    Priority: "Medium",
    Status: "Active",
  },
  {
    key: "10",
    Project_ID: "PRO-010",
    Image: "user-38.jpg",
    Project_Name: "POS Admin Software",
    Leader: "Lori Broaddus",
    Img: "avatar-30.jpg",
    Img1: "avatar-13.jpg",
    Img2: "avatar-01.jpg",
    Team: "4",
    Deadline: "17 Dec 2024",
    Priority: "High",
    Status: "Active",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Project ID",
    dataIndex: "Project_ID",
    key: "Project_ID",
    sorter: {
      compare: (a, b) => {
        a = a.Project_ID.toLowerCase();
        b = b.Project_ID.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Project Name",
    dataIndex: "Project_Name",
    key: "Project_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Project_Name.toLowerCase();
        b = b.Project_Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Leader",
    dataIndex: "Leader",
    key: "Leader",
    sorter: {
      compare: (a, b) => {
        a = a.Leader.toLowerCase();
        b = b.Leader.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Team",
    dataIndex: "Team",
    key: "Team",
    sorter: {
      compare: (a, b) => {
        a = a.Team.toLowerCase();
        b = b.Team.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Deadline",
    dataIndex: "Deadline",
    sorter: {
      compare: (a, b) => {
        a = a.Deadline.toLowerCase();
        b = b.Deadline.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Priority",
    dataIndex: "Priority",
    key: "Priority",
    sorter: {
      compare: (a, b) => {
        a = a.Priority.toLowerCase();
        b = b.Priority.toLowerCase();
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
      rowSelection,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url).href;
    },
    getImageUrlOne(imageNameOne) {
      return new URL(`/src/assets/img/profiles/${imageNameOne}`, import.meta.url).href;
    }
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Project_ID.toLowerCase().includes(query) ||
          record.Project_Name.toLowerCase().includes(query) ||
          record.Leader.toLowerCase().includes(query) ||
          record.Team.toLowerCase().includes(query) ||
          record.Deadline.toLowerCase().includes(query) ||
          record.Priority.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Project_ID'">
            <router-link to="/projects/projects-details">{{ record.Project_ID }}</router-link>
          </template>
          <template v-if="column.key === 'Project_Name'">
            <h6 class="fw-medium">{{ record.Project_Name }}</h6>
          </template>
          <template v-if="column.key === 'Leader'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-sm border avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-normal">
                  <a href="javascript:void(0);">{{ record.Leader }}</a>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Team'">
            <div class="avatar-list-stacked avatar-group-sm">
              <span class="avatar avatar-rounded">
                <img class="border border-white" :src="getImageUrlOne(record.Img)" alt="img" />
              </span>
              <span class="avatar avatar-rounded">
                <img class="border border-white" :src="getImageUrlOne(record.Img1)" alt="img" />
              </span>
              <span class="avatar avatar-rounded">
                <img class="border border-white" :src="getImageUrlOne(record.Img2)" alt="img" />
              </span>
              <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium" href="javascript:void(0);">
                +{{ record.Team }}
              </a>
            </div>
          </template>
          <template v-if="column.key === 'Priority'">
            <div class="dropdown">
              <a href="javascript:void(0);"
                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <span class="rounded-circle d-flex justify-content-center align-items-center me-2" :class="[
                  record.Priority === 'High'
                    ? 'bg-transparent-danger'
                    : record.Priority === 'Low'
                      ? 'bg-transparent-success'
                      : 'bg-transparent-warning',
                ]">
                  <i class="ti ti-point-filled" :class="[
                    record.Priority === 'High'
                      ? 'text-danger'
                      : record.Priority === 'Low'
                        ? 'text-success'
                        : 'text-warning',
                  ]"></i>
                </span>
                {{ record.Priority }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);"
                    class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                      class="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
                        class="ti ti-point-filled text-danger"></i></span>High</a>
                </li>
                <li>
                  <a href="javascript:void(0);"
                    class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                      class="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
                        class="ti ti-point-filled text-warning"></i></span>Medium</a>
                </li>
                <li>
                  <a href="javascript:void(0);"
                    class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                      class="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
                        class="ti ti-point-filled text-success"></i></span>Low</a>
                </li>
              </ul>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="d-inline-flex align-items-center badge-xs" :class="[
              'badge',
              record.Status === 'Active' ? 'badge-success' : 'badge-danger',
            ]">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_project"><i
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
