<script>
const data = [
  {
    key: "1",
    Company_Name: "BrightWave Innovations",
    Image: "company-01.svg",
    Email: "michael@example.com",
    Phone: "(163) 2459 315",
    Location: "Germany",
    Rating: "4.2",
    Owner: "Hendry Milner",
    Status: "Active",
  },
  {
    key: "2",
    Company_Name: "Stellar Dynamics",
    Image: "company-02.svg",
    Email: "sophie@example.com",
    Phone: "(146) 1249 296",
    Location: "USA",
    Rating: "5",
    Owner: "Guilory Berggren",
    Status: "Active",
  },
  {
    key: "3",
    Company_Name: "Quantum Nexus",
    Image: "company-03.svg",
    Email: "cameron@example.com",
    Phone: "(135) 3489 516",
    Location: "Canada",
    Rating: "3.5",
    Owner: "Jami Carlile",
    Status: "Active",
  },
  {
    key: "4",
    Company_Name: "EcoVision Enterprises",
    Image: "company-04.svg",
    Email: "doris@example.com",
    Phone: "(158) 3459 596",
    Location: "India",
    Rating: "4.5",
    Owner: "Theresa Nelson",
    Status: "Active",
  },
  {
    key: "5",
    Company_Name: "Aurora Technologies",
    Image: "company-05.svg",
    Email: "thomas@example.com",
    Phone: "(196) 4862 196",
    Location: "China",
    Rating: "4.7",
    Owner: "Smith Cooper",
    Status: "Active",
  },
  {
    key: "6",
    Company_Name: "BlueSky Ventures",
    Image: "company-06.svg",
    Email: "kathleen@example.com",
    Phone: "(163) 6498 256",
    Location: "Japan",
    Rating: "5",
    Owner: "Martin Lewis",
    Status: "Active",
  },
  {
    key: "7",
    Company_Name: "TerraFusion Energy",
    Image: "company-07.svg",
    Email: "bruce@example.com",
    Phone: "(154) 6481 075",
    Location: "Indonesia",
    Rating: "3.1",
    Owner: "Newell Egan",
    Status: "Active",
  },
  {
    key: "8",
    Company_Name: "UrbanPulse Design",
    Image: "company-08.svg",
    Email: "estelle@example.com",
    Phone: "(184) 6348 195",
    Location: "Janet",
    Rating: "5",
    Owner: "Janet Carlson",
    Status: "Inactive",
  },
  {
    key: "9",
    Company_Name: "Nimbus Networks",
    Image: "company-09.svg",
    Email: "stephen@example.com",
    Phone: "(175) 2496 125",
    Location: "Israel",
    Rating: "2.7",
    Owner: "Craig Brown",
    Status: "Active",
  },
  {
    key: "10",
    Company_Name: "Epicurean Delights",
    Image: "company-10.svg",
    Email: "angela@example.com",
    Phone: "(132) 3145 977",
    Location: "Colombia",
    Rating: "3",
    Owner: "Daniel Byrne",
    Status: "Active",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Company Name",
    dataIndex: "Company_Name",
    key: "Company_Name",
    sorter: {
      compare: (a, b) => {
        a = a.Company_Name.toLowerCase();
        b = b.Company_Name.toLowerCase();
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
    title: "Phone",
    dataIndex: "Phone",
    sorter: {
      compare: (a, b) => {
        a = a.Phone.toLowerCase();
        b = b.Phone.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Location",
    dataIndex: "Location",
    sorter: {
      compare: (a, b) => {
        a = a.Location.toLowerCase();
        b = b.Location.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Rating",
    dataIndex: "Rating",
    key: "Rating",
    sorter: {
      compare: (a, b) => {
        a = a.Rating.toLowerCase();
        b = b.Rating.toLowerCase();
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
    title: "Contact",
    dataIndex: "Contact",
    key: "Contact",
    sorter: {
      compare: (a, b) => {
        a = a.Contact.toLowerCase();
        b = b.Contact.toLowerCase();
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
          record.Company_Name.toLowerCase().includes(query) ||
          record.Email.toLowerCase().includes(query) ||
          record.Phone.toLowerCase().includes(query) ||
          record.Location.toLowerCase().includes(query) ||
          record.Rating.toLowerCase().includes(query) ||
          record.Owner.toLowerCase().includes(query) ||
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
      return new URL(`/src/assets/img/company/${imageName}`, import.meta.url).href;
    }
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
          <template v-if="column.key === 'Company_Name'">
            <div class="d-flex align-items-center file-name-icon">
              <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" />
              </router-link>
              <div class="ms-2">
                <h6 class="fw-medium">
                  <router-link to="/crm/companies-details">{{
                    record.Company_Name
                  }}</router-link>
                </h6>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'Rating'">
            <span><i class="ti ti-star-filled text-warning me-2"></i>{{ record.Rating }}</span>
          </template>
          <template v-if="column.key === 'Contact'">
            <ul class="contact-icon d-flex align-items-center">
              <li>
                <a href="javascript:void(0);"
                  class="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
                    class="d-flex align-items-center justify-content-center"><i
                      class="ti ti-mail text-gray-5"></i></span></a>
              </li>
              <li>
                <a href="javascript:void(0);"
                  class="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
                    class="d-flex align-items-center justify-content-center"><i
                      class="ti ti-phone-call text-gray-5"></i></span></a>
              </li>
              <li>
                <a href="javascript:void(0);"
                  class="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
                    class="d-flex align-items-center justify-content-center"><i
                      class="ti ti-message-2 text-gray-5"></i></span></a>
              </li>
              <li>
                <a href="javascript:void(0);"
                  class="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
                    class="d-flex align-items-center justify-content-center"><i
                      class="ti ti-brand-skype text-gray-5"></i></span></a>
              </li>
              <li>
                <a href="javascript:void(0);"
                  class="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
                    class="d-flex align-items-center justify-content-center"><i
                      class="ti ti-brand-facebook text-gray-5"></i></span></a>
              </li>
            </ul>
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
              <router-link to="/crm/companies-details" class="me-2"><i class="ti ti-eye"></i></router-link>
              <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#edit_company"><i
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
