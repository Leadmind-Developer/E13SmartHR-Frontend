<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Campus Hiring</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard/"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Recruitment
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Campus Hiring</li>
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
                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_candidate"
                            class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add
                            New Candidate</a>
                    </div>
                    <div class="head-icons ms-2">
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
                    <h5>Students List</h5>
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
                                Role
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
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Sales Executive
                                        Officer</a>
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown me-3">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Select Status
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Applied</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">In progress</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Selected</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Rejected</a>
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
                            :pagination="false" :row-selection="rowSelection">
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'StudentName'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrl(record.StudentImage)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.StudentName }}</a>
                                            <span class="d-block">{{ record.Email }}</span>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'RecruiterName'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrlOne(record.RecruiterImage)" class="img-fluid"
                                                alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.RecruiterName }}</a>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span :class="[
                                        'badge border', record.Status === 'Applied' ?
                                            'border-pink text-pink' : record.Status === 'Shortlisted' ?
                                                'border-info text-info' : record.Status === 'In progress' ?
                                                    'border-success text-success' : record.Status === 'Selected' ?
                                                        'border-danger text-danger' : record.Status === 'Rejected' ?
                                                            'border-secondary text-secondary' : 'border-purple text-purple'
                                    ]" class="d-inline-flex align-items-center badge-xs">
                                        <i class="ti ti-point-filled me-1"></i>
                                        {{ record.Status }}
                                    </span>
                                </template>

                                <template v-if="column.key === 'action'">
                                    <div class="action-icon d-inline-flex">
                                        <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                            data-bs-target="#edit_candidate"><i class="ti ti-edit"></i></a>
                                        <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                            data-bs-target="#delete_modal"><i class="ti ti-trash"></i></a>
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
    <campus-hiring-modal></campus-hiring-modal>
</template>
<script>
const columns = [
    {
        sorter: false,
    },
    {
        title: "Student Name",
        dataIndex: "StudentName",
        key: "StudentName",
        sorter: {
            compare: (a, b) => {
                a = a.StudentName.toLowerCase();
                b = b.StudentName.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Branch",
        dataIndex: "Branch",
        key: "Branch",
        sorter: {
            compare: (a, b) => {
                a = a.Branch.toLowerCase();
                b = b.Branch.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Graduation Year",
        dataIndex: "GraduationYear",
        key: "GraduationYear",
        sorter: {
            compare: (a, b) => {
                a = a.GraduationYear.toLowerCase();
                b = b.GraduationYear.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Job Role",
        dataIndex: "JobRole",
        key: "JobRole",
        sorter: {
            compare: (a, b) => {
                a = a.JobRole.toLowerCase();
                b = b.JobRole.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Recruiter Name",
        dataIndex: "RecruiterName",
        key: "RecruiterName",
        sorter: {
            compare: (a, b) => {
                a = a.RecruiterName.toLowerCase();
                b = b.RecruiterName.toLowerCase();
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
        "StudentName": "Harold Gaynor",
        "StudentImage": "user-01.jpg",
        "Email": "harold@example.com",
        "Branch": "B.E/CSE",
        "GraduationYear": "2025",
        "JobRole": "Accountant",
        "RecruiterName": "Anthony Lewis",
        "RecruiterImage": "user-11.jpg",
        "Status": "Applied",
    },
    {
        "key": "2",
        "StudentName": "Sandra Ornellas",
        "StudentImage": "user-02.jpg",
        "Email": "sandra@example.com",
        "Branch": "B.Tech/IT",
        "GraduationYear": "2025",
        "JobRole": "App Developer",
        "RecruiterName": "Brian Villalobos",
        "RecruiterImage": "user-13.jpg",
        "Status": "Shortlisted",
    },
    {
        "key": "3",
        "StudentName": "John Harris",
        "StudentImage": "user-03.jpg",
        "Email": "john@example.com",
        "Branch": "B.E/CSE",
        "GraduationYear": "2025",
        "JobRole": "Technician",
        "RecruiterName": "Harvey Smith",
        "RecruiterImage": "user-12.jpg",
        "Status": "In progress",
    },
    {
        "key": "4",
        "StudentName": "Whitney Barnette",
        "StudentImage": "user-04.jpg",
        "Email": "whitney@example.com",
        "Branch": "B.E/CSE",
        "GraduationYear": "2025",
        "JobRole": "Web Developer",
        "RecruiterName": "Stephan Peralt",
        "RecruiterImage": "user-16.jpg",
        "Status": "Applied",
    },
    {
        "key": "5",
        "StudentName": "Richard Thompson",
        "StudentImage": "user-05.jpg",
        "Email": "richard@example.com",
        "Branch": "B.E/CSE",
        "GraduationYear": "2024",
        "JobRole": "Sales Executive Officer",
        "RecruiterName": "Doglas Martini",
        "RecruiterImage": "user-15.jpg",
        "Status": "Selected",
    },
    {
        "key": "6",
        "StudentName": "Kerry Drake",
        "StudentImage": "user-06.jpg",
        "Email": "kerry@example.com",
        "Branch": "B.Tech/IT",
        "GraduationYear": "2025",
        "JobRole": "Designer",
        "RecruiterName": "Linda Ray",
        "RecruiterImage": "user-14.jpg",
        "Status": "Rejected",
    },
    {
        "key": "7",
        "StudentName": "David Carmona",
        "StudentImage": "user-07.jpg",
        "Email": "david@example.com",
        "Branch": "B.E/CSE",
        "GraduationYear": "2025",
        "JobRole": "Account Manager",
        "RecruiterName": "Elliot Murray",
        "RecruiterImage": "user-17.jpg",
        "Status": "In progress",
    },
    {
        "key": "8",
        "StudentName": "Margaret Soto",
        "StudentImage": "user-08.jpg",
        "Email": "margaret@example.com",
        "Branch": "B.Tech/IT",
        "GraduationYear": "2024",
        "JobRole": "SEO Analyst",
        "RecruiterName": "Rebecca Smtih",
        "RecruiterImage": "user-18.jpg",
        "Status": "Shortlisted",
    },
    {
        "key": "9",
        "StudentName": "Jeffrey Thaler",
        "StudentImage": "user-09.jpg",
        "Email": "jeffrey@example.com",
        "Branch": "B.E/CSE",
        "GraduationYear": "2025",
        "JobRole": "Admin",
        "RecruiterName": "Connie Waters",
        "RecruiterImage": "user-20.jpg",
        "Status": "Selected",
    },
    {
        "key": "10",
        "StudentName": "Joyce Golston",
        "StudentImage": "user-10.jpg",
        "Email": "joyce@example.com",
        "Branch": "B.Tech/IT",
        "GraduationYear": "2025",
        "JobRole": "Business Analyst",
        "RecruiterName": "Lori Broaddus",
        "RecruiterImage": "user-19.jpg",
        "Status": "In progress",
    }
];
const rowSelection = {
    onChange: () => { },
    onSelect: () => { },
    onSelectAll: () => { },
};
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
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
    computed: {
        filteredPages() {
            const query = this.searchQuery.toLowerCase();
            return this.data.filter((record) => {
                return (
                    record.StudentName.toLowerCase().includes(query) ||
                    record.Email.toLowerCase().includes(query) ||
                    record.Branch.toLowerCase().includes(query) ||
                    record.GraduationYear.toLowerCase().includes(query) ||
                    record.JobRole.toLowerCase().includes(query) ||
                    record.RecruiterName.toLowerCase().includes(query) ||
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