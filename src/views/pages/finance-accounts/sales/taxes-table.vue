<script>
const data = [
    {
        "key": "1",
        "Tax_Name": "VAT",
        "Tax_Percentage": "20%",
        "Status": "Active",
    },
    {
        "key": "2",
        "Tax_Name": "GST",
        "Tax_Percentage": "18%",
        "Status": "Active",
    },
    {
        "key": "3",
        "Tax_Name": "Income Tax",
        "Tax_Percentage": "30%",
        "Status": "Inactive",
    },
    {
        "key": "4",
        "Tax_Name": "Corporate Tax",
        "Tax_Percentage": "25%",
        "Status": "Inactive",
    }
]

const columns = [
    {
        sorter: false,
    },
    {
        title: "Tax Name",
        dataIndex: "Tax_Name",
        key: "Tax_Name",
        sorter: {
            compare: (a, b) => {
                a = a.Tax_Name.toLowerCase();
                b = b.Tax_Name.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Tax Percentage",
        dataIndex: "Tax_Percentage",
        sorter: {
            compare: (a, b) => {
                a = a.Tax_Percentage.toLowerCase();
                b = b.Tax_Percentage.toLowerCase();
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
        sorter: true
    },
]

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
        }
    },
    computed: {
        filteredPages() {
            const query = this.searchQuery.toLowerCase();
            return this.data.filter((record) => {
                return (
                    record.Tax_Name.toLowerCase().includes(query) ||
                    record.Tax_Percentage.toLowerCase().includes(query) ||
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
}
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
                <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input v-model="searchQuery"
                            type="search" class="form-control form-control-sm" placeholder="Search"
                            aria-controls="DataTables_Table_0"></label>
                </div>
            </div>
        </div>
        <div class="custom-datatable-filter table-responsive">
            <a-table class="table datatable thead-light" :columns="columns" :data-source="paginatedData"
                :row-selection="rowSelection">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Tax_Name'">
                        <div class="d-flex align-items-center">
                            <h6 class="fs-14 fw-medium text-gray-9 me-2">{{ record.Tax_Name }}</h6>
                            <a href="javascript:void(0);" class="text-info" data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Comprehensive tax on the supply of goods and services.">
                                <i class="ti ti-info-circle"></i>
                            </a>
                        </div>
                    </template>
                    <template v-if="column.key === 'Status'">
                        <div class="dropdown">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                <span class="rounded-circle d-flex justify-content-center align-items-center me-2"
                                    :class="[record.Status === 'Active' ? 'bg-transparent-success' : 'bg-transparent-danger']">
                                    <i class="ti ti-point-filled text-success"
                                        :class="[record.Status === 'Active' ? 'text-success' : 'text-danger']"></i>
                                </span> {{ record.Status }}
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);"
                                        class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                                            class="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
                                                class="ti ti-point-filled text-success"></i></span>Active</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"
                                        class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                                            class="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
                                                class="ti ti-point-filled text-danger"></i></span>Inactive</a>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="column.key === 'action'">
                        <div class="action-icon d-inline-flex">
                            <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                data-bs-target="#edit_tax"><i class="ti ti-edit"></i></a>
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
                            id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true"
                                role="link" data-dt-idx="previous" tabindex="-1" class="page-link"
                                href="javascript:void(0);" @click.prevent="currentPage > 1 ? currentPage-- : null"><i
                                    class="ti ti-chevron-left"></i>
                            </a></li>
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }"
                            v-for="page in totalPages" :key="page">
                            <a href="javascript:void(0);" @click.prevent="currentPage = page"
                                aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0"
                                tabindex="0" class="page-link">{{ page }}</a>
                        </li>
                        <li class="paginate_button page-item next" :class="{ disabled: currentPage === totalPages }"
                            id="DataTables_Table_0_next">
                            <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next"
                                tabindex="-1" class="page-link" href="javascript:void(0);"
                                @click.prevent="currentPage < totalPages ? currentPage++ : null"><i
                                    class="ti ti-chevron-right"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>