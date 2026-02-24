<script>
const data = [
  {
    key: "1",
    Image: "company-01.svg",
    Name: "BrightWave Innovations",
    Domain_URL: "bwi.example.com",
    Plan: "Advanced (Monthly)",
    Created_Date: "12 Sep 2024",
    Status: "Approved",
    Data_Target: "#domain_approved",
  },
  {
    key: "2",
    Image: "company-02.svg",
    Name: "Stellar Dynamics",
    Domain_URL: "sd.example.com",
    Plan: "Basic (Yearly)",
    Created_Date: "24 Oct 2024",
    Status: "Pending",
    Data_Target: "#domain_pending",
  },
  {
    key: "3",
    Image: "company-03.svg",
    Name: "Quantum Nexus",
    Domain_URL: "qn.example.com",
    Plan: "Advanced (Monthly)",
    Created_Date: "18 Feb 2024",
    Status: "Rejected",
    Data_Target: "#domain_rejected",
  },
  {
    key: "4",
    Image: "company-04.svg",
    Name: "EcoVision Enterprises",
    Domain_URL: "eve.example.com",
    Plan: "Advanced (Monthly)",
    Created_Date: "17 Sep 2024",
    Status: "Approved",
    Data_Target: "#domain_approved",
  },
  {
    key: "5",
    Image: "company-05.svg",
    Name: "Aurora Technologies",
    Domain_URL: "at.example.com",
    Plan: "Enterprise (Monthly)",
    Created_Date: "20 Jul 2024",
    Status: "Approved",
    Data_Target: "#domain_approved",
  },
  {
    key: "6",
    Image: "company-06.svg",
    Name: "BlueSky Ventures",
    Domain_URL: "bsv.example.com",
    Plan: "Advanced (Monthly)",
    Created_Date: "10 Apr 2024",
    Status: "Pending",
    Data_Target: "#domain_pending",
  },
  {
    key: "7",
    Image: "company-07.svg",
    Name: "TerraFusion Energy",
    Domain_URL: "tfe.example.com",
    Plan: "Enterprise (Yearly)",
    Created_Date: "29 Aug 2024",
    Status: "Approved",
    Data_Target: "#domain_approved",
  },
  {
    key: "8",
    Image: "company-08.svg",
    Name: "UrbanPulse Design",
    Domain_URL: "upd.example.com",
    Plan: "Basic (Monthly)",
    Created_Date: "22 Feb 2024",
    Status: "Rejected",
    Data_Target: "#domain_rejected",
  },
  {
    key: "9",
    Image: "company-09.svg",
    Name: "Nimbus Networks",
    Domain_URL: "nn.example.com",
    Plan: "Basic (Yearly)",
    Created_Date: "03 Nov 2024",
    Status: "Approved",
    Data_Target: "#domain_approved",
  },
  {
    key: "10",
    Image: "company-10.svg",
    Name: "Epicurean Delights",
    Domain_URL: "ed.example.com",
    Plan: "Advanced (Monthly)",
    Created_Date: "17 Dec 2024",
    Status: "Approved",
    Data_Target: "#domain_approved",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    sorter: {
      compare: (a, b) => {
        a = a.Name.toLowerCase();
        b = b.Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Domain URL",
    dataIndex: "Domain_URL",
    sorter: {
      compare: (a, b) => {
        a = a.Domain_URL.toLowerCase();
        b = b.Domain_URL.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Plan",
    dataIndex: "Plan",
    sorter: {
      compare: (a, b) => {
        a = a.Plan.toLowerCase();
        b = b.Plan.toLowerCase();
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
  methods: {
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/company/${imageName}`, import.meta.url).href;
    }
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Name.toLowerCase().includes(query) ||
          record.Domain_URL.toLowerCase().includes(query) ||
          record.Plan.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query) ||
          record.Status.toLowerCase().includes(query) ||
          record.Data_Target.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Name'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border rounded-circle">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Name }}</a>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <a href="javascript:void(0);" :class="[
              'badge',
              record.Status === 'Approved'
                ? 'badge-soft-success'
                : record.Status === 'Pending'
                  ? 'badge-soft-skyblue'
                  : 'badge-soft-danger',
              'd-inline-flex',
              'align-items-center',
              'badge-xs',
            ]">
              <i :class="[
                'ti',
                record.Status === 'Approved'
                  ? 'ti-checks'
                  : record.Status === 'Pending'
                    ? 'ti-clock'
                    : 'ti-x',
                'me-1',
              ]"></i>
              {{ record.Status }}
            </a>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" :data-bs-target="record.Data_Target"><i
                  class="ti ti-eye"></i></a>
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
