<script>
const data = [
    {
        "key": "1",
        "Refferals_Image": "user-32.jpg",
        "Refferals_ID": "Reff-001",
        "Referrer_Name": "Anthony Lewis",
        "Roll": "Finance",
        "Job_Image": "apple.svg",
        "Job_Reffered": "Senior IOS Developer",
        "Refferee_Image": "user-11.jpg",
        "Referee_Name": "Harold Gaynor",
        "Email": "harold@example.com",
        "Refferals_Bonus": "$200",
    },
    {
        "key": "2",
        "Refferals_Image": "user-09.jpg",
        "Refferals_ID": "Reff-002",
        "Referrer_Name": "Brian Villalobos",
        "Roll": "Developer",
        "Job_Image": "php.svg",
        "Job_Reffered": "Junior PHP Developer",
        "Refferee_Image": "user-29.jpg",
        "Referee_Name": "Sandra Ornellas",
        "Email": "sandra@example.com",
        "Refferals_Bonus": "$100",
    },
    {
        "key": "3",
        "Refferals_Image": "user-01.jpg",
        "Refferals_ID": "Reff-003",
        "Referrer_Name": "Harvey Smith",
        "Roll": "Developer",
        "Job_Image": "black.svg",
        "Job_Reffered": "Network Engineer",
        "Refferee_Image": "user-16.jpg",
        "Referee_Name": "John Harris",
        "Email": "john@example.com",
        "Refferals_Bonus": "$300",
    },
    {
        "key": "4",
        "Refferals_Image": "user-33.jpg",
        "Refferals_ID": "Reff-004",
        "Referrer_Name": "Stephan Peralt",
        "Roll": "Executive Officer",
        "Job_Image": "react.svg",
        "Job_Reffered": "Junior React Developer",
        "Refferee_Image": "user-57.jpg",
        "Referee_Name": "Whitney Barnette",
        "Email": "whitney@example.com",
        "Refferals_Bonus": "$150",
    },
    {
        "key": "5",
        "Refferals_Image": "user-56.jpg",
        "Refferals_ID": "Reff-005",
        "Referrer_Name": "Doglas Martini",
        "Roll": "Manager",
        "Job_Image": "laravel.svg",
        "Job_Reffered": "Senior Laravel Developer",
        "Refferee_Image": "user-55.jpg",
        "Referee_Name": "Richard Thompson",
        "Email": "richard@example.com",
        "Refferals_Bonus": "$250",
    },
    {
        "key": "6",
        "Refferals_Image": "user-34.jpg",
        "Refferals_ID": "Reff-006",
        "Referrer_Name": "Linda Ray",
        "Roll": "Finance",
        "Job_Image": "devops.svg",
        "Job_Reffered": "DevOps Engineer",
        "Refferee_Image": "user-45.jpg",
        "Referee_Name": "Kerry Drake",
        "Email": "kerry@example.com",
        "Refferals_Bonus": "$400",
    },
    {
        "key": "7",
        "Refferals_Image": "user-42.jpg",
        "Refferals_ID": "Reff-007",
        "Referrer_Name": "Elliot Murray",
        "Roll": "Developer",
        "Job_Image": "android.svg",
        "Job_Reffered": "Junior Android Developer",
        "Refferee_Image": "user-30.jpg",
        "Referee_Name": "David Carmona",
        "Email": "david@example.com",
        "Refferals_Bonus": "$450",
    },
    {
        "key": "8",
        "Refferals_Image": "user-38.jpg",
        "Refferals_ID": "Reff-008",
        "Referrer_Name": "Rebecca Smtih",
        "Roll": "Executive",
        "Job_Image": "html.svg",
        "Job_Reffered": "Senior HTML Developer",
        "Refferee_Image": "user-26.jpg",
        "Referee_Name": "Margaret Soto",
        "Email": "margaret@example.com",
        "Refferals_Bonus": "$220",
    },
    {
        "key": "9",
        "Refferals_Image": "user-52.jpg",
        "Refferals_ID": "Reff-009",
        "Referrer_Name": "Connie Waters",
        "Roll": "Developer",
        "Job_Image": "ui.svg",
        "Job_Reffered": "Junior UI/UX Designer",
        "Refferee_Image": "user-44.jpg",
        "Referee_Name": "Jeffrey Thaler",
        "Email": "jeffrey@example.com",
        "Refferals_Bonus": "$180",
    },
    {
        "key": "10",
        "Refferals_Image": "user-06.jpg",
        "Refferals_ID": "Reff-010",
        "Referrer_Name": "Lori Broaddus",
        "Roll": "Finance",
        "Job_Image": "grafic.svg",
        "Job_Reffered": "Senior Graphic Designer",
        "Refferee_Image": "user-10.jpg",
        "Referee_Name": "Joyce Golston",
        "Email": "joyce@example.com",
        "Refferals_Bonus": "$250",
    }
]

