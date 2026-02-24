<script>
const data = [
  {
    "key": "1",
    "Questions": "What is an HRMS?",
    "Answers": "Software system that automates and manages various human resources tasks",
    "Categories": "General"
  },
  {
    "key": "2",
    "Questions": "How does an HRMS benefit organizations?",
    "Answers": "It enhances operational efficiency, reduces manual errors, and centralizes HR tasks",
    "Categories": "General"
  },
  {
    "key": "3",
    "Questions": "Is the data stored in an SmartHR secure?",
    "Answers": "Yes, SmartHR is design with advanced security measures, including data encryption",
    "Categories": "Feature"
  },
  {
    "key": "4",
    "Questions": "How do I add a new employee to the HRMS?",
    "Answers": "Add new employees by  entering their personal details & setting up their profiles.",
    "Categories": "Employee"
  },
  {
    "key": "5",
    "Questions": "How do I generate custom reports in the SmartHR?",
    "Answers": "Custom reports can be generated using the reporting module within the HRMS",
    "Categories": "Reports"
  },
  {
    "key": "6",
    "Questions": "How do I schedule training sessions in the HRMS?",
    "Answers": "Creating training events, setting dates and times, and enrolling employees",
    "Categories": "Leaves"
  },
  {
    "key": "7",
    "Questions": "How do I process payroll in the SmartHR?",
    "Answers": "Reviewing employee hours and deductions and executing payments.",
    "Categories": "Payroll"
  },
  {
    "key": "8",
    "Questions": "How do I export reports from the HRMS?",
    "Answers": "Export reports by selecting the desired report format and using the export function",
    "Categories": "Reports"
  },
  {
    "key": "9",
    "Questions": "Can I track employee attendance and absences?",
    "Answers": "Yes, track attendance and absences by using the attendance management",
    "Categories": "Employee"
  },
  {
    "key": "10",
    "Questions": "Can I track employee attendance and absences?",
    "Answers": "Yes, track attendance and absences by using the attendance management",
    "Categories": "Employee"
  },
  {
    "key": "11",
    "Questions": "How can I assign a ticket to a specific team member?",
    "Answers": "Assign a ticket by selecting the ticket from the queue, choosing the team member",
    "Categories": "Tickets"
  }
]

const columns = [
  {
    sorter: false,
  },
  {
    title: "Questions",
    dataIndex: "Questions",
    key: "Questions",
    sorter: {
      compare: (a, b) => {
        a = a.Questions.toLowerCase();
        b = b.Questions.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Answers",
    dataIndex: "Answers",
    sorter: {
      compare: (a, b) => {
        a = a.Answers.toLowerCase();
        b = b.Answers.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Categories",
    dataIndex: "Categories",
    sorter: {
      compare: (a, b) => {
        a = a.Categories.toLowerCase();
        b = b.Categories.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "",
    key: "action",
    sorter: true
  },
]

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
    }
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Questions.toLowerCase().includes(query) ||
          record.Answers.toLowerCase().includes(query) ||
          record.Categories.toLowerCase().includes(query)
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
}
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
          <template v-if="column.key === 'Questions'">
            <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Questions }}</a></h6>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#edit_faq" class="me-2"><i
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