<script>
const data = [
    {
        key: "1",
        "Type": "Git Training",
        "Description": "Git training covers managing code changes and collaboration using Git commands and workflows",
        "Status": "Active"
    },
    {
        key: "2",
        "Type": "HTML Training",
        "Description": "HTML training teaches how to create and structure web pages using HTML tags and elements.",
        "Status": "Active"
    },
    {
        key: "3",
        "Type": "React Training",
        "Description": "React training covers building UIs with components, state, and hooks.",
        "Status": "Active"
    },
    {
        key: "4",
        "Type": "Nodejs Training",
        "Description": "Node.js training focuses on building server-side applications using JavaScript.",
        "Status": "Active"
    },
    {
        key: "5",
        "Type": "Vuejs Training",
        "Description": "Vue.js training focuses on building UIs with Vue.js components.",
        "Status": "Active"
    }
]

const columns = [
    {
        sorter: false,
    },
    {
        title: "Type",
        dataIndex: "Type",
        sorter: {
            compare: (a, b) => {
                a = a.Type.toLowerCase();
                b = b.Type.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Description",
        dataIndex: "Description",
        sorter: {
            compare: (a, b) => {
                a = a.Description.toLowerCase();
                b = b.Description.toLowerCase();
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
                    record.Type.toLowerCase().includes(query) ||
                    record.Description.toLowerCase().includes(query) ||
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
                    <template v-if="column.key === 'Status'">
                        <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                            <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
                        </span>
                    </template>
                    <template v-if="column.key === 'action'">
                        <div class="action-icon d-inline-flex">
                            <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                data-bs-target="#edit_training_type"><i class="ti ti-edit"></i></a>
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