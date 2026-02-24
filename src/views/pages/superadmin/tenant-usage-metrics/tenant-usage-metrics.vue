<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Tenant Usage Metrics</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard/"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Superadmin
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Tenant Usage Metrics</li>
                        </ol>
                    </nav>
                </div>
                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                    <div class="me-2 mb-2">
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
                    <div class="head-icons">
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
                    <h5>Tenants Usage List</h5>
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
                                Select Plan
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Advanced (Monthly)</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Basic (Yearly)</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Enterprise
                                        (Monthly)</a>
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
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">InActive</a>
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
                                <template v-if="column.key === 'Tenants'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border rounded-circle">
                                            <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Tenants }}</a>
                                            </h6>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Plan'">
                                    <div class="d-flex justify-content-between align-items-center gap-2">
                                        <span>{{ record.Plan }}</span>
                                        <span class="badge badge-purple">{{ record.PlanUpgrade }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span :class="['badge', record.Status === 'Active' ? 'badge-success' : record.Status === 'Inactive' ?
                                        'badge-danger' : 'd-inline-flex', 'align-items-center', 'badge-xs',]">
                                        <i class="ti ti-point-filled me-1"></i>
                                        {{ record.Status }}
                                    </span>
                                </template>
                                <template v-if="column.key === 'action'">
                                    <div class="action-icon d-inline-flex">
                                        <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                            data-bs-target="#view_details"><i class="ti ti-eye"></i></a>
                                        <a href="javascript:void(0);" class="me-2"><i class="ti ti-refresh"></i></a>
                                        <a href="javascript:void(0);" data-bs-toggle="modal"
                                            data-bs-target="#delete_modal"><i class="ti ti-ban"></i></a>
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
    <!-- View Invoice -->
    <div class="modal fade" id="view_details">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Tenant Usage Detail</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between align-items-center p-4 mb-4">
                        <div class="d-flex align-items-center file-name-icon">
                            <span class="avatar avatar-lg border rounded-circle">
                                <img src="@/assets/img/company/company-01.svg" class="img-fluid" alt="img">
                            </span>
                            <div class="ms-2">
                                <h6 class="fw-medium"><a href="javascript:void(0);">BrightWave Innovations</a></h6>
                                <p class="text-gray-5 fs-14">michael@example.com</p>
                            </div>
                        </div>
                        <div>
                            <span class="badge badge-success dlign-items-center badge-xs">
                                <i class="ti ti-point-filled me-1"></i>Active
                            </span>
                        </div>
                    </div>
                    <div class="row row-gap-3 mb-4">
                        <div class="col-md-12 col-lg-6">
                            <h5 class="mb-3">Storage Usage Info</h5>
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <div class="mb-3 ">
                                        <div id="tenant_chart"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p class="mb-0 text-gray-5">
                                                <i class="ti ti-circle-filled fs-8 text-secondary me-2"></i>
                                                Database :
                                            </p>
                                            <span class="text-gray-9 fw-medium ms-2 fs-14">4.34 GB</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p class="mb-0 text-gray-5">
                                                <i class="ti ti-circle-filled fs-8 text-skyblue me-2"></i>
                                                Image :
                                            </p>
                                            <span class="text-gray-9 fw-medium ms-2 fs-14">3.10 GB</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p class="mb-0 text-gray-5">
                                                <i class="ti ti-circle-filled fs-8 text-info me-2"></i>
                                                Videos :
                                            </p>
                                            <span class="text-gray-9 fw-medium ms-2 fs-14">2.48 GB</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p class="mb-0 text-gray-5 text-nowrap">
                                                <i class="ti ti-circle-filled fs-8 text-warning me-2"></i>
                                                Documentation :
                                            </p>
                                            <span class="text-gray-9 fw-medium ms-2 fs-14 text-nowrap">1.86 GB</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p class="mb-0 text-gray-5">
                                                <i class="ti ti-circle-filled fs-8 text-primary me-2"></i>
                                                Audio :
                                            </p>
                                            <span class="text-gray-9 fw-medium ms-2 fs-14">0.62 GB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <h5 class="mb-3">Notificatoions Info</h5>
                            <div class="row align-items-center">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <div class="notification-chart">
                                            <div class="tenent-chart">
                                                <div
                                                    class="text-center d-flex align-items-center justify-content-center flex-column bg-primary rounded-circle chart-stage-1">
                                                    <h6 class="text-white">540</h6>
                                                </div>
                                                <div
                                                    class="text-center d-flex align-items-center justify-content-center flex-column bg-transparent-purple rounded-circle chart-stage-3">
                                                    <h6 class="text-purple">920</h6>
                                                </div>
                                                <div
                                                    class="text-center d-flex align-items-center justify-content-center flex-column bg-transparent-skyblue rounded-circle chart-stage-4">
                                                    <h6 class="text-skyblue">310</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-around align-items-center mt-5 pt-3">
                                        <p class="mb-0 text-gray-5">
                                            <i class="ti ti-circle-filled fs-8 text-primary me-2"></i>
                                            Push
                                        </p>
                                        <p class="mb-0 text-gray-5">
                                            <i class="ti ti-circle-filled fs-8 text-purple me-2"></i>
                                            Push
                                        </p>
                                        <p class="mb-0 text-gray-5">
                                            <i class="ti ti-circle-filled fs-8 text-skyblue me-2"></i>
                                            SMS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-light p-4">
                        <div class="border-bottom mb-4">
                            <h6 class="fw-medium mb-3">Basic Info</h6>
                            <div class="row row-gap-3  mb-4">
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Active Users</p>
                                    <span class="text-gray-9">82</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Total Logins</p>
                                    <span class="text-gray-9">18,230</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Avg. Session Duration</p>
                                    <span class="text-gray-9">30 mins</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Peak Usage Time</p>
                                    <span class="text-gray-9">10:00 AM – 12:00 PM</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-bottom mb-4">
                            <h6 class="fw-medium mb-3">Most Module Usage Info</h6>
                            <div class="row row-gap-3  mb-4">
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">HR Module</p>
                                    <span class="text-gray-9">2,430 actions</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Payroll Module</p>
                                    <span class="text-gray-9">1,810 actions</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Attendance Module</p>
                                    <span class="text-gray-9">680 actions</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Contacts</p>
                                    <span class="text-gray-9">540 actions</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-bottom mb-4">
                            <h6 class="fw-medium mb-3">API Usage Info</h6>
                            <div class="row row-gap-3  mb-4">
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">API Calls</p>
                                    <span class="text-gray-9">18,230</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Records Created</p>
                                    <span class="text-gray-9">4,920</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Records Updated</p>
                                    <span class="text-gray-9">1,110</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Records Deleted</p>
                                    <span class="text-gray-9">210</span>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <h6 class="fw-medium mb-3">Tickets Info</h6>
                            <div class="row row-gap-3">
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Total Tickets</p>
                                    <span class="text-gray-9">20</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Tickets Resolved</p>
                                    <span class="text-gray-9">15</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Tickets Pending</p>
                                    <span class="text-gray-9">5</span>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <p class="fs-12 mb-0 text-gray-5">Avg. Resolution Time</p>
                                    <span class="text-gray-9">6 hrs 20 mins</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /View Invoice -->

    <!-- Delete Modal -->
    <div class="modal fade" id="delete_modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <span class="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                        <i class="ti ti-trash-x fs-36"></i>
                    </span>
                    <h4 class="mb-1">Confirm Delete</h4>
                    <p class="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
                    <div class="d-flex justify-content-center">
                        <a href="javascript:void(0);" class="btn btn-light me-3" data-bs-dismiss="modal">Cancel</a>
                        <a href="javascript:void(0);" class="btn btn-danger" data-bs-dismiss="modal">Yes, Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Delete Modal -->
