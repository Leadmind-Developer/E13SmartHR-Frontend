<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Resume Parsing</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard/"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Recruitment
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Resume Parsing</li>
                        </ol>
                    </nav>
                </div>
                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                    <div class="mb-2 me-2">
                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                <i class="ti ti-file-export me-1"></i>Export
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="#" class="dropdown-item rounded-1"><i
                                            class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                </li>
                                <li>
                                    <a href="#" class="dropdown-item rounded-1"><i
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

            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Resume List</h5>
                    <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                        <div class="input-icon position-relative me-3">
                            <span class="input-icon-addon">
                                <i class="ti ti-calendar text-gray-9"></i>
                            </span>
                            <input type="text" class="form-control date-range bookingrange" ref="dateRangeInput"
                                placeholder="dd/mm/yyyy - dd/mm/yyyy">
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
                            :pagination="false" :row-selection="rowSelection">
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'Candidate'">
                                    <div class="d-flex align-items-center file-name-icon">
                                        <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                            <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img">
                                        </a>
                                        <div class="ms-2">
                                            <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Candidate
                                                    }}</a></h6>
                                            <span class="fs-12 fw-normal ">{{ record.Email }}</span>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <span
                                        class="badge rounded bg-outline-info d-inline-flex align-items-center badge-xs">
                                        <i class="ti ti-point-filled me-1"></i>Parsed
                                    </span>
                                </template>
                                <template v-if="column.key === 'action'">
                                    <div class="action-icon d-inline-flex">
                                        <a href="javascript:void(0);" class="me-2"><i
                                                class="ti ti-file-invoice"></i></a>
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
</template>
<script>
const columns = [
    {
        sorter: false,
    },
    {
        title: "Cand ID",
        dataIndex: "CandID",
        key: "CandID",
        sorter: {
            compare: (a, b) => {
                a = a.CandID.toLowerCase();
                b = b.CandID.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Candidate",
        dataIndex: "Candidate",
        key: "Candidate",
        sorter: {
            compare: (a, b) => {
                a = a.Candidate.toLowerCase();
                b = b.Candidate.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Applied Role",
        dataIndex: "AppliedRole",
        key: "AppliedRole",
        sorter: {
            compare: (a, b) => {
                a = a.AppliedRole.toLowerCase();
                b = b.AppliedRole.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Phone",
        dataIndex: "Phone",
        key: "Phone",
        sorter: {
            compare: (a, b) => {
                a = a.Phone.toLowerCase();
                b = b.Phone.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Expereience",
        dataIndex: "Expereience",
        key: "Expereience",
        sorter: {
            compare: (a, b) => {
                a = a.Expereience.toLowerCase();
                b = b.Expereience.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Location",
        dataIndex: "Location",
        key: "Location",
        sorter: {
            compare: (a, b) => {
                a = a.Location.toLowerCase();
                b = b.Location.toLowerCase();
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
        "CandID": "Cand-001",
        "Image": "user-49.jpg",
        "Candidate": "Harold Gaynor",
        "Email": "harold@example.com",
        "AppliedRole": "Admin",
        "Phone": "(128) 0975 348",
        "Expereience": "4 yrs",
        "Location": "Support Lead",
        "Status": "Parsed",
    },
    {
        "key": "2",
        "CandID": "Cand-002",
        "Image": "user-04.jpg",
        "Candidate": "Sandra Ornellas",
        "Email": "sandra@example.com",
        "AppliedRole": "App Developer",
        "Phone": "(148) 9648 218",
        "Expereience": "3 yrs",
        "Location": "Los Angeles",
        "Status": "Parsed",
    },
    {
        "key": "3",
        "CandID": "Cand-003",
        "Image": "user-05.jpg",
        "Candidate": "John Harris",
        "Email": "john@example.com",
        "AppliedRole": "Technician",
        "Phone": "(196) 2348 947",
        "Expereience": "5 yrs",
        "Location": "Chicago",
        "Status": "Parsed",
    },
    {
        "key": "4",
        "CandID": "Cand-004",
        "Image": "user-03.jpg",
        "Candidate": "Carole Langan",
        "Email": "carole@example.com",
        "AppliedRole": "Web Developer",
        "Phone": "(138) 6487 295",
        "Expereience": "1 yr",
        "Location": "Houston",
        "Status": "Parsed",
    },
    {
        "key": "5",
        "CandID": "Cand-005",
        "Image": "user-11.jpg",
        "Candidate": "Charles Marks",
        "Email": "charles@example.com",
        "AppliedRole": "Sales Executive Officer",
        "Phone": "(154) 6485 218",
        "Expereience": "4 yrs",
        "Location": "Phoenix",
        "Status": "Parsed",
    },
    {
        "key": "6",
        "CandID": "Cand-006",
        "Image": "user-05.jpg",
        "Candidate": "Kerry Drake",
        "Email": "kerry@example.com",
        "AppliedRole": "Designer",
        "Phone": "(185) 5947 097",
        "Expereience": "2 yrs",
        "Location": "Dallas",
        "Status": "Parsed",
    },
    {
        "key": "7",
        "CandID": "Cand-007",
        "Image": "user-15.jpg",
        "Candidate": "David Carmona",
        "Email": "david@example.com",
        "AppliedRole": "Account Manager",
        "Phone": "(106) 3485 978",
        "Expereience": "3 yrs",
        "Location": "Austin",
        "Status": "Parsed",
    },
    {
        "key": "8",
        "CandID": "Cand-008",
        "Image": "user-07.jpg",
        "Candidate": "Margaret Soto",
        "Email": "margaret@example.com",
        "AppliedRole": "SEO Analyst",
        "Phone": "(174) 3795 107",
        "Expereience": "5 yrs",
        "Location": "Boston",
        "Status": "Parsed",
    },
    {
        "key": "9",
        "CandID": "Cand-009",
        "Image": "user-08.jpg",
        "Candidate": "Jeffrey Thaler",
        "Email": "jeffrey@example.com",
        "AppliedRole": "Admin",
        "Phone": "(128) 0975 348",
        "Expereience": "4 yrs",
        "Location": "Miami",
        "Status": "Parsed",
    },
    {
        "key": "10",
        "CandID": "Cand-010",
        "Image": "user-09.jpg",
        "Candidate": "Joyce Golston",
        "Email": "joyce@example.com",
        "AppliedRole": "Business Analyst",
        "Phone": "(132) 1876 304",
        "Expereience": "2 yrs",
        "Location": "Denver",
        "Status": "Parsed",
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
    methods: {
        getImageUrl(imageName) {
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
                    record.CandID.toLowerCase().includes(query) ||
                    record.Candidate.toLowerCase().includes(query) ||
                    record.Email.toLowerCase().includes(query) ||
                    record.AppliedRole.toLowerCase().includes(query) ||
                    record.Phone.toLowerCase().includes(query) ||
                    record.Expereience.toLowerCase().includes(query) ||
                    record.Location.toLowerCase().includes(query) ||
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