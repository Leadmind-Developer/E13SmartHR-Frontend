<script>
const data = [
  {
    key: "1",
    Expense_Name: "Online Course",
    Date: "14 Jan 2024",
    Payment_Method: "Cash",
    Amount: "$3000",
  },
  {
    key: "2",
    Expense_Name: "Employee Benefits",
    Date: "21 Jan 2024",
    Payment_Method: "Cash",
    Amount: "$2500",
  },
  {
    key: "3",
    Expense_Name: "Travel",
    Date: "20 Feb 2024",
    Payment_Method: "Cheque",
    Amount: "$2800",
  },
  {
    key: "4",
    Expense_Name: "Office Supplies",
    Date: "15 Mar 2024",
    Payment_Method: "Cash",
    Amount: "$3300",
  },
  {
    key: "5",
    Expense_Name: "Welcome Kit",
    Date: "12 Apr 2024",
    Payment_Method: "Cheque",
    Amount: "$3600",
  },
  {
    key: "6",
    Expense_Name: "Equipment",
    Date: "20 May 2024",
    Payment_Method: "Cheque",
    Amount: "$2000",
  },
  {
    key: "7",
    Expense_Name: "Miscellaneous",
    Date: "06 Jul 2024",
    Payment_Method: "Cash",
    Amount: "$3400",
  },
  {
    key: "8",
    Expense_Name: "Payroll",
    Date: "02 Sep 2024",
    Payment_Method: "Cheque",
    Amount: "$4000",
  },
  {
    key: "9",
    Expense_Name: "Cafeteria",
    Date: "15 Nov 2024",
    Payment_Method: "Cash",
    Amount: "$4500",
  },
  {
    key: "10",
    Expense_Name: "Cleaning Supplies",
    Date: "10 Dec 2024",
    Payment_Method: "Cheque",
    Amount: "$3800",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Expense Name",
    dataIndex: "Expense_Name",
    key: "Expense_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Expense_Name.toLowerCase();
        b = b.Expense_Name.toLowerCase();
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
    title: "Payment Method",
    dataIndex: "Payment_Method",
    sorter: {
      compare: (a, b) => {
        a = a.Payment_Method.toLowerCase();
        b = b.Payment_Method.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    sorter: {
      compare: (a, b) => {
        a = a.Amount.toLowerCase();
        b = b.Amount.toLowerCase();
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
          record.Expense_Name.toLowerCase().includes(query) ||
          record.Date.toLowerCase().includes(query) ||
          record.Payment_Method.toLowerCase().includes(query) ||
          record.Amount.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Expense_Name'">
            {{ record.Expense_Name }}
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_expenses"><i
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