const columns = [
    {
        sorter: false,
    },
    {
        title: "Refferals ID",
        dataIndex: "Refferals_ID",
        sorter: {
            compare: (a, b) => {
                a = a.Refferals_ID.toLowerCase();
                b = b.Refferals_ID.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Referrer Name",
        dataIndex: "Referrer_Name",
        key: "Referrer_Name",
        sorter: {
            compare: (a, b) => {
                a = a.Referrer_Name.toLowerCase();
                b = b.Referrer_Name.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Job Reffered",
        dataIndex: "Job_Reffered",
        key: "Job_Reffered",
        sorter: {
            compare: (a, b) => {
                a = a.Job_Reffered.toLowerCase();
                b = b.Job_Reffered.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Referee Name",
        dataIndex: "Referee_Name",
        key: "Referee_Name",
        sorter: {
            compare: (a, b) => {
                a = a.Referee_Name.toLowerCase();
                b = b.Referee_Name.toLowerCase();
                return a > b ? -1 : b > a ? 1 : 0;
            },
        },
    },
    {
        title: "Refferals Bonus",
        dataIndex: "Refferals_Bonus",
        key: "Refferals_Bonus",
        sorter: {
            compare: (a, b) => {
                a = a.Refferals_Bonus.toLowerCase();
                b = b.Refferals_Bonus.toLowerCase();
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
    methods: {
        getImageUrl(imageName) {
            return new URL(`/src/assets/img/users/${imageName}`, import.meta.url)
                .href;
        },
        getImageUrlOne(imageName) {
            return new URL(`/src/assets/img/icons/${imageName}`, import.meta.url)
                .href;
        },
    },
    computed: {
        filteredPages() {
            const query = this.searchQuery.toLowerCase();
            return this.data.filter((record) => {
                return (
                    record.Refferals_ID.toLowerCase().includes(query) ||
                    record.Referrer_Name.toLowerCase().includes(query) ||
                    record.Roll.toLowerCase().includes(query) ||
                    record.Job_Reffered.toLowerCase().includes(query) ||
                    record.Referee_Name.toLowerCase().includes(query) ||
                    record.Email.toLowerCase().includes(query) ||
                    record.Refferals_Bonus.toLowerCase().includes(query)
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
                    <template v-if="column.key === 'Referrer_Name'">
                        <div class="d-flex align-items-center file-name-icon">
                            <a href="javascript:void(0);" class="avatar avatar-md ">
                                <img :src="getImageUrl(record.Refferals_Image)" class="img-fluid rounded-circle"
                                    alt="img">
                            </a>
                            <div class="ms-2">
                                <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Referrer_Name }}</a></h6>
                                <span class="d-block mt-1">{{ record.Roll }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="column.key === 'Job_Reffered'">
                        <div class="d-flex align-items-center file-name-icon">
                            <a href="javascript:void(0);" class="avatar avatar-md bg-light rounded">
                                <img :src="getImageUrlOne(record.Job_Image)" class="img-fluid rounded-circle" alt="img">
                            </a>
                            <div class="ms-2">
                                <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Job_Reffered }}</a></h6>

                            </div>
                        </div>
                    </template>
                    <template v-if="column.key === 'Referee_Name'">
                        <div class="d-flex align-items-center file-name-icon">
                            <a href="javascript:void(0);" class="avatar avatar-md ">
                                <img :src="getImageUrl(record.Refferee_Image)" class="img-fluid rounded-circle"
                                    alt="img">
                            </a>
                            <div class="ms-2">
                                <h6 class="fw-medium"><a href="javascript:void(0);">{{ record.Referee_Name }}</a></h6>
                                <span class="d-block mt-1">{{ record.Email }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="column.key === 'action'">
                        <div class="action-icon d-inline-flex">
                            <a href="javascript:void(0);" class="me-2"><i class="ti ti-edit"></i></a>
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