</template>
<script>
const columns = [
    {
        sorter: false,
    },
    {
        title: "Tenants",
        dataIndex: "Tenants",
        key: "Tenants",
        sorter: {
            compare: (a, b) => {
                a = a.Tenants.toLowerCase();
                b = b.AgentID.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Plan",
        dataIndex: "Plan",
        key: "Plan",
        sorter: {
            compare: (a, b) => {
                a = a.Plan.toLowerCase();
                b = b.Plan.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Active Users",
        dataIndex: "ActiveUsers",
        key: "ActiveUsers",
        sorter: {
            compare: (a, b) => {
                a = a.ActiveUsers.toLowerCase();
                b = b.ActiveUsers.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Most Module Usage",
        dataIndex: "MostModuleUsage",
        key: "MostModuleUsage",
        sorter: {
            compare: (a, b) => {
                a = a.MostModuleUsage.toLowerCase();
                b = b.MostModuleUsage.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Storage Usage",
        dataIndex: "StorageUsage",
        key: "StorageUsage",
        sorter: {
            compare: (a, b) => {
                a = a.StorageUsage.toLowerCase();
                b = b.StorageUsage.toLowerCase();
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
        "Image": "company-01.svg",
        "Tenants": "BrightWave Innovations",
        "Plan": "Advanced (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "82",
        "MostModuleUsage": "HRM, CRM",
        "StorageUsage": "12.4 GB",
        "Status": "Active",
    },
    {
        "key": "2",
        "Image": "company-02.svg",
        "Tenants": "Stellar Dynamics",
        "Plan": "Basic (Yearly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "90",
        "MostModuleUsage": "Recruitment",
        "StorageUsage": "10.8 GB",
        "Status": "Active",
    },
    {
        "key": "3",
        "Image": "company-03.svg",
        "Tenants": "Quantum Nexus",
        "Plan": "Advanced (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "104",
        "MostModuleUsage": "Finance & Accounts",
        "StorageUsage": "8.5 GB",
        "Status": "Active",
    },
    {
        "key": "4",
        "Image": "company-04.svg",
        "Tenants": "EcoVision Enterprises",
        "Plan": "Advanced (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "80",
        "MostModuleUsage": "HRM",
        "StorageUsage": "6.0 GB",
        "Status": "Active",
    },
    {
        "key": "5",
        "Image": "company-05.svg",
        "Tenants": "Aurora Technologies",
        "Plan": "Enterprise (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "120",
        "MostModuleUsage": "CRM",
        "StorageUsage": "15.2 GB",
        "Status": "Active",
    },
    {
        "key": "6",
        "Image": "company-06.svg",
        "Tenants": "BlueSky Ventures",
        "Plan": "Advanced (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "100",
        "MostModuleUsage": "Finance & Accounts",
        "StorageUsage": "12.5 GB",
        "Status": "Active",
    },
    {
        "key": "7",
        "Image": "company-07.svg",
        "Tenants": "TerraFusion Energy",
        "Plan": "Enterprise (Yearly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "110",
        "MostModuleUsage": "HRM, Recruitment",
        "StorageUsage": "10.7 GB",
        "Status": "Active",
    },
    {
        "key": "8",
        "Image": "company-08.svg",
        "Tenants": "UrbanPulse Design",
        "Plan": "Basic (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "125",
        "MostModuleUsage": "Recruitment",
        "StorageUsage": "9.4 GB",
        "Status": "Inactive",
    },
    {
        "key": "9",
        "Image": "company-09.svg",
        "Tenants": "Nimbus Networks",
        "Plan": "Basic (Yearly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "115",
        "MostModuleUsage": "HRM, CRM",
        "StorageUsage": "8.2 GB",
        "Status": "Active",
    },
    {
        "key": "10",
        "Image": "company-10.svg",
        "Tenants": "Epicurean Delights",
        "Plan": "Advanced (Monthly)",
        "PlanUpgrade": "Upgrade",
        "ActiveUsers": "85",
        "MostModuleUsage": "Finance & Accounts",
        "StorageUsage": "7.5 GB",
        "Status": "Active",
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
            return new URL(`/src/assets/img/company/${imageName}`, import.meta.url).href;
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
                    record.Tenants.toLowerCase().includes(query) ||
                    record.Plan.toLowerCase().includes(query) ||
                    record.PlanUpgrade.toLowerCase().includes(query) ||
                    record.ActiveUsers.toLowerCase().includes(query) ||
                    record.MostModuleUsage.toLowerCase().includes(query) ||
                    record.StorageUsage.toLowerCase().includes(query) ||
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