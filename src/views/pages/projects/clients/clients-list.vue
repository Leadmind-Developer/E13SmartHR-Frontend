<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div class="my-auto mb-2">
          <h2 class="mb-1">Clients</h2>
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/dashboard/"><i class="ti ti-smart-home"></i></router-link>
              </li>
              <li class="breadcrumb-item">Projects</li>
              <li class="breadcrumb-item active" aria-current="page">Client List</li>
            </ol>
          </nav>
        </div>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="d-flex align-items-center border bg-white rounded p-1 me-2">
              <router-link to="/projects/clients" class="btn btn-icon btn-sm active bg-primary text-white me-1"><i
                  class="ti ti-list-tree"></i></router-link>
              <router-link to="/projects/clients-grid" class="btn btn-icon btn-sm"><i
                  class="ti ti-layout-grid"></i></router-link>
            </div>
          </div>
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-2">
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_client"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add Client</a>
          </div>
          <div class="ms-2 head-icons">
            <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <!-- Clients Info -->
      <div class="row">
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <span
                      class="p-2 br-10 bg-pink-transparent border border-pink d-flex align-items-center justify-content-center">
                      <i class="ti ti-users-group text-pink fs-18"></i>
                    </span>
                  </div>
                  <div>
                    <p class="fs-12 fw-medium mb-0 text-gray-5 mb-1">Total Clients</p>
                    <h4>300</h4>
                  </div>
                </div>
                <span class="badge bg-transparent-purple d-inline-flex align-items-center fw-normal">
                  <i class="ti ti-arrow-wave-right-down me-1"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <span
                      class="p-2 br-10 bg-success-transparent border border-success d-flex align-items-center justify-content-center">
                      <i class="ti ti-user-share fs-18"></i>
                    </span>
                  </div>
                  <div>
                    <p class="fs-12 fw-medium mb-0 text-gray-5 mb-1">Active Clients</p>
                    <h4>270</h4>
                  </div>
                </div>
                <span class="badge bg-transparent-primary text-primary d-inline-flex align-items-center fw-normal">
                  <i class="ti ti-arrow-wave-right-down me-1"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <span
                      class="p-2 br-10 bg-danger-transparent border border-danger d-flex align-items-center justify-content-center">
                      <i class="ti ti-user-pause fs-18"></i>
                    </span>
                  </div>
                  <div>
                    <p class="fs-12 fw-medium mb-0 text-gray-5 mb-1">Inactive Clients</p>
                    <h4>30</h4>
                  </div>
                </div>
                <span class="badge bg-transparent-dark text-dark d-inline-flex align-items-center fw-normal">
                  <i class="ti ti-arrow-wave-right-down me-1"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <span
                      class="p-2 br-10 bg-info-transparent border border-info d-flex align-items-center justify-content-center">
                      <i class="ti ti-user-plus fs-18"></i>
                    </span>
                  </div>
                  <div>
                    <p class="fs-12 fw-medium mb-0 text-gray-5 mb-1">New Clients</p>
                    <h4>300</h4>
                  </div>
                </div>
                <span class="badge bg-transparent-secondary text-dark d-inline-flex align-items-center fw-normal">
                  <i class="ti ti-arrow-wave-right-down me-1"></i>
                  +19.01%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Clients Info -->

      <!-- Clients list -->
      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Client List</h5>
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div class="dropdown me-3">
              <a href="javascript:void(0);"
                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Select Status
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Active</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Inactive</a>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <a href="javascript:void(0);"
                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Recently Added</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Descending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Month</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last 7 Days</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
              <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input v-model="searchQuery"
                    type="search" class="form-control form-control-sm" placeholder="Search"
                    aria-controls="DataTables_Table_0"></label></div>
            </div>
          </div>
          <div class="custom-datatable-filter table-responsive">
            <a-table class="table datatable" :columns="columns" :data-source="paginatedData"
              :row-selection="rowSelection">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'ClientID'">
                  <router-link to="/projects/clients-details">{{
                    record.ClientID
                  }}</router-link>
                </template>
                <template v-if="column.key === 'ClientName'">
                  <div class="d-flex align-items-center file-name-icon">
                    <router-link to="/projects/clients-details" class="avatar avatar-md border avatar-rounded">
                      <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
                    </router-link>
                    <div class="ms-2">
                      <h6 class="fw-medium">
                        <router-link to="/projects/clients-details">{{
                          record.ClientName
                        }}</router-link>
                      </h6>
                      <span class="fs-12 fw-normal">{{ record.Work }}</span>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'Status'">
                  <span :class="record.Class">
                    <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
                  </span>
                </template>
                <template v-if="column.key === 'action'">
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_client"><i
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
                    id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true"
                      role="link" data-dt-idx="previous" tabindex="-1" class="page-link" href="javascript:void(0);"
                      @click.prevent="currentPage > 1 ? currentPage-- : null"><i class="ti ti-chevron-left"></i>
                    </a></li>
                  <li class="paginate_button page-item" :class="{ active: page === currentPage }"
                    v-for="page in totalPages" :key="page">
                    <a href="javascript:void(0);" @click.prevent="currentPage = page" aria-controls="DataTables_Table_0"
                      role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">{{ page }}</a>
                  </li>
                  <li class="paginate_button page-item next" :class="{ disabled: currentPage === totalPages }"
                    id="DataTables_Table_0_next">
                    <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next"
                      tabindex="-1" class="page-link" href="javascript:void(0);"
                      @click.prevent="currentPage < totalPages ? currentPage++ : null"><i
                        class="ti ti-chevron-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Clients list -->
    </div>
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
  <clients-list-modal></clients-list-modal>
