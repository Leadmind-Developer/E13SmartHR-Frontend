<script>
const data = [
  {
    key: "1",
    Task_Name: "Patient Appointment Booking",
    Project_Name: "Hospital Administration",
    Created_Date: "14 Jan 2024",
    Due_Date: "15 Jan 2024",
    Priority: "Low",
    Status: "Completed",
  },
  {
    key: "2",
    Task_Name: "Payment Gateway",
    Project_Name: "Educational Platform",
    Created_Date: "21 Jan 2024",
    Due_Date: "25 Jan 2024",
    Priority: "Medium",
    Status: "Inprogress",
  },
  {
    key: "3",
    Task_Name: "Doctor available module",
    Project_Name: "Clinic Management",
    Created_Date: "20 Feb 2024",
    Due_Date: "22 Feb 2024",
    Priority: "High",
    Status: "Completed",
  },
  {
    key: "4",
    Task_Name: "Video Conferencing Module",
    Project_Name: "Chat & Call Mobile App",
    Created_Date: "15 Mar 2024",
    Due_Date: "17 Mar 2024",
    Priority: "Low",
    Status: "On Hold",
  },
  {
    key: "5",
    Task_Name: "Private Chat Module",
    Project_Name: "Travel Planning Website",
    Created_Date: "12 Apr 2024",
    Due_Date: "16 Apr 2024",
    Priority: "High",
    Status: "Completed",
  },
  {
    key: "6",
    Task_Name: "Services List & Grid View",
    Project_Name: "Service Booking Software",
    Created_Date: "20 May 2024",
    Due_Date: "21 May 2024",
    Priority: "Low",
    Status: "Pending",
  },
  {
    key: "7",
    Task_Name: "Car Detail Moodule",
    Project_Name: "Car & Bike Rental Software",
    Created_Date: "06 Jul 2024",
    Due_Date: "06 Jul 2024",
    Priority: "Medium",
    Status: "Inprogress",
  },
  {
    key: "8",
    Task_Name: "Location Module",
    Project_Name: "Food Order App",
    Created_Date: "02 Sep 2024",
    Due_Date: "04 Sep 2024",
    Priority: "Low",
    Status: "Completed",
  },
  {
    key: "9",
    Task_Name: "Hotel List & Grid View",
    Project_Name: "Hotel Booking App",
    Created_Date: "15 Nov 2024",
    Due_Date: "15 Nov 2024",
    Priority: "Medium",
    Status: "Completed",
  },
  {
    key: "10",
    Task_Name: "Warehouse Module",
    Project_Name: "POS Admin Software",
    Created_Date: "10 Dec 2024",
    Due_Date: "11 Dec 2024",
    Priority: "Low",
    Status: "Pending",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Task Name",
    dataIndex: "Task_Name",
    key: "Task_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Task_Name.toLowerCase();
        b = b.Task_Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Project Name",
    dataIndex: "Project_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Project_Name.toLowerCase();
        b = b.Project_Name.toLowerCase();
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
    title: "Due Date",
    dataIndex: "Due_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Due_Date.toLowerCase();
        b = b.Due_Date.toLowerCase();
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
          record.Task_Name.toLowerCase().includes(query) ||
          record.Project_Name.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query) ||
          record.Due_Date.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Task_Name'">
            <div class="d-flex align-items-center file-name-icon">
              <h6 class="fw-medium">
                <a href="javascript:void(0);">{{ record.Task_Name }}</a>
              </h6>
            </div>
          </template>
          <template v-if="column.key === 'Priority'">
            <span class="badge" :class="[
              record.Priority === 'Low'
                ? 'badge-success-transparent'
                : record.Priority === 'Medium'
                  ? 'badge-warning-transparent'
                  : 'badge-danger-transparent',
            ]"><i class="ti ti-point-filled me-1"></i>{{ record.Priority }}</span>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="d-inline-flex align-items-center badge-xs" :class="[
              'badge',
              record.Status === 'Completed'
                ? 'badge-success'
                : record.Status === 'Inprogress'
                  ? 'badge-purple'
                  : record.Status === 'On Hold'
                    ? 'badge-warning'
                    : 'badge-skyblue',
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
