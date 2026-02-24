<script>
const data = [
    {
        "key": "1",
        "Image": "user-32.jpg",
        "Name": "Anthony Lewis",
        "Role": "Finance",
        "Paid_Amount": "$3000",
        "Paid_Month": "$3000",
        "Paid_Year": "$3000"
    },
    {
        "key": "2",
        "Image": "user-09.jpg",
        "Name": "Brian Villalobos",
        "Role": "Developer",
        "Paid_Amount": "$2500",
        "Paid_Month": "$2500",
        "Paid_Year": "$2500"
    },
    {
        "key": "3",
        "Image": "user-37.jpg",
        "Name": "Connie Waters",
        "Role": "Developer",
        "Paid_Amount": "$2800",
        "Paid_Month": "$2800",
        "Paid_Year": "$2800"
    },
    {
        "key": "4",
        "Image": "user-33.jpg",
        "Name": "Doglas Martini",
        "Role": "Manager",
        "Paid_Amount": "$3300",
        "Paid_Month": "$3300",
        "Paid_Year": "$3300"
    },
    {
        "key": "5",
        "Image": "user-35.jpg",
        "Name": "Elliot Murray",
        "Role": "Finance",
        "Paid_Amount": "$3600",
        "Paid_Month": "$3600",
        "Paid_Year": "$3600"
    },
    {
        "key": "6",
        "Image": "user-01.jpg",
        "Name": "Harvey Smith",
        "Role": "Developer",
        "Paid_Amount": "$2000",
        "Paid_Month": "$2000",
        "Paid_Year": "$2000"
    },
    {
        "key": "7",
        "Image": "user-02.jpg",
        "Name": "Linda Ray",
        "Role": "Finance",
        "Paid_Amount": "$3400",
        "Paid_Month": "$3400",
        "Paid_Year": "$3400"
    },
    {
        "key": "8",
        "Image": "user-38.jpg",
        "Name": "Lori Broaddus",
        "Role": "Developer",
        "Paid_Amount": "$4000",
        "Paid_Month": "$4000",
        "Paid_Year": "$4000"
    },
    {
        "key": "9",
        "Image": "user-36.jpg",
        "Name": "Rebecca Smtih",
        "Role": "Executive",
        "Paid_Amount": "$4500",
        "Paid_Month": "$4500",
        "Paid_Year": "$4500"
    }
]

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
    {
        title: "Paid Month",
        dataIndex: "Paid_Month",
        sorter: {
            compare: (a, b) => {
                a = a.Paid_Month.toLowerCase();
                b = b.Paid_Month.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Paid Year",
        dataIndex: "Paid_Year",
        sorter: {
            compare: (a, b) => {
                a = a.Paid_Year.toLowerCase();
                b = b.Paid_Year.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
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
                    record.Name.toLowerCase().includes(query) ||
                    record.Role.toLowerCase().includes(query) ||
                    record.Paid_Amount.toLowerCase().includes(query) ||
                    record.Paid_Month.toLowerCase().includes(query) ||
                    record.Paid_Year.toLowerCase().includes(query)
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
                    <template v-if="column.key === 'Name'">
                        <div class="d-flex align-items-center">
                            <a href="javascript:void(0);" class="avatar avatar-md" data-bs-toggle="modal"
                                data-bs-target="#view_details">
                                <img :src="getImageUrl(record.Image)" class="img-fluid rounded-circle" alt="img">
                            </a>
                            <div class="ms-2">
                                <p class="text-dark mb-0"><a href="javascript:void(0);" data-bs-toggle="modal"
                                        data-bs-target="#view_details">Anthony Lewis</a></p>
                                <span class="fs-12">{{ record.Name }}</span>
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