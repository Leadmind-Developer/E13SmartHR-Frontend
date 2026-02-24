<script>
const data = [
    {
        "key": "1",
        "EmployeeName": "Anthony Lewis",
        "EmployeeImage": "user-11.jpg",
        "TrainingType": "Git Training",
        "TrainerName": "Harold Gaynor",
        "TrainerImage": "user-01.jpg",
        "Date": "14 Jun 2025",
        "Status": "Issued",
    },
    {
        "key": "2",
        "EmployeeName": "Brian Villalobos",
        "EmployeeImage": "user-13.jpg",
        "TrainingType": "HTML Training",
        "TrainerName": "Sandra Ornellas",
        "TrainerImage": "user-02.jpg",
        "Date": "25 May 2025",
        "Status": "Issued",
    },
    {
        "key": "3",
        "EmployeeName": "Harvey Smith",
        "EmployeeImage": "user-12.jpg",
        "TrainingType": "React Training",
        "TrainerName": "John Harris",
        "TrainerImage": "user-03.jpg",
        "Date": "10 May 2025",
        "Status": "Issued",
    },
    {
        "key": "4",
        "EmployeeName": "Stephan Peralt",
        "EmployeeImage": "user-16.jpg",
        "TrainingType": "Nodejs Training",
        "TrainerName": "Whitney Barnette",
        "TrainerImage": "user-04.jpg",
        "Date": "28 Apr 2025",
        "Status": "Issued",
    },
    {
        "key": "5",
        "EmployeeName": "Doglas Martini",
        "EmployeeImage": "user-15.jpg",
        "TrainingType": "Django Training",
        "TrainerName": "Richard Thompson",
        "TrainerImage": "user-05.jpg",
        "Date": "15 Apr 2025",
        "Status": "Issued",
    },
    {
        "key": "6",
        "EmployeeName": "Linda Ray",
        "EmployeeImage": "user-14.jpg",
        "TrainingType": "Java Training",
        "TrainerName": "Kerry Drake",
        "TrainerImage": "user-06.jpg",
        "Date": "20 Mar 2025",
        "Status": "Issued",
    },
    {
        "key": "7",
        "EmployeeName": "Elliot Murray",
        "EmployeeImage": "user-17.jpg",
        "TrainingType": "MySQL Training",
        "TrainerName": "David Carmona",
        "TrainerImage": "user-07.jpg",
        "Date": "10 Mar 2025",
        "Status": "Issued",
    },
    {
        "key": "8",
        "EmployeeName": "Rebecca Smtih",
        "EmployeeImage": "user-18.jpg",
        "TrainingType": "DevOps Training",
        "TrainerName": "Margaret Soto",
        "TrainerImage": "user-08.jpg",
        "Date": "17 Feb 2025",
        "Status": "Issued",
    },
    {
        "key": "9",
        "EmployeeName": "Connie Waters",
        "EmployeeImage": "user-20.jpg",
        "TrainingType": "Angular Training",
        "TrainerName": "Jeffrey Thaler",
        "TrainerImage": "user-09.jpg",
        "Date": "02 Feb 2025",
        "Status": "Issued",
    },
    {
        "key": "10",
        "EmployeeName": "Lori Broaddus",
        "EmployeeImage": "user-19.jpg",
        "TrainingType": "Vuejs Training",
        "TrainerName": "Joyce Golston",
        "TrainerImage": "user-10.jpg",
        "Date": "24 Jan 2025",
        "Status": "Issued",
    }
]

