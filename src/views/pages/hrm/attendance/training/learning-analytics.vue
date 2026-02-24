<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Learning Analytics</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Training
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Learning Analytics</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <!-- /Breadcrumb -->

            <div class="row">

                <!-- Total Exponses -->
                <div class="col-xxl-5 col-lg-12 col-md-12 d-flex">
                    <div class="card flex-fill">
                        <div class="card-header border-0">
                            <div class="d-flex flex-wrap justify-content-between align-items-center">
                                <div class="d-flex align-items-center ">
                                    <h5>Learning Employees</h5>
                                </div>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="btn btn-white border d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar me-1"></i>2025
                                    </a>
                                    <ul class="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">2024</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">2023</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">2022</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body py-0">
                            <div id="learn-employee">
                                <apexchart type="line" height="320" :options="learnEmployee.learn"
                                    :series="learnEmployee.series"></apexchart>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Total Exponses -->

                <!-- Total Exponses -->
                <div class="col-xxl-7 col-lg-12 col-md-12 d-flex">
                    <div class="row flex-fill">
                        <div class="col-lg-5 col-md-6 d-flex">
                            <div class="card flex-fill">
                                <div class="card-body pb-0">
                                    <div class="d-flex flex-column align-items-center">
                                        <div
                                            class="p-2 rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-2">
                                            <i class="ti ti-certificate fs-22"></i>
                                        </div>
                                        <p class="fw-semibold text-dark mb-1">Certification Completed</p>
                                        <div class="fw-bold text-dark fs-24 mb-1">225</div>
                                        <span
                                            class="badge badge-soft-success rounded-pill border border-success mb-1"><i
                                                class="ti ti-arrow-up"></i>12%</span>
                                        <p class="fs-12 fw-normal d-flex align-items-center text-truncate">from last
                                            month</p>
                                    </div>
                                    <div id="certification-chart">
                                        <apexchart type="area" height="230" :options="certificationChart.certification"
                                            :series="certificationChart.series"></apexchart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-6 d-flex">
                            <div class="card flex-fill">
                                <div class="card-body">
                                    <div class="card-header border-0 p-0">
                                        <div
                                            class="d-flex flex-wrap justify-content-between align-items-center row-gap-3">
                                            <div class="d-flex align-items-center ">
                                                <h5>Highly Enrolled Courses</h5>
                                            </div>
                                            <div class="dropdown">
                                                <a href="javascript:void(0);"
                                                    class="btn btn-white border d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown">
                                                    <i class="ti ti-calendar me-1"></i>2025
                                                </a>
                                                <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                    <li>
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-item rounded-1">2024</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-item rounded-1">2023</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-item rounded-1">2022</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body py-0">
                                        <div id="enroll-course">
                                            <apexchart type="bar" height="280" :options="enrollCourse.enroll"
                                                :series="enrollCourse.series"></apexchart>
                                        </div>
                                        <div>
                                            <p><i class="ti ti-point-filled me-1 text-info"></i>No of Employees
                                                increased by <span class="text-success">+20%</span> from last Week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /Total Exponses -->


            </div>

            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Learning Employee List</h5>
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
                                <template v-if="column.key === 'TrainingCourse'">
                                    <div>
                                        <p class="fw-medium text-dark mb-0">{{ record.TrainingCourse }}</p>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span class="d-inline-flex align-items-center badge-xs" :class="[
                                        'badge',
                                        record.Status === 'Completed'
                                            ? 'badge-success-transparent'
                                            : record.Status === 'In Progress'
                                                ? 'badge-info-transparent'
                                                : record.Status === 'Not Started'
                                                    ? 'badge-purple-transparent'
                                                    : ''
                                    ]">
                                        {{ record.Status }}
                                    </span>
                                </template>
                                <template v-if="column.key === 'Certificate'">
                                    <template v-if="record.EmployeeName === 'Brian Villalobos' || record.EmployeeName === 'Harvey Smith'
                                        || record.EmployeeName === 'Doglas Martini' || record.EmployeeName === 'Elliot Murray'
                                        || record.EmployeeName === 'Connie Waters'">
                                        -
                                    </template>
                                    <template v-else>
                                        <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                            <i class="ti ti-point-filled me-1"></i>{{ record.Certificate }}
                                        </span>
                                    </template>
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
</template>
<script>
const data = [
    {
        "key": "1",
        "EmployeeName": "Anthony Lewis",
        "EmployeeImage": "user-11.jpg",
        "Designation": "Accountant",
        "TrainingCourse": "Git Training",
        "Status": "Completed",
        "Score": "80",
        "CompletionDate": "14 Jun 2025",
        "Feedback": "Good",
        "Attempts": "01",
        "Certificate": "Issued"
    },
    {
        "key": "2",
        "EmployeeName": "Brian Villalobos",
        "EmployeeImage": "user-13.jpg",
        "Designation": "App Developer",
        "TrainingCourse": "HTML Training",
        "Status": "In Progress",
        "Score": "-",
        "CompletionDate": "-",
        "Feedback": "-",
        "Attempts": "-",
        "Certificate": "-"
    },
    {
        "key": "3",
        "EmployeeName": "Harvey Smith",
        "EmployeeImage": "user-12.jpg",
        "Designation": "Technician",
        "TrainingCourse": "React Training",
        "Status": "Not Started",
        "Score": "-",
        "CompletionDate": "-",
        "Feedback": "-",
        "Attempts": "-",
        "Certificate": "-"
    },
    {
        "key": "4",
        "EmployeeName": "Stephan Peralt",
        "EmployeeImage": "user-16.jpg",
        "Designation": "Web Developer",
        "TrainingCourse": "Nodejs Training",
        "Status": "Completed",
        "Score": "90",
        "CompletionDate": "28 Apr 2025",
        "Feedback": "Excellent",
        "Attempts": "02",
        "Certificate": "Issued"
    },
    {
        "key": "5",
        "EmployeeName": "Doglas Martini",
        "EmployeeImage": "user-15.jpg",
        "Designation": "Sales Executive Officer",
        "TrainingCourse": "Django Training",
        "Status": "Not Started",
        "Score": "-",
        "CompletionDate": "-",
        "Feedback": "-",
        "Attempts": "-",
        "Certificate": "-"
    },
    {
        "key": "6",
        "EmployeeName": "Linda Ray",
        "EmployeeImage": "user-14.jpg",
        "Designation": "Designer",
        "TrainingCourse": "Java Training",
        "Status": "Completed",
        "Score": "85",
        "CompletionDate": "20 Mar 2025",
        "Feedback": "Excellent",
        "Attempts": "01",
        "Certificate": "Issued"
    },
    {
        "key": "7",
        "EmployeeName": "Elliot Murray",
        "EmployeeImage": "user-17.jpg",
        "Designation": "Account Manager",
        "TrainingCourse": "MySQL Training",
        "Status": "Not Started",
        "Score": "-",
        "CompletionDate": "-",
        "Feedback": "-",
        "Attempts": "-",
        "Certificate": "-"
    },
    {
        "key": "8",
        "EmployeeName": "Rebecca Smtih",
        "EmployeeImage": "user-18.jpg",
        "Designation": "SEO Analyst",
        "TrainingCourse": "DevOps Training",
        "Status": "Completed",
        "Score": "70",
        "CompletionDate": "17 Feb 2025",
        "Feedback": "Good",
        "Attempts": "02",
        "Certificate": "Issued"
    },
    {
        "key": "9",
        "EmployeeName": "Connie Waters",
        "EmployeeImage": "user-20.jpg",
        "Designation": "Admin",
        "TrainingCourse": "Angular Training",
        "Status": "In Progress",
        "Score": "-",
        "CompletionDate": "-",
        "Feedback": "-",
        "Attempts": "-",
        "Certificate": "-"
    },
    {
        "key": "10",
        "EmployeeName": "Lori Broaddus",
        "EmployeeImage": "user-19.jpg",
        "Designation": "Business Analyst",
        "TrainingCourse": "Vuejs Training",
        "Status": "Completed",
        "Score": "95",
        "CompletionDate": "24 Jan 2025",
        "Feedback": "Excellent",
        "Attempts": "01",
        "Certificate": "Issued"
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
        title: "Training Course",
        dataIndex: "TrainingCourse",
        key: "TrainingCourse",
        sorter: {
            compare: (a, b) => {
                a = a.TrainingCourse.toLowerCase();
                b = b.TrainingCourse.toLowerCase();
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
        title: "Score(%)",
        dataIndex: "Score",
        key: "Score",
        sorter: {
            compare: (a, b) => {
                a = a.Score.toLowerCase();
                b = b.Score.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Completion Date",
        dataIndex: "CompletionDate",
        key: "CompletionDate",
        sorter: {
            compare: (a, b) => {
                a = a.CompletionDate.toLowerCase();
                b = b.CompletionDate.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Feedback",
        dataIndex: "Feedback",
        key: "Feedback",
        sorter: {
            compare: (a, b) => {
                a = a.Feedback.toLowerCase();
                b = b.Feedback.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Attempts",
        dataIndex: "Attempts",
        key: "Attempts",
        sorter: {
            compare: (a, b) => {
                a = a.Attempts.toLowerCase();
                b = b.Attempts.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Certificate",
        dataIndex: "Certificate",
        key: "Certificate",
        sorter: {
            compare: (a, b) => {
                a = a.Certificate.toLowerCase();
                b = b.Certificate.toLowerCase();
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
import { learnEmployee, certificationChart, enrollCourse } from "./data"
export default {
    data() {
        return {
            data,
            columns,
            rowSelection,
            searchQuery: '',
            currentPage: 1,
            pageSize: 10,
            learnEmployee,
            certificationChart,
            enrollCourse
        }
    },
    methods: {
        getImageUrl(imageName) {
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
                    record.Designation.toLowerCase().includes(query) ||
                    record.TrainingCourse.toLowerCase().includes(query) ||
                    record.CompletionDate.toLowerCase().includes(query) ||
                    record.Status.toLowerCase().includes(query) ||
                    record.Score.toLowerCase().includes(query) ||
                    record.Feedback.toLowerCase().includes(query) ||
                    record.Attempts.toLowerCase().includes(query) ||
                    record.Certificate.toLowerCase().includes(query)
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