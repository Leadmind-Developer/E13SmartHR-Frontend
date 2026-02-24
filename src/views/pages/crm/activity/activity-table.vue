<script>
const data = [
  {
    key : "1",
    Title: "We scheduled a meeting for next week",
    Activity_Type: "Meeting",
    Due_Date: "16 Jan 2024",
    Owner: "Hendry",
    Created_Date: "14 Jan 2024",
  },
  {
    key : "2",
    Title: "Had conversation with Fred regarding task",
    Activity_Type: "Calls",
    Due_Date: "24 Jan 2024",
    Owner: "Guilory",
    Created_Date: "21 Jan 2024",
  },
  {
    key : "3",
    Title: "Analysing latest time estimation for new project",
    Activity_Type: "Tasks",
    Due_Date: "23 Feb 2024",
    Owner: "Jami",
    Created_Date: "20 Feb 2024",
  },
  {
    key : "4",
    Title: "Store and manage contact data",
    Activity_Type: "Email",
    Due_Date: "18 Mar 2024",
    Owner: "Theresa",
    Created_Date: "15 Mar 2024",
  },
  {
    key : "5",
    Title: "Call John and discuss about project",
    Activity_Type: "Calls",
    Due_Date: "14 Apr 2024",
    Owner: "Smith",
    Created_Date: "12 Apr 2024",
  },
  {
    key : "6",
    Title: "Will have a meeting before project start",
    Activity_Type: "Meeting",
    Due_Date: "22 May 2024",
    Owner: "Martin",
    Created_Date: "20 May 2024",
  },
  {
    key : "7",
    Title: "Will have a meeting before project start",
    Activity_Type: "Meeting",
    Due_Date: "22 May 2024",
    Owner: "Martin",
    Created_Date: "20 May 2024",
  },
  {
    key : "8",
    Title: "Built landing pages",
    Activity_Type: "Email",
    Due_Date: "08 Jul 2024",
    Owner: "Newell",
    Created_Date: "06 Jul 2024",
  },
  {
    key : "9",
    Title: "Discussed budget proposal with Edwin",
    Activity_Type: "Calls",
    Due_Date: "05 Sep 2024",
    Owner: "Janet",
    Created_Date: "02 Sep 2024",
  },
  {
    key : "10",
    Title: "Attach final proposal for upcoming project",
    Activity_Type: "Tasks",
    Due_Date: "18 Nov 2024",
    Owner: "Craig",
    Created_Date: "15 Nov 2024",
  },
  {
    key : "11",
    Title: "Regarding latest updates in project",
    Activity_Type: "Meeting",
    Due_Date: "12 Dec 2024",
    Owner: "Daniel",
    Created_Date: "10 Dec 2024",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "Title",
    sorter: {
      compare: (a, b) => {
        a = a.Title.toLowerCase();
        b = b.Title.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Activity Type",
    dataIndex: "Activity_Type",
    key: "Activity_Type",
    sorter: {
      compare: (a, b) => {
        a = a.Activity_Type.toLowerCase();
        b = b.Activity_Type.toLowerCase();
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
    title: "Owner",
    dataIndex: "Owner",
    sorter: {
      compare: (a, b) => {
        a = a.Owner.toLowerCase();
        b = b.Owner.toLowerCase();
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
          record.Title.toLowerCase().includes(query) ||
          record.Activity_Type.toLowerCase().includes(query) ||
          record.Due_Date.toLowerCase().includes(query) ||
          record.Owner.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Title'">
            <p class="fs-14 text-dark fw-medium">{{ record.Title }}</p>
          </template>
          <template v-if="column.key === 'Activity_Type'">
            <span class="badge badge-pink-transparent" :class="[
              'badge',
              record.Activity_Type === 'Meeting'
                ? 'badge-pink-transparent'
                : record.Activity_Type === 'Calls'
                  ? 'badge-purple-transparent'
                  : record.Activity_Type === 'Tasks'
                    ? 'badge-info-transparent'
                    : 'badge-warning-transparent',
            ]">
              <i class="ti ti-device-computer-camera me-1" :class="[
                'ti',
                record.Activity_Type === 'Meeting'
                  ? 'ti-device-computer-camera'
                  : record.Activity_Type === 'Calls'
                    ? 'ti-phone'
                    : record.Activity_Type === 'Tasks'
                      ? 'ti-subtask'
                      : 'ti-mail',
                'me-1',
              ]"></i>
              {{ record.Activity_Type }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_activity"><i
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
