<script>
const data = [
  {
    "key": "1",
    "InvoiceID": "Inv-001",
    "Image": "user-09.jpg",
    "ClientName": "Michael Walker",
    "ClientRole": "CEO",
    "CompanyName": "BrightWave Innovations",
    "EstimateDate": "14 Jan 2024",
    "ExpiryDate": "15 Jan 2024",
    "Amount": "$3000",
    "Status": "Sent",
  },
  {
    "key": "2",
    "InvoiceID": "Inv-002",
    "Image": "user-40.jpg",
    "ClientName": "Sophie Headrick",
    "ClientRole": "Manager",
    "CompanyName": "Stellar Dynamics",
    "EstimateDate": "21 Jan 2024",
    "ExpiryDate": "25 Jan 2024",
    "Amount": "$2500",
    "Status": "Sent",
  },
  {
    "key": "3",
    "InvoiceID": "Inv-003",
    "Image": "user-41.jpg",
    "ClientName": "Cameron Drake",
    "ClientRole": "Director",
    "CompanyName": "Quantum Nexus",
    "EstimateDate": "20 Feb 2024",
    "ExpiryDate": "22 Feb 2024",
    "Amount": "$2800",
    "Status": "Expired",
  },
  {
    "key": "4",
    "InvoiceID": "Inv-004",
    "Image": "user-42.jpg",
    "ClientName": "Doris Crowley",
    "ClientRole": "Consultant",
    "CompanyName": "EcoVision Enterprises",
    "EstimateDate": "15 Mar 2024",
    "ExpiryDate": "17 Mar 2024",
    "Amount": "$3300",
    "Status": "Accepted",
  },
  {
    "key": "5",
    "InvoiceID": "Inv-005",
    "Image": "user-44.jpg",
    "ClientName": "Thomas Bordelon",
    "ClientRole": "Manager",
    "CompanyName": "Aurora Technologies",
    "EstimateDate": "12 Apr 2024",
    "ExpiryDate": "16 Apr 2024",
    "Amount": "$3600",
    "Status": "Declined",
  },
  {
    "key": "6",
    "InvoiceID": "Inv-006",
    "Image": "user-45.jpg",
    "ClientName": "Kathleen Gutierrez",
    "ClientRole": "Director",
    "CompanyName": "BlueSky Ventures",
    "EstimateDate": "20 Apr 2024",
    "ExpiryDate": "21 Apr 2024",
    "Amount": "$2000",
    "Status": "Sent",
  },
  {
    "key": "7",
    "InvoiceID": "Inv-007",
    "Image": "user-46.jpg",
    "ClientName": "Bruce Wright",
    "ClientRole": "CEO",
    "CompanyName": "TerraFusion Energy",
    "EstimateDate": "06 Jul 2024",
    "ExpiryDate": "06 Jul 2024",
    "Amount": "$3400",
    "Status": "Expired",
  },
  {
    "key": "8",
    "InvoiceID": "Inv-008",
    "Image": "user-47.jpg",
    "ClientName": "Estelle Morgan",
    "ClientRole": "Manager",
    "CompanyName": "UrbanPulse Design",
    "EstimateDate": "02 Sep 2024",
    "ExpiryDate": "04 Sep 2024",
    "Amount": "$4000",
    "Status": "Declined",
  },
  {
    "key": "9",
    "InvoiceID": "Inv-009",
    "Image": "user-48.jpg",
    "ClientName": "Stephen Dias",
    "ClientRole": "CEO",
    "CompanyName": "Nimbus Networks",
    "EstimateDate": "15 Nov 2024",
    "ExpiryDate": "15 Nov 2024",
    "Amount": "$4500",
    "Status": "Accepted",
  },
  {
    "key": "10",
    "InvoiceID": "Inv-010",
    "Image": "user-43.jpg",
    "ClientName": "Angela Thomas",
    "ClientRole": "Consultant",
    "CompanyName": "Epicurean Delights",
    "EstimateDate": "10 Dec 2024",
    "ExpiryDate": "11 Dec 2024",
    "Amount": "$3800",
    "Status": "Sent",
  }
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Invoice ID",
    dataIndex: "InvoiceID",
    key: "InvoiceID",
    sorter: {
      compare: (a, b) => {
        a = a.InvoiceID.toLowerCase();
        b = b.InvoiceID.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Client Name",
    dataIndex: "ClientName",
    key: "ClientName",
    sorter: {
      compare: (a, b) => {
        a = a.ClientName.toLowerCase();
        b = b.ClientName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Company Name",
    dataIndex: "CompanyName",
    key: "CompanyName",
    sorter: {
      compare: (a, b) => {
        a = a.CompanyName.toLowerCase();
        b = b.CompanyName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Estimate Date",
    dataIndex: "EstimateDate",
    key: "EstimateDate",
    sorter: {
      compare: (a, b) => {
        a = a.EstimateDate.toLowerCase();
        b = b.EstimateDate.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Expiry Date",
    dataIndex: "ExpiryDate",
    key: "ExpiryDate",
    sorter: {
      compare: (a, b) => {
        a = a.ExpiryDate.toLowerCase();
        b = b.ExpiryDate.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    key: "Amount",
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
          record.InvoiceID.toLowerCase().includes(query) ||
          record.ClientName.toLowerCase().includes(query) ||
          record.ClientRole.toLowerCase().includes(query) ||
          record.CompanyName.toLowerCase().includes(query) ||
          record.EstimateDate.toLowerCase().includes(query) ||
          record.ExpiryDate.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'InvoiceID'">
            <router-link to="/sales/invoice-details" class="text-info">{{ record.InvoiceID }}</router-link>
          </template>
          <template v-if="column.key === 'ClientName'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md ">
                <img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle" alt="img">
              </a>
              <div class="ms-2">
                <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.ClientName }}</a></h6>
                <span class="d-block mt-1">{{ record.ClientRole }}</span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span class="badge" :class="{
              'badge-soft-success': record.Status === 'Accepted',
              'badge-soft-warning': record.Status === 'Expired',
              'badge-soft-danger': record.Status === 'Declined',
              'badge-soft-purple': record.Status === 'Sent'
            }">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>

          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <router-link to="/sales/edit-invoices" class="me-2"><i class="ti ti-edit"></i></router-link>
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
