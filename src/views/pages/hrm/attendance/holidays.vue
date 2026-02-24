<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Holidays</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Attendance
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Holidays</li>
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
                            New Holiday</a>
                    </div>
                </div>
            </div>
            <!-- /Breadcrumb -->

            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5>Holiday List</h5>
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
                        <div class="dropdown me-3">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Shift
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Regular</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Night</a>
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown me-3">
                            <a href="javascript:void(0);"
                                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Status
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
                                <i class="ti ti-filter me-1"></i>Filter
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end p-3">
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">All Holidays</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">National Holidays</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">Company Holidays</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="table-responsive">
                            <table class="custom-table table-hover table-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheck">
                                            </div>
                                        </th>
                                        <th>Holiday Name</th>
                                        <th>Holiday Date</th>
                                        <th>Day</th>
                                        <th>Holiday Type</th>
                                        <th>Status</th>
                                        <th class="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in data" :key="item.id">
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheck">
                                            </div>
                                        </td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.date }}</td>
                                        <td>{{ item.day }}</td>
                                        <td>
                                            <span class="badge badge-light-danger">{{ item.type }}</span>
                                        </td>
                                        <td>
                                            <span class="badge badge-light-success">{{ item.status }}</span>
                                        </td>
                                        <td class="text-end">
                                            <div class="dropdown dropdown-action">
                                                <a href="javascript:void(0);"
                                                    class="dropdown-toggle text-gray-700 d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown">
                                                    <i class="ti ti-dots-vertical"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <a class="dropdown-item" href="javascript:void(0)"
                                                            data-bs-toggle="modal" data-bs-target="#edit_modal">
                                                            <i class="ti ti-pencil me-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="javascript:void(0)"
                                                            data-bs-toggle="modal" data-bs-target="#delete_modal">
                                                            <i class="ti ti-trash me-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "holidays",
    data() {
        return {
            holidays: [
                {
                    id: 1,
                    name: "New Year's Day",
                    date: "01/01/2024",
                    day: "Monday",
                    status: "Public Holiday",
                },
                {
                    id: 2,
                    name: "Republic Day",
                    date: "26/01/2024",
                    day: "Friday",
                    status: "Public Holiday",
                },
                {
                    id: 3,
                    name: "Maha Shivaratri",
                    date: "08/03/2024",
                    day: "Friday",
                    status: "Public Holiday",
                },
                {
                    id: 4,
                    name: "Holi",
                    date: "25/03/2024",
                    day: "Monday",
                    status: "Public Holiday",
                },
                {
                    id: 5,
                    name: "Good Friday",
                    date: "29/03/2024",
                    day: "Friday",
                    status: "Public Holiday",
                },
                {
                    id: 6,
                    name: "Eid-ul-Fitr",
                    date: "10/04/2024",
                    day: "Wednesday",
                    status: "Public Holiday",
                },
                {
                    id: 7,
                    name: "Buddha Purnima",
                    date: "23/05/2024",
                    day: "Thursday",
                    status: "Public Holiday",
                },
                {
                    id: 8,
                    name: "Independence Day",
                    date: "15/08/2024",
                    day: "Thursday",
                    status: "Public Holiday",
                },
                {
                    id: 9,
                    name: "Gandhi Jayanti",
                    date: "02/10/2024",
                    day: "Wednesday",
                    status: "Public Holiday",
                },
                {
                    id: 10,
                    name: "Diwali",
                    date: "01/11/2024",
                    day: "Friday",
                    status: "Public Holiday",
                },
                {
                    id: 11,
                    name: "Christmas Day",
                    date: "25/12/2024",
                    day: "Wednesday",
                    status: "Public Holiday",
                },
            ],
        };
    },
};
</script>
