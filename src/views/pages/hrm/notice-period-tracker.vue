<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Notice Period Tracker</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                HRM
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Notice Period Tracker</li>
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
                            New Employee</a>
                    </div>
                    <div class="ms-2 head-icons">
                        <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
                            <i class="ti ti-chevrons-up"></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /Breadcrumb -->

            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Notice Period Tracker</h5>
                    <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                        <div class="me-3">
                            <div class="input-icon position-relative">
                                <span class="input-icon-addon">
                                    <i class="ti ti-calendar text-gray-9"></i>
                                </span>
                                <input type="text" class="form-control date-range bookingrange" ref="dateRangeInput"
                                    placeholder="dd/mm/yyyy - dd/mm/yyyy">
                            </div>
                        </div>
                        <div class="dropdown me-3">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Designation
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Accountant</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">App Developer</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Technician</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Web Developer</a>
                                </li>
                            </ul>
                        </div>
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
                                <template v-if="column.key === 'EmpID'">
                                    <div>
                                        <a href="javascript:void(0);" data-bs-toggle="offcanvas"
                                            data-bs-target="#probation_details">Emp-001</a>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Name'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrl(record.NameImage)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.Name }}</a>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span class="d-inline-flex align-items-center badge-xs badge" :class="{
                                        'badge-pink-transparent': record.Status === 'Active',
                                        'badge-success-transparent': record.Status === 'Completed',
                                        'badge-purple-transparent': record.Status === 'Closing Soon',
                                    }">
                                        <i class="ti ti-point-filled me-1"></i>
                                        {{ record.Status }}
                                    </span>
                                </template>
                                <template v-if="column.key === 'action'">
                                    <div class="action-icon d-inline-flex">
                                        <a href="javascript:void(0);" class="me-2" data-bs-toggle="offcanvas"
                                            data-bs-target="#probation_details"><i class="ti ti-eye"></i></a>
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
    <notice-period-tracker-modal></notice-period-tracker-modal>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
