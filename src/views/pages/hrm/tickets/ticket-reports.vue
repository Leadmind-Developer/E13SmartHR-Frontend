<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Ticket Report</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Tickets
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Ticket Report</li>
                        </ol>
                    </nav>
                </div>
                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                    <div class="mb-2">
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
                    <div class="head-icons ms-2">
                        <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
                            <i class="ti ti-chevrons-up"></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /Breadcrumb -->

            <div class="row">

                <!-- Total Exponses -->
                <div class="col-lg-6 col-md-6 d-flex">
                    <div class="row flex-fill">
                        <div class="col-lg-4 col-md-6 d-flex">
                            <div class="ticket-report-card flex-fill d-flex">
                                <div class="card-content flex-fill">
                                    <div>
                                        <div class="mb-2">
                                            <span class="fs-14 fw-normal text-truncate text-body mb-1">Total
                                                Projects</span>
                                            <h5>240</h5>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="badge badge-success-transparent"><i
                                                class="ti ti-arrow-wave-right-up me-1"></i>+5.50%</span>
                                    </div>
                                </div>
                                <div class="ticket-report-card-icon">
                                    <i class="ti ti-ticket"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 d-flex">
                            <div class="ticket-report-card flex-fill d-flex">
                                <div class="card-content flex-fill">
                                    <div>
                                        <div class="mb-2">
                                            <span class="fs-14 fw-normal text-truncate text-body mb-1">Open
                                                Tickets</span>
                                            <h5>35</h5>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="badge badge-success-transparent"><i
                                                class="ti ti-arrow-wave-right-up me-1"></i>+2.10%</span>
                                    </div>
                                </div>
                                <div class="ticket-report-card-icon">
                                    <i class="ti ti-clock-hour-3"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 d-flex">
                            <div class="ticket-report-card flex-fill d-flex">
                                <div class="card-content flex-fill">
                                    <div>
                                        <div class="mb-2">
                                            <span class="fs-14 fw-normal text-truncate text-body mb-1"> Pending
                                                Tickets</span>
                                            <h5>15</h5>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="badge badge-danger-transparent"><i
                                                class="ti ti-arrow-wave-right-up me-1"></i>+3.40%</span>
                                    </div>
                                </div>
                                <div class="ticket-report-card-icon">
                                    <i class="ti ti-hourglass-empty"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 d-flex">
                            <div class="ticket-report-card flex-fill d-flex">
                                <div class="card-content flex-fill">
                                    <div>
                                        <div class="mb-2">
                                            <span class="fs-14 fw-normal text-truncate text-body mb-1">Resolved
                                                Tickets</span>
                                            <h5>170</h5>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="badge badge-success-transparent"><i
                                                class="ti ti-arrow-wave-right-up me-1"></i>+4.30%</span>
                                    </div>
                                </div>
                                <div class="ticket-report-card-icon">
                                    <i class="ti ti-checklist"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 d-flex">
                            <div class="ticket-report-card flex-fill d-flex">
                                <div class="card-content flex-fill">
                                    <div>
                                        <div class="mb-2">
                                            <span class="fs-14 fw-normal text-truncate text-body mb-1">SLA
                                                Breached</span>
                                            <h5>08</h5>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="badge badge-success-transparent"><i
                                                class="ti ti-arrow-wave-right-up me-1"></i>+1.20%</span>
                                    </div>
                                </div>
                                <div class="ticket-report-card-icon">
                                    <i class="ti ti-alert-triangle"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 d-flex">
                            <div class="ticket-report-card flex-fill d-flex">
                                <div class="card-content flex-fill">
                                    <div>
                                        <div class="mb-2">
                                            <span class="fs-14 fw-normal text-truncate text-body mb-1">Tickets
                                                Escalated</span>
                                            <h5>12</h5>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="badge badge-danger-transparent"><i
                                                class="ti ti-arrow-wave-right-up me-1"></i>+2.70%</span>
                                    </div>
                                </div>
                                <div class="ticket-report-card-icon">
                                    <i class="ti ti-user-share"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /Total Exponses -->

                <!-- Total Exponses -->
                <div class="col-lg-6 col-md-6 d-flex">
                    <div class="card flex-fill">
                        <div class="card-header border-0">
                            <div class="d-flex flex-wrap justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <h5><span class="me-2"><i class="ti ti-chart-bar text-danger"></i></span>Ticket
                                        Categories Vs Priority</h5>
                                </div>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown">
                                        This Year
                                    </a>
                                    <ul class="dropdown-menu  dropdown-menu-end p-2">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">2025</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">2024</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">2024</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div id="ticket-report">
                                <apexchart type="heatmap" height="260" :options="ticketReport.ticket"
                                    :series="ticketReport.series">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Total Exponses -->


            </div>

            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Ticket List</h5>
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
                                Select Tenant
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">BrightWave
                                        Innovations</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Stellar Dynamics</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Quantum Nexus</a>
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown me-3">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Select Priority
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Low</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Medium</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">High</a>
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
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Active</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Inactive</a>
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
                                <template v-if="column.key === 'TicketID'">
                                    <a href="javascript:void(0);">{{ record.TicketID }}</a>
                                </template>
                                <template v-if="column.key === 'Description'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Description }}</a>
                                        </h6>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Priority'">
                                    <span class="badge border" :class="{
                                        'border-pink text-pink': record.Priority === 'Critical',
                                        'border-warning text-warning': record.Priority === 'Medium',
                                        'border-danger text-danger': record.Priority === 'High',
                                        'border-success text-success': record.Priority === 'Low',
                                    }">
                                        <i class="ti ti-point-filled me-1"></i>{{ record.Priority }}</span>
                                </template>
                                <template v-if="column.key === 'Tenants'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrl(record.TenantsImage)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.Tenants }}</a>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Assignee'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrlOne(record.AssigneeImage)" class="img-fluid"
                                                alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <a class="fw-medium fs-14">{{ record.Assignee }}</a>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span class="badge d-inline-flex align-items-center badge-xs" :class="{
                                        'badge-warning': record.Status === 'On Hold',
                                        'badge-info': record.Status === 'Pending',
                                        'badge-success': record.Status === 'Closed',
                                        'badge-purple': record.Status === 'Open',
                                    }">
                                        <i class="ti ti-point-filled me-1"></i>{{ record.Status }}
                                    </span>
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
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import { ticketReport } from "./data";
const columns = [
    {
        sorter: false,
    },
    {
        title: "Ticket ID",
        dataIndex: "TicketID",
        key: "TicketID",
        sorter: {
            compare: (a, b) => {
                a = a.TicketID.toLowerCase();
                b = b.TicketID.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Description",
        dataIndex: "Description",
        key: "Description",
        sorter: {
            compare: (a, b) => {
                a = a.Description.toLowerCase();
                b = b.Description.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Priority",
        dataIndex: "Priority",
        key: "Priority",
        sorter: {
            compare: (a, b) => {
                a = a.Priority.toLowerCase();
                b = b.Priority.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Tenants",
        dataIndex: "Tenants",
        key: "Tenants",
        sorter: {
            compare: (a, b) => {
                a = a.Tenants.toLowerCase();
                b = b.Tenants.toLowerCase();
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
        title: "Assignee",
        dataIndex: "Assignee",
        key: "Assignee",
        sorter: {
            compare: (a, b) => {
                a = a.Assignee.toLowerCase();
                b = b.Assignee.toLowerCase();
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
        "TicketID": "#TIC016",
        "Description": "Login not working",
        "Priority": "Critical",
        "Tenants": "BrightWave Innovations",
        "TenantsImage": "company-01.svg",
        "Date": "15 Dec 2025",
        "Assignee": "William Parsons",
        "AssigneeImage": "user-01.jpg",
        "Status": "Closed"
    },
    {
        "key": "2",
        "TicketID": "#TIC015",
        "Description": "HR module not loading",
        "Priority": "High",
        "Tenants": "Stellar Dynamics",
        "TenantsImage": "company-02.svg",
        "Date": "10 Dec 2025",
        "Assignee": "Lucille Tomberlin",
        "AssigneeImage": "user-02.jpg",
        "Status": "Open"
    },
    {
        "key": "3",
        "TicketID": "#TIC014",
        "Description": "Billing amount incorrect",
        "Priority": "Medium",
        "Tenants": "Quantum Nexus",
        "TenantsImage": "company-03.svg",
        "Date": "08 Dec 2025",
        "Assignee": "Frederick Johnson",
        "AssigneeImage": "user-03.jpg",
        "Status": "Closed"
    },
    {
        "key": "4",
        "TicketID": "#TIC-013",
        "Description": "Session Expiring Quickly",
        "Priority": "High",
        "Tenants": "EcoVision Enterprises",
        "TenantsImage": "company-04.svg",
        "Date": "01 Dec 2025",
        "Assignee": "Sarah Henry",
        "AssigneeImage": "user-04.jpg",
        "Status": "Pending"
    },
    {
        "key": "5",
        "TicketID": "#TIC012",
        "Description": "Unable to access dashboard",
        "Priority": "Critical",
        "Tenants": "Aurora Technologies",
        "TenantsImage": "company-05.svg",
        "Date": "26 Nov 2025",
        "Assignee": "Thomas Miller",
        "AssigneeImage": "user-05.jpg",
        "Status": "Open"
    },
    {
        "key": "6",
        "TicketID": "#TIC011",
        "Description": "Data Sync Issue",
        "Priority": "High",
        "Tenants": "BlueSky Ventures",
        "TenantsImage": "company-06.svg",
        "Date": "18 Nov 2025",
        "Assignee": "Melissa Shelton",
        "AssigneeImage": "user-06.jpg",
        "Status": "On Hold"
    },
    {
        "key": "7",
        "TicketID": "#TIC010",
        "Description": "Widgets Missing",
        "Priority": "Medium",
        "Tenants": "TerraFusion Energy",
        "TenantsImage": "company-07.svg",
        "Date": "03 Nov 2025",
        "Assignee": "James Rodriguez",
        "AssigneeImage": "user-07.jpg",
        "Status": "Open"
    },
    {
        "key": "8",
        "TicketID": "#TIC009",
        "Description": "Payment Failed",
        "Priority": "High",
        "Tenants": "UrbanPulse Design",
        "TenantsImage": "company-08.svg",
        "Date": "29 Oct 2025",
        "Assignee": "Regina Chavez",
        "AssigneeImage": "user-08.jpg",
        "Status": "Closed"
    },
    {
        "key": "9",
        "TicketID": "#TIC008",
        "Description": "Subscription Not Updating",
        "Priority": "Low",
        "Tenants": "Nimbus Networks",
        "TenantsImage": "company-09.svg",
        "Date": "25 Oct 2025",
        "Assignee": "Joshua Dillon",
        "AssigneeImage": "user-09.jpg",
        "Status": "Pending"
    },
    {
        "key": "10",
        "TicketID": "#TIC007",
        "Description": "Data Export Blank",
        "Priority": "High",
        "Tenants": "Epicurean Delights",
        "TenantsImage": "company-10.svg",
        "Date": "17 Oct 2025",
        "Assignee": "Diana Riddle",
        "AssigneeImage": "user-10.jpg",
        "Status": "On Hold"
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
            ticketReport: ticketReport

        };
    },
    methods: {
        getImageUrl(imageName) {
            return new URL(`/src/assets/img/company/${imageName}`, import.meta.url).href;
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
                    record.TicketID.toLowerCase().includes(query) ||
                    record.Description.toLowerCase().includes(query) ||
                    record.Priority.toLowerCase().includes(query) ||
                    record.Tenants.toLowerCase().includes(query) ||
                    record.Date.toLowerCase().includes(query) ||
                    record.Assignee.toLowerCase().includes(query) ||
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