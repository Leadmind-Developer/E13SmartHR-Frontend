<script>
const data = [
    {
        "key": "1",
        "Employee_Name": "Anthony Lewis",
        "Image": "user-32.jpg",
        "Roll": "Finance",
        "Provident_Fund_Type": "Employee Provident Fund",
        "Employee_Share": "2%",
        "Organization_Share": "2%",
        "Status": "Approved"
    },
    {
        "key": "2",
        "Employee_Name": "Brian Villalobos",
        "Image": "user-09.jpg",
        "Roll": "Developer",
        "Provident_Fund_Type": "Employee Provident Fund",
        "Employee_Share": "2%",
        "Organization_Share": "2%",
        "Status": "Pending"
    },
    {
        "key": "3",
        "Employee_Name": "Harvey Smith",
        "Image": "user-01.jpg",
        "Roll": "Developer",
        "Provident_Fund_Type": "Voluntary Provident Fund",
        "Employee_Share": "5%",
        "Organization_Share": "2%",
        "Status": "Approved"
    },
    {
        "key": "4",
        "Employee_Name": "Stephan Peralt",
        "Image": "user-33.jpg",
        "Roll": "Executive Officer",
        "Provident_Fund_Type": "Voluntary Provident Fund",
        "Employee_Share": "3%",
        "Organization_Share": "2%",
        "Status": "Pending"
    },
    {
        "key": "5",
        "Employee_Name": "Doglas Martini",
        "Image": "user-34.jpg",
        "Roll": "Manager",
        "Provident_Fund_Type": "Employee Provident Fund",
        "Employee_Share": "2%",
        "Organization_Share": "2%",
        "Status": "Approved"
    },
    {
        "key": "6",
        "Employee_Name": "Linda Ray",
        "Image": "user-02.jpg",
        "Roll": "Finance",
        "Provident_Fund_Type": "Employee Provident Fund",
        "Employee_Share": "2%",
        "Organization_Share": "2%",
        "Status": "Pending"
    },
    {
        "key": "7",
        "Employee_Name": "Elliot Murray",
        "Image": "user-35.jpg",
        "Roll": "Developer",
        "Provident_Fund_Type": "Voluntary Provident Fund",
        "Employee_Share": "6%",
        "Organization_Share": "2%",
        "Status": "Approved"
    },
    {
        "key": "8",
        "Employee_Name": "Rebecca Smtih",
        "Image": "user-36.jpg",
        "Roll": "Executive",
        "Provident_Fund_Type": "Voluntary Provident Fund",
        "Employee_Share": "4%",
        "Organization_Share": "2%",
        "Status": "Pending"
    },
    {
        "key": "9",
        "Employee_Name": "Connie Waters",
        "Image": "user-37.jpg",
        "Roll": "Developer",
        "Provident_Fund_Type": "Employee Provident Fund",
        "Employee_Share": "2%",
        "Organization_Share": "2%",
        "Status": "Approved"
    },
    {
        "key": "10",
        "Employee_Name": "Lori Broaddus",
        "Image": "user-38.jpg",
        "Roll": "Finance",
        "Provident_Fund_Type": "Voluntary Provident Fund",
        "Employee_Share": "7%",
        "Organization_Share": "2%",
        "Status": "Pending"
    }
]

const columns = [
    {
        sorter: false,
    },
    {
        title: "Employee Name",
        dataIndex: "Employee_Name",
        key: "Employee_Name",
        sorter: {
            compare: (a, b) => {
                a = a.Employee_Name.toLowerCase();
                b = b.Employee_Name.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Provident Fund Type",
        dataIndex: "Provident_Fund_Type",
        sorter: {
            compare: (a, b) => {
                a = a.Provident_Fund_Type.toLowerCase();
                b = b.Provident_Fund_Type.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Employee Share",
        dataIndex: "Employee_Share",
        sorter: {
            compare: (a, b) => {
                a = a.Employee_Share.toLowerCase();
                b = b.Employee_Share.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Organization Share",
        dataIndex: "Organization_Share",
        sorter: {
            compare: (a, b) => {
                a = a.Organization_Share.toLowerCase();
                b = b.Organization_Share.toLowerCase();
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
                    record.Employee_Name.toLowerCase().includes(query) ||
                    record.Roll.toLowerCase().includes(query) ||
                    record.Provident_Fund_Type.toLowerCase().includes(query) ||
                    record.Employee_Share.toLowerCase().includes(query) ||
                    record.Organization_Share.toLowerCase().includes(query) ||
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
                    <template v-if="column.key === 'Employee_Name'">
                        <div class="d-flex align-items-center file-name-icon">
                            <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded">
                                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img">
                            </a>
                            <div class="ms-2">
                                <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Employee_Name }}</a></h6>
                                <span class="d-block mt-1">{{ record.Roll }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="column.key === 'Status'">
                        <div class="dropdown">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                <span class="rounded-circle d-flex justify-content-center align-items-center me-2"
                                    :class="[record.Status === 'Approved' ? 'bg-transparent-success' : 'bg-transparent-info']">
                                    <i class="ti ti-point-filled"
                                        :class="[record.Status === 'Approved' ? 'text-success' : 'text-info']"></i>
                                </span> {{ record.Status }}
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);"
                                        class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                                            class="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
                                                class="ti ti-point-filled text-success"></i></span>Approved</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"
                                        class="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
                                            class="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
                                                class="ti ti-point-filled text-skyblue"></i></span>Pending </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="column.key === 'action'">
                        <div class="action-icon d-inline-flex">
                            <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                data-bs-target="#edit_provident-fund"><i class="ti ti-edit"></i></a>
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