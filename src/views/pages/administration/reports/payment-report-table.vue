<script>
const data = [
  {
    key: "1",
    Image: "user-39.jpg",
    Invoice_ID: "Inv-001",
    Client_Name: "Michael Walker",
    Role: "CEO",
    Company_Name: "BrightWave Innovations",
    Payment_Type: "Paypal",
    Paid_Date: "15 Jan 2024",
    Paid_Amount: "$3000",
  },
  {
    key: "2",
    Image: "user-40.jpg",
    Invoice_ID: "Inv-002",
    Client_Name: "Sophie Headrick",
    Role: "Manager",
    Company_Name: "Stellar Dynamics",
    Payment_Type: "Paypal",
    Paid_Date: "25 Jan 2024",
    Paid_Amount: "$2500",
  },
  {
    key: "3",
    Image: "user-41.jpg",
    Invoice_ID: "Inv-003",
    Client_Name: "Cameron Drake",
    Role: "Director",
    Company_Name: "Quantum Nexus",
    Payment_Type: "Paypal",
    Paid_Date: "22 Feb 2024",
    Paid_Amount: "$2800",
  },
  {
    key: "4",
    Image: "user-42.jpg",
    Invoice_ID: "Inv-004",
    Client_Name: "Doris Crowley",
    Role: "Consultant",
    Company_Name: "EcoVision Enterprises",
    Payment_Type: "Paypal",
    Paid_Date: "15 Mar 2024",
    Paid_Amount: "$3300",
  },
  {
    key: "5",
    Image: "user-43.jpg",
    Invoice_ID: "Inv-005",
    Client_Name: "Thomas Bordelon",
    Role: "Manager",
    Company_Name: "Aurora Technologies",
    Payment_Type: "Paypal",
    Paid_Date: "16 Apr 2024",
    Paid_Amount: "$3600",
  },
  {
    key: "6",
    Image: "user-44.jpg",
    Invoice_ID: "Inv-006",
    Client_Name: "Kathleen Gutierrez",
    Role: "Director",
    Company_Name: "BlueSky Ventures",
    Payment_Type: "Paypal",
    Paid_Date: "21 May 2024",
    Paid_Amount: "$2000",
  },
  {
    key: "7",
    Image: "user-45.jpg",
    Invoice_ID: "Inv-007",
    Client_Name: "Bruce Wright",
    Role: "CEO",
    Company_Name: "TerraFusion Energy",
    Payment_Type: "Paypal",
    Paid_Date: "06 Jul 2024",
    Paid_Amount: "$3400",
  },
  {
    key: "8",
    Image: "user-46.jpg",
    Invoice_ID: "Inv-008",
    Client_Name: "Estelle Morgan",
    Role: "Manager",
    Company_Name: "UrbanPulse Design",
    Payment_Type: "Paypal",
    Paid_Date: "04 Sep 2024",
    Paid_Amount: "$4000",
  },
  {
    key: "9",
    Image: "user-47.jpg",
    Invoice_ID: "Inv-009",
    Client_Name: "Stephen Dias",
    Role: "CEO",
    Company_Name: "Nimbus Networks",
    Payment_Type: "Paypal",
    Paid_Date: "15 Nov 2024",
    Paid_Amount: "$4500",
  },
  {
    key: "10",
    Image: "user-48.jpg",
    Invoice_ID: "Inv-010",
    Client_Name: "Angela Thomas",
    Role: "Consultant",
    Company_Name: "Epicurean Delights",
    Payment_Type: "Paypal",
    Paid_Date: "11 Dec 2024",
    Paid_Amount: "$3800",
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
    title: "Payment Type",
    dataIndex: "Payment_Type",
    sorter: {
      compare: (a, b) => {
        a = a.Payment_Type.toLowerCase();
        b = b.Payment_Type.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Paid Date",
    dataIndex: "Paid_Date",
    sorter: {
      compare: (a, b) => {
        a = a.Paid_Date.toLowerCase();
        b = b.Paid_Date.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Paid Amount",
    dataIndex: "Paid_Amount",
    sorter: {
      compare: (a, b) => {
        a = a.Paid_Amount.toLowerCase();
        b = b.Paid_Amount.toLowerCase();
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
          record.Invoice_ID.toLowerCase().includes(query) ||
          record.Client_Name.toLowerCase().includes(query) ||
          record.Role.toLowerCase().includes(query) ||
          record.Company_Name.toLowerCase().includes(query) ||
          record.Payment_Type.toLowerCase().includes(query) ||
          record.Paid_Date.toLowerCase().includes(query) ||
          record.Paid_Amount.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Invoice_ID'">
            <router-link to="/sales/invoice-details" class="link-default">{{
              record.Invoice_ID
            }}</router-link>
          </template>
          <template v-if="column.key === 'Client_Name'">
            <div class="d-flex align-items-center file-name-icon">
              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <a href="javascript:void(0);">{{ record.Client_Name }}</a>
                </h6>
                <span class="fs-12 fw-normal">{{ record.Role }}</span>
              </div>
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