const columns = [
    {
        sorter: false,
    },
    {
        title: "Employee Name",
        dataIndex: "EmployeeName",
        key: "EmployeeName",
        sorter: {
            compare: (a, b) => {
                a = a.EmployeeName.toLowerCase();
                b = b.EmployeeName.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Training Type",
        dataIndex: "TrainingType",
        key: "TrainingType",
        sorter: {
            compare: (a, b) => {
                a = a.TrainingType.toLowerCase();
                b = b.TrainingType.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Trainer Name",
        dataIndex: "TrainerName",
        key: "TrainerName",
        sorter: {
            compare: (a, b) => {
                a = a.TrainerName.toLowerCase();
                b = b.TrainerName.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Date",
        dataIndex: "Date",
        key: "Date",
        sorter: {
            compare: (a, b) => {
                a = a.Date.toLowerCase();
                b = b.Date.toLowerCase();
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
        sorter: false,
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
    methods: {
        getImageUrl(imageName) {
            return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
                .href;
        },
        getImageUrlOne(imageName) {
            return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
                .href;
        },
    },
    computed: {
        filteredPages() {
            const query = this.searchQuery.toLowerCase();
            return this.data.filter((record) => {
                return (
                    record.EmployeeName.toLowerCase().includes(query) ||
                    record.TrainingType.toLowerCase().includes(query) ||
                    record.TrainerName.toLowerCase().includes(query) ||
                    record.Date.toLowerCase().includes(query) ||
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
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Certification Tracking</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard/"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Training
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Certification Tracking</li>
                        </ol>
                    </nav>
                </div>
                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                    <div class="mb-2 me-2">
                        <div class="dropdown">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                <i class="ti ti-file-export me-1"></i>Export
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                                            class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                                            class="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="mb-2">
                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_modal"
                            class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add
                            New Certification</a>
                    </div>
                </div>
            </div>
            <!-- /Breadcrumb -->

            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Certification List</h5>
                    <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                        <div class="dropdown">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Sort By : Last 7 Days
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Recently Added</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Descending</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Month</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Last 7 Days</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <div class="dataTables_length" id="DataTables_Table_0_length"><label>Row Per Page
                                    <select v-model="pageSize" name="DataTables_Table_0_length"
                                        aria-controls="DataTables_Table_0" class="form-select form-select-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> Entries</label></div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input
                                        v-model="searchQuery" type="search" class="form-control form-control-sm"
                                        placeholder="Search" aria-controls="DataTables_Table_0"></label>
                            </div>
                        </div>
                    </div>
                    <div class="custom-datatable-filter table-responsive">
                        <a-table class="table datatable thead-light" :columns="columns" :data-source="paginatedData"
                            :row-selection="rowSelection">
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'EmployeeName'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrl(record.EmployeeImage)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.EmployeeName }}</a>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'TrainingType'">
                                    <p class="mb-0 fw-medium text-dark">{{ record.TrainingType }}</p>
                                </template>
                                <template v-if="column.key === 'TrainerName'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrlOne(record.TrainerImage)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.TrainerName }}</a>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                        <i class="ti ti-point-filled me-1"></i>Issued
                                    </span>
                                </template>
                                <template v-if="column.key === 'action'">
                                    <div class="action-icon d-inline-flex">
                                        <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                            data-bs-target="#details_modal"><i class="ti ti-eye"></i></a>
                                        <a href="javascript:void(0);" class="me-2"><i class="ti ti-download"></i></a>
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
                                    <li class="paginate_button page-item previous"
                                        :class="{ disabled: currentPage === 1 }" id="DataTables_Table_0_previous"><a
                                            aria-controls="DataTables_Table_0" aria-disabled="true" role="link"
                                            data-dt-idx="previous" tabindex="-1" class="page-link"
                                            href="javascript:void(0);"
                                            @click.prevent="currentPage > 1 ? currentPage-- : null"><i
                                                class="ti ti-chevron-left"></i>
                                        </a></li>
                                    <li class="paginate_button page-item" :class="{ active: page === currentPage }"
                                        v-for="page in totalPages" :key="page">
                                        <a href="javascript:void(0);" @click.prevent="currentPage = page"
                                            aria-controls="DataTables_Table_0" role="link" aria-current="page"
                                            data-dt-idx="0" tabindex="0" class="page-link">{{ page }}</a>
                                    </li>
                                    <li class="paginate_button page-item next"
                                        :class="{ disabled: currentPage === totalPages }" id="DataTables_Table_0_next">
                                        <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link"
                                            data-dt-idx="next" tabindex="-1" class="page-link"
                                            href="javascript:void(0);"
                                            @click.prevent="currentPage < totalPages ? currentPage++ : null"><i
                                                class="ti ti-chevron-right"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
            <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
            <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
        </div>

    </div>
    <!-- /Page Wrapper -->
    <certification-tracking-modal></certification-tracking-modal>
</template>