</template>
<script>
const columns = [
  {
    title: "Client ID",
    dataIndex: "ClientID",
    key: "ClientID",
    sorter: {
      compare: (a, b) => {
        a = a.ClientID.toLowerCase();
        b = b.ClientID.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Client Name",
    dataIndex: "ClientName",
    key: "ClientName",
    sorter: {
      compare: (a, b) => {
        a = a.ClientName.toLowerCase();
        b = b.ClientName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Company Name",
    dataIndex: "CompanyName",
    sorter: {
      compare: (a, b) => {
        a = a.CompanyName.toLowerCase();
        b = b.CompanyName.toLowerCase();
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
const data = [
  {
    key: "1",
    ClientID: "Cli-001",
    ClientName: "Michael Walker",
    Work: "CEO",
    CompanyName: "BrightWave Innovations",
    Email: "michael@example.com",
    Phone: "(163) 2459 315",
    Image: "user-39.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "2",
    ClientID: "Cli-002",
    ClientName: "Sophie Headrick",
    Work: "Manager",
    CompanyName: "Stellar Dynamics",
    Email: "sophie@example.com",
    Phone: "(146) 1249 296",
    Image: "user-40.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "3",
    ClientID: "Cli-003",
    ClientName: "Cameron Drake",
    Work: "Director",
    CompanyName: "Quantum Nexus",
    Email: "cameron@example.com",
    Phone: "(135) 3489 516",
    Image: "user-41.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "4",
    ClientID: "Cli-004",
    ClientName: "Doris Crowley",
    Work: "Consultant",
    CompanyName: "EcoVision Enterprises",
    Email: "doris@example.com",
    Phone: "(158) 3459 596",
    Image: "user-42.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "5",
    ClientID: "Cli-005",
    ClientName: "Thomas Bordelon",
    Work: "Manager",
    CompanyName: "Aurora Technologies",
    Email: "thomas@example.com",
    Phone: "(196) 4862 196",
    Image: "user-44.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "6",
    ClientID: "Cli-006",
    ClientName: "Kathleen Gutierrez",
    Work: "Director",
    CompanyName: "BlueSky Ventures",
    Email: "kathleen@example.com",
    Phone: "(163) 6498 256",
    Image: "user-45.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "7",
    ClientID: "Cli-007",
    ClientName: "Bruce Wright",
    Work: "CEO",
    CompanyName: "TerraFusion Energy",
    Email: "bruce@example.com",
    Phone: "(154) 6481 075",
    Image: "user-46.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "8",
    ClientID: "Cli-008",
    ClientName: "Estelle Morgan",
    Work: "Manager",
    CompanyName: "UrbanPulse Design",
    Email: "estelle@example.com",
    Phone: "(184) 6348 195",
    Image: "user-47.jpg",
    Status: "Inactive",
    Class: "badge badge-danger d-inline-flex align-items-center badge-xs",
  },
  {
    key: "9",
    ClientID: "Cli-009",
    ClientName: "Stephen Dias",
    Work: "CEO",
    CompanyName: "Nimbus Networks",
    Email: "stephen@example.com",
    Phone: "(175) 2496 125",
    Image: "user-48.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
  },
  {
    key: "10",
    ClientID: "Cli-010",
    ClientName: "Angela Thomas",
    Work: "Consultant",
    CompanyName: "Epicurean Delights",
    Email: "angela@example.com",
    Phone: "(132) 3145 977",
    Image: "user-43.jpg",
    Status: "Active",
    Class: "badge badge-success d-inline-flex align-items-center badge-xs",
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
      title: "Call History",
      text: "Applications",
      text1: "Call History",
      data,
      columns,
      rowSelection,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/users/${imageName}`, import.meta.url).href;
    }
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.ClientID.toLowerCase().includes(query) ||
          record.ClientName.toLowerCase().includes(query) ||
          record.Work.toLowerCase().includes(query) ||
          record.CompanyName.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
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
