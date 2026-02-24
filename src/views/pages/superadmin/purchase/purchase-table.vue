<script>
const data = [
  {
    key: "1",
    Invoice_ID: "INV001",
    Image: "company-01.svg",
    Customer: "BrightWave Innovations",
    Email: "michael@example.com",
    Created_Date: "12 Sep 2024",
    Amount: "$200",
    Payment_Method: "Credit Card",
    Status: "Paid",
  },
  {
    key: "2",
    Invoice_ID: "INV002",
    Image: "company-02.svg",
    Customer: "Stellar Dynamics",
    Email: "sophie@example.com",
    Created_Date: "24 Oct 2024",
    Amount: "$600",
    Payment_Method: "Paypal",
    Status: "Paid",
  },
  {
    key: "3",
    Invoice_ID: "INV003",
    Image: "company-03.svg",
    Customer: "Quantum Nexus",
    Email: "cameron@example.com",
    Created_Date: "18 Feb 2024",
    Amount: "$200",
    Payment_Method: "Debit Card",
    Status: "Paid",
  },
  {
    key: "4",
    Invoice_ID: "INV004",
    Image: "company-04.svg",
    Customer: "EcoVision Enterprises",
    Email: "doris@example.com",
    Created_Date: "17 Oct 2024",
    Amount: "$200",
    Payment_Method: "Paypal",
    Status: "Paid",
  },
  {
    key: "5",
    Invoice_ID: "INV005",
    Image: "company-05.svg",
    Customer: "Aurora Technologies",
    Email: "thomas@example.com",
    Created_Date: "20 Jul 2024",
    Amount: "$400",
    Payment_Method: "Credit Card",
    Status: "Paid",
  },
  {
    key: "6",
    Invoice_ID: "INV006",
    Image: "company-06.svg",
    Customer: "BlueSky Ventures",
    Email: "kathleen@example.com",
    Created_Date: "10 Apr 2024",
    Amount: "$200",
    Payment_Method: "Paypal",
    Status: "Paid",
  },
  {
    key: "7",
    Invoice_ID: "INV007",
    Image: "company-07.svg",
    Customer: "TerraFusion Energy",
    Email: "bruce@example.com",
    Created_Date: "29 Aug 2024",
    Amount: "$4800",
    Payment_Method: "Credit Card",
    Status: "Paid",
  },
  {
    key: "8",
    Invoice_ID: "INV008",
    Image: "company-08.svg",
    Customer: "UrbanPulse Design",
    Email: "estelle@example.com",
    Created_Date: "22 Feb 2024",
    Amount: "$50",
    Payment_Method: "Credit Card",
    Status: "Unpaid",
  },
  {
    key: "9",
    Invoice_ID: "INV009",
    Image: "company-09.svg",
    Customer: "Nimbus Networks",
    Email: "stephen@example.com",
    Created_Date: "03 Nov 2024",
    Amount: "$600",
    Payment_Method: "Paypal",
    Status: "Paid",
  },
  {
    key: "10",
    Invoice_ID: "INV010",
    Image: "company-10.svg",
    Customer: "Epicurean Delights",
    Email: "angela@example.com",
    Created_Date: "17 Dec 2024",
    Amount: "$200",
    Payment_Method: "Credit Card",
    Status: "Paid",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Invoice ID",
    dataIndex: "Invoice_ID",
    key: "Invoice_ID",
    sorter: {
      compare: (a, b) => {
        a = a.Invoice_ID.toLowerCase();
        b = b.Invoice_ID.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Customer",
    dataIndex: "Customer",
    key: "Customer",
    sorter: {
      compare: (a, b) => {
        a = a.Customer.toLowerCase();
        b = b.Customer.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Email",
    dataIndex: "Email",
    sorter: {
      compare: (a, b) => {
        a = a.Email.toLowerCase();
        b = b.Email.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Created_Date",
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
    title: "Payment_Method",
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
          record.Invoice_ID.toLowerCase().includes(query) ||
          record.Customer.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query) ||
          record.Amount.toLowerCase().includes(query) ||
          record.Payment_Method.toLowerCase().includes(query) ||
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
          <template v-if="column.key === 'Invoice_ID'">
            <a href="javascript:void(0);" class="link-default">{{ record.Invoice_ID }}</a>
          </template>
          <template v-if="column.key === 'Customer'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border rounded-circle">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Customer }}</a>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Status'">
            <span :class="[
              'badge',
              record.Status === 'Paid' ? 'badge-success' : 'badge-danger',
              'd-flex',
              'align-items-center',
              'badge-xs',
            ]">
              <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#view_invoice"><i
                  class="ti ti-file-invoice"></i></a>
              <a href="javascript:void(0);" class="me-2"><i class="ti ti-download"></i></a>
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
