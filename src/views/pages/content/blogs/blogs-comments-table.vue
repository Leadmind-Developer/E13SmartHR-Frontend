<script>
const data = [
  {
    key: "1",
    Comment: "Useful breakdown of HRMS evolution!",
    Created_Date: "12 Sep 2024",
    Blog: "The Evolution of HRMS: From Manual to Digital",
    By: "Gertrude",
  },
  {
    key: "2",
    Comment: "Easy-to-follow HRMS guide!",
    Created_Date: "24 Oct 2024",
    Blog: "HRMS Implementation: A Step-by-Step Guide",
    By: "Edward",
  },
  {
    key: "3",
    Comment: "Essential tips on HRMS data security!",
    Created_Date: "18 Feb 2024",
    Blog: "Data Security in HRMS: What Matters",
    By: "Mark",
  },
  {
    key: "4",
    Comment: "Great HRMS recruitment tips",
    Created_Date: "17 Oct 2024",
    Blog: "Improving Recruitment with HRMS",
    By: "Nidia",
  },
  {
    key: "5",
    Comment: "Great look at how HRMS affects culture",
    Created_Date: "20 Jul 2024",
    Blog: "Impact of HRMS on Company Culture",
    By: "Rebecca",
  },
  {
    key: "6",
    Comment: "Valuable points on HRMS benefits",
    Created_Date: "10 Apr 2024",
    Blog: "Key Benefits of Implementing HRMS",
    By: "Jimmy",
  },
  {
    key: "7",
    Comment: "Great points on why an HRMS is crucial",
    Created_Date: "29 Aug 2024",
    Blog: "Why Your Company Needs an HRMS",
    By: "Richard",
  },
  {
    key: "8",
    Comment: "Great take on HRMS technology’s future",
    Created_Date: "22 Feb 2024",
    Blog: "The Future of HRMS Technology",
    By: "Rachael",
  },
  {
    key: "9",
    Comment: "Valuable insights on scaling HR with HRMS!",
    Created_Date: "03 Nov 2024",
    Blog: "Scaling Your HR Operations with HRMS",
    By: "Tammy",
  },
  {
    key: "10",
    Comment: "Useful points on how HRMS drives success",
    Created_Date: "17 Dec 2024",
    Blog: "How HRMS Drives Organizational Success",
    By: "Judith",
  },
];

const columns = [
  {
    sorter: false,
  },
  {
    title: "Comment",
    dataIndex: "Comment",
    key: "Comment",
    sorter: {
      compare: (a, b) => {
        a = a.Comment.toLowerCase();
        b = b.Comment.toLowerCase();
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
    title: "Review",
    dataIndex: "Review",
    key: "Review",
    sorter: {
      compare: (a, b) => {
        a = a.Review.toLowerCase();
        b = b.Review.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Blog",
    dataIndex: "Blog",
    sorter: {
      compare: (a, b) => {
        a = a.Blog.toLowerCase();
        b = b.Blog.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "By",
    dataIndex: "By",
    sorter: {
      compare: (a, b) => {
        a = a.By.toLowerCase();
        b = b.By.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "",
    key: "Nil",
    sorter: true,
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
          record.Comment.toLowerCase().includes(query) ||
          record.Created_Date.toLowerCase().includes(query) ||
          record.Blog.toLowerCase().includes(query) ||
          record.By.toLowerCase().includes(query)
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
          <template v-if="column.key === 'Comment'">
            {{ record.Comment }}
          </template>
          <template v-if="column.key === 'Review'">
            <span class="text-warning">
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
            </span>
          </template>
          <template v-if="column.key === 'Nil'">
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Unpublish
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Unpublish</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Publish</a>
                </li>
              </ul>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
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