const columns = [
    {
        sorter: false,
    },
    {
        title: "Emp ID",
        dataIndex: "EmpID",
        key: "EmpID",
        sorter: {
            compare: (a, b) => {
                a = a.EmpID.toLowerCase();
                b = b.EmpID.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
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
        title: "Designation",
        dataIndex: "Designation",
        key: "Designation",
        sorter: {
            compare: (a, b) => {
                a = a.Designation.toLowerCase();
                b = b.Designation.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Start Date",
        dataIndex: "StartDate",
        key: "StartDate",
        sorter: {
            compare: (a, b) => {
                a = a.StartDate.toLowerCase();
                b = b.StartDate.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "End Date",
        dataIndex: "EndDate",
        key: "EndDate",
        sorter: {
            compare: (a, b) => {
                a = a.EndDate.toLowerCase();
                b = b.EndDate.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Total Days",
        dataIndex: "TotalDays",
        key: "TotalDays",
        sorter: {
            compare: (a, b) => {
                a = a.TotalDays.toLowerCase();
                b = b.TotalDays.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Completed",
        dataIndex: "Completed",
        key: "Completed",
        sorter: {
            compare: (a, b) => {
                a = a.Completed.toLowerCase();
                b = b.Completed.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Remaining",
        dataIndex: "Remaining",
        key: "Remaining",
        sorter: {
            compare: (a, b) => {
                a = a.Remaining.toLowerCase();
                b = b.Remaining.toLowerCase();
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
];
const data = [
    {
        "key": "1",
        "EmpID": "Emp-001",
        "Name": "Anthony Lewis",
        "NameImage": "user-11.jpg",
        "Designation": "Accountant",
        "StartDate": "14 Jun 2025",
        "EndDate": "12 Sep 2025",
        "TotalDays": "90",
        "Completed": "60",
        "Remaining": "30",
        "Status": "Active",
    },
    {
        "key": "2",
        "EmpID": "Emp-002",
        "Name": "Brian Villalobos",
        "NameImage": "user-13.jpg",
        "Designation": "App Developer",
        "StartDate": "25 May 2025",
        "EndDate": "24 Jul 2025",
        "TotalDays": "60",
        "Completed": "60",
        "Remaining": "0",
        "Status": "Completed",
    },
    {
        "key": "3",
        "EmpID": "Emp-003",
        "Name": "Harvey Smith",
        "NameImage": "user-12.jpg",
        "Designation": "Technician",
        "StartDate": "10 May 2025",
        "EndDate": "08 Aug 2025",
        "TotalDays": "90",
        "Completed": "90",
        "Remaining": "0",
        "Status": "Closing Soon",
    },
    {
        "key": "4",
        "EmpID": "Emp-004",
        "Name": "Stephan Peralt",
        "NameImage": "user-16.jpg",
        "Designation": "Web Developer",
        "StartDate": "28 Apr 2025",
        "EndDate": "27 Jul 2025",
        "TotalDays": "90",
        "Completed": "90",
        "Remaining": "0",
        "Status": "Completed",
    },
    {
        "key": "5",
        "EmpID": "Emp-005",
        "Name": "Doglas Martini",
        "NameImage": "user-15.jpg",
        "Designation": "Sales Executive Officer",
        "StartDate": "15 Apr 2025",
        "EndDate": "14 Jun 2025",
        "TotalDays": "60",
        "Completed": "60",
        "Remaining": "60",
        "Status": "Closing Soon",
    },
    {
        "key": "6",
        "EmpID": "Emp-006",
        "Name": "Linda Ray",
        "NameImage": "user-14.jpg",
        "Designation": "Designer",
        "StartDate": "20 Mar 2025",
        "EndDate": "18 Jun 2025",
        "TotalDays": "90",
        "Completed": "90",
        "Remaining": "90",
        "Status": "Completed",
    },
    {
        "key": "7",
        "EmpID": "Emp-007",
        "Name": "Elliot Murray",
        "NameImage": "user-17.jpg",
        "Designation": "Account Manager",
        "StartDate": "10 Mar 2025",
        "EndDate": "08 Jun 2025",
        "TotalDays": "90",
        "Completed": "90",
        "Remaining": "90",
        "Status": "Active",
    },
    {
        "key": "8",
        "EmpID": "Emp-008",
        "Name": "Rebecca Smtih",
        "NameImage": "user-18.jpg",
        "Designation": "SEO Analyst",
        "StartDate": "17 Feb 2025",
        "EndDate": "18 Apr 2025",
        "TotalDays": "60",
        "Completed": "60",
        "Remaining": "60",
        "Status": "Closing Soon",
    },
    {
        "key": "9",
        "EmpID": "Emp-009",
        "Name": "Connie Waters",
        "NameImage": "user-20.jpg",
        "Designation": "Admin",
        "StartDate": "02 Feb 2025",
        "EndDate": "03 Apr 2025",
        "TotalDays": "60",
        "Completed": "60",
        "Remaining": "60",
        "Status": "Active",
    },
    {
        "key": "10",
        "EmpID": "Emp-010",
        "Name": "Lori Broaddus",
        "NameImage": "user-19.jpg",
        "Designation": "Business Analyst",
        "StartDate": "24 Jan 2025",
        "EndDate": "24 Apr 2025",
        "TotalDays": "90",
        "Completed": "90",
        "Remaining": "90",
        "Status": "Completed",
    }
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
            return new URL(`/src/assets/img/users/${imageName}`, import.meta.url).href;
        },
        getImageUrlOne(imageName) {
            return new URL(`/src/assets/img/users/${imageName}`, import.meta.url).href;
        },
        toggleHeader() {
            document.getElementById("collapse-header").classList.toggle("active");
            document.body.classList.toggle("header-collapse");
        },
    },
    setup() {
        const dateRangeInput = ref(null);

        // Move the function declaration outside of the onMounted callback
        function booking_range(start, end) {
            return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
        }

        onMounted(() => {
            if (dateRangeInput.value) {
                const start = moment().subtract(6, "days");
                const end = moment();

                new DateRangePicker(
                    dateRangeInput.value,
                    {
                        startDate: start,
                        endDate: end,
                        ranges: {
                            Today: [moment(), moment()],
                            Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                            "Last 7 Days": [moment().subtract(6, "days"), moment()],
                            "Last 30 Days": [moment().subtract(29, "days"), moment()],
                            "This Month": [moment().startOf("month"), moment().endOf("month")],
                            "Last Month": [
                                moment().subtract(1, "month").startOf("month"),
                                moment().subtract(1, "month").endOf("month"),
                            ],
                        },
                    },
                    booking_range
                );

                booking_range(start, end);
            }
        });

        return {
            dateRangeInput,
        };
    },
    computed: {
        filteredPages() {
            const query = this.searchQuery.toLowerCase();
            return this.data.filter((record) => {
                return (
                    record.EmpID.toLowerCase().includes(query) ||
                    record.Name.toLowerCase().includes(query) ||
                    record.Designation.toLowerCase().includes(query) ||
                    record.StartDate.toLowerCase().includes(query) ||
                    record.EndDate.toLowerCase().includes(query) ||
                    record.TotalDays.toLowerCase().includes(query) ||
                    record.Completed.toLowerCase().includes(query) ||
                    record.Remaining.toLowerCase().includes(query) ||
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