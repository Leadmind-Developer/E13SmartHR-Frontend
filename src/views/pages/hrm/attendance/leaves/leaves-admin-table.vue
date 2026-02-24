<script>
const data = [
  {
    key: "1",
    Image: "user-32.jpg",
    Employee: "Anthony Lewis",
    Roll: "Finance",
    Leave_Type: "Medical Leave",
    From: "14 Jan 2024",
    To: "15 Jan 2024",
    No_of_Days: "2 Days",
  },
  {
    key: "2",
    Image: "user-09.jpg",
    Employee: "Brian Villalobos",
    Roll: "Developer",
    Leave_Type: "Casual Leave",
    From: "21 Jan 2024",
    To: "25 Jan 2024",
    No_of_Days: "5 Days",
  },
  {
    key: "3",
    Image: "user-01.jpg",
    Employee: "Harvey Smith",
    Roll: "Developer",
    Leave_Type: "Medical Leave",
    From: "20 Feb 2024",
    To: "22 Feb 2024",
    No_of_Days: "3 Days",
  },
  {
    key: "4",
    Image: "user-33.jpg",
    Employee: "Stephan Peralt",
    Roll: "Executive Officer",
    Leave_Type: "Annual Leave",
    From: "15 Mar 2024",
    To: "17 Mar 2024",
    No_of_Days: "3 Days",
  },
  {
    key: "5",
    Image: "user-34.jpg",
    Employee: "Doglas Martini",
    Roll: "Manager",
    Leave_Type: "Casual Leave",
    From: "12 Apr 2024",
    To: "16 Apr 2024",
    No_of_Days: "5 Days",
  },
  {
    key: "6",
    Image: "user-02.jpg",
    Employee: "Linda Ray",
    Roll: "Finance",
    Leave_Type: "Medical Leave",
    From: "20 May 2024",
    To: "21 May 2024",
    No_of_Days: "2 Days",
  },
  {
    key: "7",
    Image: "user-35.jpg",
    Employee: "Elliot Murray",
    Roll: "Developer",
    Leave_Type: "Casual Leave",
    From: "06 Jul 2024",
    To: "06 Jul 2024",
    No_of_Days: "1 Day",
  },
  {
    key: "8",
    Image: "user-36.jpg",
    Employee: "Rebecca Smtih",
    Roll: "Executive",
    Leave_Type: "Medical Leave",
    From: "02 Sep 2024",
    To: "04 Sep 2024",
    No_of_Days: "3 Days",
  },
  {
    key: "9",
    Image: "user-37.jpg",
    Employee: "Connie Waters",
    Roll: "Developer",
    Leave_Type: "Annual Leave",
    From: "15 Nov 2024",
    To: "15 Nov 2024",
    No_of_Days: "1 Day",
  },
  {
    key: "10",
    Image: "user-38.jpg",
    Employee: "Lori Broaddus",
    Roll: "Finance",
    Leave_Type: "Casual Leave",
    From: "10 Dec 2024",
    To: "11 Dec 2024",
    No_of_Days: "2 Days",
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
    title: "Leave Type",
    dataIndex: "Leave_Type",
    key: "Leave_Type",
    sorter: {
      compare: (a, b) => {
        a = a.Leave_Type.toLowerCase();
        b = b.Leave_Type.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "From",
    dataIndex: "From",
    sorter: {
      compare: (a, b) => {
        a = a.From.toLowerCase();
        b = b.From.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "To",
    dataIndex: "To",
    sorter: {
      compare: (a, b) => {
        a = a.To.toLowerCase();
        b = b.To.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "No of Days",
    dataIndex: "No_of_Days",
    sorter: {
      compare: (a, b) => {
        a = a.No_of_Days.toLowerCase();
        b = b.No_of_Days.toLowerCase();
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
          record.Employee.toLowerCase().includes(query) ||
          record.Roll.toLowerCase().includes(query) ||
          record.Leave_Type.toLowerCase().includes(query) ||
          record.From.toLowerCase().includes(query) ||
          record.To.toLowerCase().includes(query) ||
          record.No_of_Days.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Leave_Type'">
            <div class="d-flex align-items-center">
              <p class="fs-14 fw-medium d-flex align-items-center mb-0">
                {{ record.Leave_Type }}
              </p>
              <a href="javascript:void(0);" class="ms-2" data-bs-toggle="tooltip" data-bs-placement="right"
                data-bs-title="I am currently experiencing a fever and design & Development">
                <i class="ti ti-info-circle text-info"></i>
              </a>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_leaves"><i
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
