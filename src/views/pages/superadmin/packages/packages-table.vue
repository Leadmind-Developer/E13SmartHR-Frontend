<script>
const data = [
  {
    Plan_Name: "Basic",
    Plan_Type: "Monthly",
    Total_Subscribers: "56",
    Price: "$50",
    Created_Date: "14 Jan 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Advanced",
    Plan_Type: "Monthly",
    Total_Subscribers: "99",
    Price: "$200",
    Created_Date: "21 Jan 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Premium",
    Plan_Type: "Monthly",
    Total_Subscribers: "58",
    Price: "$300",
    Created_Date: "10 Feb 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Enterprise",
    Plan_Type: "Monthly",
    Total_Subscribers: "67",
    Price: "$400",
    Created_Date: "18 Feb 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Basic",
    Plan_Type: "Yearly",
    Total_Subscribers: "78",
    Price: "$600",
    Created_Date: "15 Mar 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Advanced",
    Plan_Type: "Yearly",
    Total_Subscribers: "99",
    Price: "$2400",
    Created_Date: "26 Mar 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Premium",
    Plan_Type: "Yearly",
    Total_Subscribers: "48",
    Price: "$3600",
    Created_Date: "05 Apr 2024",
    Status: "Active",
  },
  {
    Plan_Name: "Enterprise",
    Plan_Type: "Yearly",
    Total_Subscribers: "17",
    Price: "$4800",
    Created_Date: "16 Apr 2024",
    Status: "Active",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Plan Name",
    dataIndex: "Plan_Name",
    key: "Plan_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Plan_Name.toLowerCase();
        b = b.Plan_Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Plan Type",
    dataIndex: "Plan_Type",
    sorter: {
      compare: (a, b) => {
        a = a.Plan_Type.toLowerCase();
        b = b.Plan_Type.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Total Subscribers",
    dataIndex: "Total_Subscribers",
    sorter: {
      compare: (a, b) => {
        a = a.Total_Subscribers.toLowerCase();
        b = b.Total_Subscribers.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Price",
    dataIndex: "Price",
    sorter: {
      compare: (a, b) => {
        a = a.Price.toLowerCase();
        b = b.Price.toLowerCase();
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
          record.Plan_Name.toLowerCase().includes(query) ||
          record.Plan_Type.toLowerCase().includes(query) ||
          record.Total_Subscribers.toLowerCase().includes(query) ||
          record.Price.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Plan_Name'">
            <h6 class="fw-medium">
              <a href="javascript:void(0);">{{ record.Plan_Name }}</a>
            </h6>
          </template>
          <template v-else-if="column.key === 'Status'">
            <span class="badge badge-success d-inline-flex align-items-center badge-sm">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_plans"><i
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
