<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Agents</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard/"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Super Admin
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Agents</li>
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
                    <div class="mb-2">
                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_agent"
                            class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add
                            New Agent</a>
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


            <!-- Agents list -->
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Agents List</h5>
                    <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                        <div class="dropdown me-3">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Select Status
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Available</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Not Available</a>
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
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
                                        placeholder="Search" aria-controls="DataTables_Table_0"></label></div>
                        </div>
                    </div>
                    <div class="custom-datatable-filter table-responsive">
                        <div class="dataTables_wrapper dt-bootstrap5 no-footer">
                            <a-table class="table datatable thead-light" :columns="columns" :data-source="paginatedData"
                                :pagination="false" :row-selection="rowSelection">
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'AgentID'">

                                        <div><a href="javascript:void(0);">{{ record.AgentID }}</a></div>
                                    </template>
                                    <template v-if="column.key === 'AgentName'">
                                        <div class="d-flex align-items-center file-name-icon">
                                            <a href="javascript:void(0);"
                                                class="avatar avatar-md border avatar-rounded">
                                                <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img">
                                            </a>
                                            <div class="ms-2">
                                                <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.AgentName
                                                }}</a></h6>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="column.key === 'Availability'">
                                        <span
                                            :class="[record.Availability === 'Available' ? 'badge badge-success' : 'badge badge-danger',]"
                                            class="d-inline-flex align-items-center badge-xs">
                                            <i class="ti ti-point-filled me-1"></i>{{ record.Availability }}
                                        </span>
                                    </template>
                                    <template v-if="column.key === 'action'">
                                        <div class="action-icon d-inline-flex">
                                            <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal"
                                                data-bs-target="#edit_agent"><i class="ti ti-edit"></i></a>
                                            <a href="javascript:void(0);" data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"><i class="ti ti-trash"></i></a>
                                        </div>
                                    </template>
                                </template>
                            </a-table>

                        </div>
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
            <!-- /Clients list -->

        </div>
        <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
            <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
            <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
        </div>
    </div>
    <!-- /Page Wrapper -->
    <agents-modal></agents-modal>
</template>

<script>
const columns = [
    {
        sorter: false,
    },
    {
        title: "Agent ID",
        dataIndex: "AgentID",
        key: "AgentID",
        sorter: {
            compare: (a, b) => {
                a = a.AgentID.toLowerCase();
                b = b.AgentID.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Agent Name",
        dataIndex: "AgentName",
        key: "AgentName",
        sorter: {
            compare: (a, b) => {
                a = a.AgentName.toLowerCase();
                b = b.AgentName.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
        sorter: {
            compare: (a, b) => {
                a = a.Email.toLowerCase();
                b = b.Email.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Role",
        dataIndex: "Role",
        key: "Role",
        sorter: {
            compare: (a, b) => {
                a = a.Role.toLowerCase();
                b = b.Role.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Tickets Assigned",
        dataIndex: "TicketsAssigned",
        key: "TicketsAssigned",
        sorter: {
            compare: (a, b) => {
                a = a.TicketsAssigned.toLowerCase();
                b = b.TicketsAssigned.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Tickets Resolved",
        dataIndex: "TicketsResolved",
        key: "TicketsResolved",
        sorter: {
            compare: (a, b) => {
                a = a.TicketsResolved.toLowerCase();
                b = b.TicketsResolved.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Availability",
        dataIndex: "Availability",
        key: "Availability",
        sorter: {
            compare: (a, b) => {
                a = a.Availability.toLowerCase();
                b = b.Availability.toLowerCase();
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
        "AgentID": "Agt-016",
        "Image": "agent-01.jpg",
        "AgentName": "William Parsons",
        "Email": "william@example.com",
        "Role": "Senior Support Agent",
        "TicketsAssigned": "30",
        "TicketsResolved": "20",
        "Availability": "Available",
    },
    {
        "key": "2",
        "AgentID": "Agt-015",
        "Image": "agent-02.jpg",
        "AgentName": "Lucille Tomberlin",
        "Email": "lucille@example.com",
        "Role": "Junior Support Agent",
        "TicketsAssigned": "20",
        "TicketsResolved": "10",
        "Availability": "Available",
    },
    {
        "key": "3",
        "AgentID": "Agt-014",
        "Image": "agent-03.jpg",
        "AgentName": "Frederick Johnson",
        "Email": "frederick@example.com",
        "Role": "Senior Support Agent",
        "TicketsAssigned": "10",
        "TicketsResolved": "8",
        "Availability": "Available",
    },
    {
        "key": "4",
        "AgentID": "Agt-013",
        "Image": "agent-04.jpg",
        "AgentName": "Sarah Henry",
        "Email": "sarah@example.com",
        "Role": "Junior Support Agent",
        "TicketsAssigned": "15",
        "TicketsResolved": "12",
        "Availability": "Available",
    },
    {
        "key": "5",
        "AgentID": "Agt-012",
        "Image": "agent-05.jpg",
        "AgentName": "Thomas Miller",
        "Email": "thomas@example.com",
        "Role": "Senior Support Agent",
        "TicketsAssigned": "25",
        "TicketsResolved": "20",
        "Availability": "Available",
    },
    {
        "key": "6",
        "AgentID": "Agt-011",
        "Image": "agent-06.jpg",
        "AgentName": "Melissa Shelton",
        "Email": "melissa@example.com",
        "Role": "Junior Support Agent",
        "TicketsAssigned": "32",
        "TicketsResolved": "30",
        "Availability": "Available",
    },
    {
        "key": "7",
        "AgentID": "Agt-010",
        "Image": "agent-07.jpg",
        "AgentName": "James Rodriguez",
        "Email": "james@example.com",
        "Role": "Senior Support Agent",
        "TicketsAssigned": "12",
        "TicketsResolved": "10",
        "Availability": "Available",
    },
    {
        "key": "8",
        "AgentID": "Agt-009",
        "Image": "agent-08.jpg",
        "AgentName": "Regina Chavez",
        "Email": "regina@example.com",
        "Role": "Junior Support Agent",
        "TicketsAssigned": "8",
        "TicketsResolved": "5",
        "Availability": "Not Available",
    },
    {
        "key": "9",
        "AgentID": "Agt-008",
        "Image": "agent-09.jpg",
        "AgentName": "Joshua Dillon",
        "Email": "joshua@example.com",
        "Role": "Senior Support Agent",
        "TicketsAssigned": "16",
        "TicketsResolved": "14",
        "Availability": "Available",
    },
    {
        "key": "10",
        "AgentID": "Agt-007",
        "Image": "agent-10.jpg",
        "AgentName": "Diana Riddle",
        "Email": "diana@example.com",
        "Role": "Junior Support Agent",
        "TicketsAssigned": "22",
        "TicketsResolved": "18",
        "Availability": "Available",
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
            return new URL(`/src/assets/img/agents/${imageName}`, import.meta.url).href;
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
                    record.AgentID.toLowerCase().includes(query) ||
                    record.AgentName.toLowerCase().includes(query) ||
                    record.Email.toLowerCase().includes(query) ||
                    record.Role.toLowerCase().includes(query) ||
                    record.TicketsAssigned.toLowerCase().includes(query) ||
                    record.TicketsResolved.toLowerCase().includes(query) ||
                    record.Availability.toLowerCase().includes(query)
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