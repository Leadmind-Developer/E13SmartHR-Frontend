<script>
const data = [
  {
    key: "1",
    Date: "14 Jan 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "06:45 PM",
    Break: "30 Min",
    Late: "32 Min",
    Overtime: "20 Min",
    Production_Hours: "8.55 Hrs",
  },
  {
    key: "2",
    Date: "21 Jan 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "06:12 PM",
    Break: "20 Min",
    Late: "-",
    Overtime: "45 Min",
    Production_Hours: "7.54 Hrs",
  },
  {
    key: "3",
    Date: "20 Feb 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "06:13 PM",
    Break: "50 Min",
    Late: "-",
    Overtime: "33 Min",
    Production_Hours: "8.45 Hrs",
  },
  {
    key: "4",
    Date: "15 Mar 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "06:23 PM",
    Break: "41 Min",
    Late: "-",
    Overtime: "50 Min",
    Production_Hours: "8.35 Hrs",
  },
  {
    key: "5",
    Date: "12 Apr 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "06:43 PM",
    Break: "23 Min",
    Late: "-",
    Overtime: "10 Min",
    Production_Hours: "8.22 Hrs",
  },
  {
    key: "6",
    Date: "20 May 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "07:15 PM",
    Break: "03 Min",
    Late: "-",
    Overtime: "-",
    Production_Hours: "8.32 Hrs",
  },
  {
    key: "7",
    Date: "06 Jul 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "07:13 PM",
    Break: "32 Min",
    Late: "-",
    Overtime: "-",
    Production_Hours: "9.15 Hrs",
  },
  {
    key: "8",
    Date: "02 Sep 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "09:17 PM",
    Break: "14 Min",
    Late: "12 Min",
    Overtime: "-",
    Production_Hours: "8.35Hrs",
  },
  {
    key: "9",
    Date: "10 Dec 2024",
    Check_In: "-",
    Status: "Absent",
    Check_Out: "-",
    Break: "-",
    Late: "-",
    Overtime: "-",
    Production_Hours: "0.00 Hrs",
  },
  {
    key: "10",
    Date: "15 Nov 2024",
    Check_In: "09:00 AM",
    Status: "Present",
    Check_Out: "08:15 PM",
    Break: "12 Min",
    Late: "-",
    Overtime: "-",
    Production_Hours: "8.35Hrs",
  },
];

const columns = [
  {
    sorter: false,
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
    title: "Check In",
    dataIndex: "Check_In",
    sorter: {
      compare: (a, b) => {
        a = a.Check_In.toLowerCase();
        b = b.Check_In.toLowerCase();
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
    title: "Check Out",
    dataIndex: "Check_Out",
    sorter: {
      compare: (a, b) => {
        a = a.Check_Out.toLowerCase();
        b = b.Check_Out.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Break",
    dataIndex: "Break",
    sorter: {
      compare: (a, b) => {
        a = a.Break.toLowerCase();
        b = b.Break.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Late",
    dataIndex: "Late",
    sorter: {
      compare: (a, b) => {
        a = a.Late.toLowerCase();
        b = b.Late.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Overtime",
    dataIndex: "Overtime",
    sorter: {
      compare: (a, b) => {
        a = a.Overtime.toLowerCase();
        b = b.Overtime.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Production Hours",
    dataIndex: "Production_Hours",
    key: "Production_Hours",
    sorter: {
      compare: (a, b) => {
        a = a.Production_Hours.toLowerCase();
        b = b.Production_Hours.toLowerCase();
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
          record.Date.toLowerCase().includes(query) ||
          record.Check_In.toLowerCase().includes(query) ||
          record.Status.toLowerCase().includes(query) ||
          record.Check_Out.toLowerCase().includes(query) ||
          record.Break.toLowerCase().includes(query) ||
          record.Late.toLowerCase().includes(query) ||
          record.Overtime.toLowerCase().includes(query) ||
          record.Production_Hours.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Status'">
            <span class="d-inline-flex align-items-center" :class="[
              'badge',
              record.Status === 'Present'
                ? 'badge-success-transparent'
                : 'badge-danger-transparent',
            ]">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-if="column.key === 'Production_Hours'">
            <span class="d-inline-flex align-items-center" :class="[
              'badge',
              record.Production_Hours === '9.15 Hrs'
                ? 'badge-info'
                : record.Production_Hours === '7.54 Hrs' || record.Production_Hours === '0.00 Hrs'
                  ? 'badge-danger'
                  : 'badge-success',
            ]">
              <i class="ti ti-clock-hour-11 me-1"></i>{{ record.Production_Hours }}
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
