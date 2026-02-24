<script>
const data = [
  {
    key: "1",
    Pipeline_Name: "Sales",
    Total_Deal_Value: "$4,50,000",
    No_of_Deals: "315",
    Stages: "Won",
    Created_Date: "14 Jan 2024",
    Status: "Active",
  },
  {
    key: "2",
    Pipeline_Name: "Marketing",
    Total_Deal_Value: "$3,15,000",
    No_of_Deals: "447",
    Stages: "In Pipeline",
    Created_Date: "21 Jan 2024",
    Status: "Active",
  },
  {
    key: "3",
    Pipeline_Name: "Calls",
    Total_Deal_Value: "$8,40,000",
    No_of_Deals: "654",
    Stages: "Won",
    Created_Date: "20 Feb 2024",
    Status: "Active",
  },
  {
    key: "4",
    Pipeline_Name: "Email",
    Total_Deal_Value: "$6,10,000",
    No_of_Deals: "545",
    Stages: "Conversation",
    Created_Date: "15 Mar 2024",
    Status: "Active",
  },
  {
    key: "5",
    Pipeline_Name: "Chats",
    Total_Deal_Value: "$4,70,000",
    No_of_Deals: "787",
    Stages: "Won",
    Created_Date: "12 Apr 2024",
    Status: "Active",
  },
  {
    key: "6",
    Pipeline_Name: "Operational",
    Total_Deal_Value: "$5,50,000",
    No_of_Deals: "787",
    Stages: "Follow Up",
    Created_Date: "20 May 2024",
    Status: "Active",
  },
  {
    key: "7",
    Pipeline_Name: "Collabrative",
    Total_Deal_Value: "$5,00,000",
    No_of_Deals: "315",
    Stages: "Won",
    Created_Date: "06 Jul 2024",
    Status: "Inactive",
  },
  {
    key: "8",
    Pipeline_Name: "Differentiate",
    Total_Deal_Value: "$4,50,000",
    No_of_Deals: "478",
    Stages: "Schedule servise",
    Created_Date: "02 Sep 2024",
    Status: "Active",
  },
  {
    key: "9",
    Pipeline_Name: "Interact",
    Total_Deal_Value: "$6,20,000",
    No_of_Deals: "664",
    Stages: "Won",
    Created_Date: "15 Nov 2024",
    Status: "Active",
  },
  {
    key: "10",
    Pipeline_Name: "Identify",
    Total_Deal_Value: "$7,40,000",
    No_of_Deals: "128",
    Stages: "Lost",
    Created_Date: "10 Dec 2024",
    Status: "Active",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Pipeline Name",
    dataIndex: "Pipeline_Name",
    key: "Pipeline_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Pipeline_Name.toLowerCase();
        b = b.Pipeline_Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Total Deal Value",
    dataIndex: "Total_Deal_Value",
    sorter: {
      compare: (a, b) => {
        a = a.Total_Deal_Value.toLowerCase();
        b = b.Total_Deal_Value.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "No of Deals",
    dataIndex: "No_of_Deals",
    sorter: {
      compare: (a, b) => {
        a = a.No_of_Deals.toLowerCase();
        b = b.No_of_Deals.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Stages",
    dataIndex: "Stages",
    key: "Stages",
    sorter: {
      compare: (a, b) => {
        a = a.Stages.toLowerCase();
        b = b.Stages.toLowerCase();
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
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Pipeline_Name.toLowerCase().includes(query) ||
          record.Total_Deal_Value.toLowerCase().includes(query) ||
          record.No_of_Deals.toLowerCase().includes(query) ||
          record.Stages.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Pipeline_Name'">
            <h6 class="fs-14 fw-medium">{{ record.Pipeline_Name }}</h6>
          </template>
          <template v-if="column.key === 'Stages'">
            <div class="d-flex align-items-center">
              <div class="progress me-2" role="progressbar" aria-label="Basic example" aria-valuenow="0"
                aria-valuemin="0" aria-valuemax="100" style="height: 5px; min-width: 80px">
                <div :class="[
                  'progress-bar',
                  record.Stages === 'Won'
                    ? 'bg-success'
                    : record.Stages === 'In Pipeline'
                      ? 'bg-purple'
                      : record.Stages === 'Conversation'
                        ? 'bg-skyblue'
                        : record.Stages === 'Follow Up'
                          ? 'bg-warning'
                          : record.Stages === 'Schedule servise'
                            ? 'bg-pink'
                            : 'bg-danger',
                ]" style="width: 100%"></div>
              </div>
              <span class="fs-14 fw-normal">{{ record.Stages }}</span>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span :class="[
              'badge',
              record.Status === 'Active' ? 'badge-success' : 'badge-danger',
              'd-inline-flex',
              'align-items-center',
              'badge-xs',
            ]">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_pipeline"><i
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
