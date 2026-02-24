<script>
const data = [
  {
    key: "1",
    Client_Name: "Michael Walker",
    Image: "user-09.jpg",
    Roll: "CEO",
    Company_Name: "BrightWave Innovations",
    Estimate_Date: "14 Jan 2024",
    Expiry_Date: "15 Jan 2024",
    Amount: "$3000",
    Status: "Accepted",
  },
  {
    key: "2",
    Client_Name: "Sophie Headrick",
    Image: "user-40.jpg",
    Roll: "Manager",
    Company_Name: "Stellar Dynamics",
    Estimate_Date: "21 Jan 2024",
    Expiry_Date: "25 Jan 2024",
    Amount: "$2500",
    Status: "Sent",
  },
  {
    key: "3",
    Client_Name: "Cameron Drake",
    Image: "user-41.jpg",
    Roll: "Director",
    Company_Name: "Quantum Nexus",
    Estimate_Date: "20 Feb 2024",
    Expiry_Date: "22 Feb 2024",
    Amount: "$2800",
    Status: "Expired",
  },
  {
    key: "4",
    Client_Name: "Doris Crowley",
    Image: "user-42.jpg",
    Roll: "Consultant",
    Company_Name: "EcoVision Enterprises",
    Estimate_Date: "15 Mar 2024",
    Expiry_Date: "17 Mar 2024",
    Amount: "$3300",
    Status: "Accepted",
  },
  {
    key: "5",
    Client_Name: "Thomas Bordelon",
    Image: "user-44.jpg",
    Roll: "Manager",
    Company_Name: "Aurora Technologies",
    Estimate_Date: "12 Apr 2024",
    Expiry_Date: "16 Apr 2024",
    Amount: "$3600",
    Status: "Declined",
  },
  {
    key: "6",
    Client_Name: "Kathleen Gutierrez",
    Image: "user-45.jpg",
    Roll: "Director",
    Company_Name: "BlueSky Ventures",
    Estimate_Date: "20 May 2024",
    Expiry_Date: "21 May 2024",
    Amount: "$2000",
    Status: "Sent",
  },
  {
    key: "7",
    Client_Name: "Bruce Wright",
    Image: "user-46.jpg",
    Roll: "CEO",
    Company_Name: "TerraFusion Energy",
    Estimate_Date: "06 Jul 2024",
    Expiry_Date: "06 Jul 2024",
    Amount: "$3400",
    Status: "Expired",
  },
  {
    key: "8",
    Client_Name: "Estelle Morgan",
    Image: "user-47.jpg",
    Roll: "Manager",
    Company_Name: "UrbanPulse Design",
    Estimate_Date: "02 Sep 2024",
    Expiry_Date: "04 Sep 2024",
    Amount: "$4000",
    Status: "Declined",
  },
  {
    key: "9",
    Client_Name: "Stephen Dias",
    Image: "user-48.jpg",
    Roll: "CEO",
    Company_Name: "Nimbus Networks",
    Estimate_Date: "15 Nov 2024",
    Expiry_Date: "15 Nov 2024",
    Amount: "$4500",
    Status: "Accepted",
  },
  {
    key: "10",
    Client_Name: "Angela Thomas",
    Image: "user-43.jpg",
    Roll: "Consultant",
    Company_Name: "Epicurean Delights",
    Estimate_Date: "10 Dec 2024",
    Expiry_Date: "11 Dec 2024",
    Amount: "$3800",
    Status: "Sent",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Client Name",
    dataIndex: "Client_Name",
    key: "Client_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Client_Name.toLowerCase();
        b = b.Client_Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Company Name",
    dataIndex: "Company_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Company_Name.toLowerCase();
        b = b.Company_Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Estimate Date",
    dataIndex: "Estimate_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Estimate_Date.toLowerCase();
        b = b.Estimate_Date.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Expiry Date",
    dataIndex: "Expiry_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Expiry_Date.toLowerCase();
        b = b.Expiry_Date.toLowerCase();
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
          record.Client_Name.toLowerCase().includes(query) ||
          record.Roll.toLowerCase().includes(query) ||
          record.Company_Name.toLowerCase().includes(query) ||
          record.Estimate_Date.toLowerCase().includes(query) ||
          record.Expiry_Date.toLowerCase().includes(query) ||
          record.Amount.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Client_Name'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Client_Name }}</a>
                </h6>
                <span class="d-block mt-1">{{ record.Roll }}</span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="badge" :class="[
              record.Status === 'Accepted'
                ? 'badge-soft-success'
                : record.Status === 'Sent'
                  ? 'badge-soft-purple'
                  : record.Status === 'Expired'
                    ? 'badge-soft-warning'
                    : 'badge-soft-danger',
            ]">{{ record.Status }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_estimate"><i
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
