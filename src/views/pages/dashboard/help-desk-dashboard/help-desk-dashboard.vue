<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Help Desk Dashboard</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Dashboard
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Help Desk Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
                    <a href="javascript:void(0);" class="btn btn-white me-2 mb-2"> <i class="ti ti-user"></i> Assign
                        Agent</a>
                    <a href="javascript:void(0);" class="btn btn-secondary me-2 mb-2"> <i class="ti ti-clock-check"></i>
                        Close Ticket</a>
                    <a href="javascript:void(0);" class="btn btn-primary-gradient mb-2"> <i class="ti ti-plus"></i>
                        Create Ticket</a>
                    <div class="ms-2 mb-2 head-icons">
                        <a href="javascript:void(0);" :class="{ active: isCollapsed }" data-bs-toggle="tooltip"
                            data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header"
                            @click="toggleCollapse">
                            <i class="ti ti-chevrons-up"></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /Breadcrumb -->

            <!-- Processing -->
            <div class="row">
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="card shadow-none ticket-card bg-primary-transparent card-1">
                        <div class="card-body">
                            <div class="d-inline-flex flex-column gap-3">
                                <div class="avatar avatar-lg bg-primary rounded-3 flex-shrink-0">
                                    <i class="ti ti-users-plus text-white fs-24"></i>
                                </div>
                                <p class="mb-0 text-gray-6">Total Tickets</p>
                                <h2 class="mb-0">2,847</h2>
                                <div>
                                    <div
                                        class="rounded-pill bg-light fs-13 text-gray-9 d-inline-flex align-items-center gap-2 p-2px ps-2">
                                        +12.5%
                                        <p
                                            class="btn pe-none btn-sm btn-icon bg-success rounded-circle d-flex align-items-center justify-content-center text-white">
                                            <i class="ti ti-arrow-up-right fs-20 "></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="bg-primary"></span>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="card shadow-none ticket-card bg-secondary-transparent card-2">
                        <div class="card-body">
                            <div class="d-inline-flex flex-column gap-3">
                                <div class="avatar avatar-lg bg-secondary rounded-3 flex-shrink-0">
                                    <i class="ti ti-users-plus text-white fs-24"></i>
                                </div>
                                <p class="mb-0 text-gray-6">Open Tickets</p>
                                <h2 class="mb-0">342</h2>
                                <div>
                                    <div
                                        class="rounded-pill bg-light fs-13 text-gray-9 d-inline-flex align-items-center gap-2 p-2px ps-2">
                                        +8.2%
                                        <p
                                            class="btn btn-sm pe-none btn-icon bg-success rounded-circle d-flex align-items-center justify-content-center text-white">
                                            <i class="ti ti-arrow-up-right fs-20 "></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="bg-secondary"></span>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="card shadow-none ticket-card bg-success-transparent card-3">
                        <div class="card-body">
                            <div class="d-inline-flex flex-column gap-3">
                                <div class="avatar avatar-lg bg-success rounded-3 flex-shrink-0">
                                    <i class="ti ti-users-plus text-white fs-24"></i>
                                </div>
                                <p class="mb-0 text-gray-6">Resolved Today</p>
                                <h2 class="mb-0">128</h2>
                                <div>
                                    <div
                                        class="rounded-pill bg-light fs-13 text-gray-9 d-inline-flex align-items-center gap-2 p-2px ps-2">
                                        +15.5%
                                        <p
                                            class="btn pe-none btn-sm btn-icon bg-success rounded-circle d-flex align-items-center justify-content-center text-white">
                                            <i class="ti ti-arrow-up-right fs-20 "></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="bg-success"></span>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="card shadow-none ticket-card bg-info-transparent card-4">
                        <div class="card-body">
                            <div class="d-inline-flex flex-column gap-3">
                                <div class="avatar avatar-lg bg-info rounded-3 flex-shrink-0">
                                    <i class="ti ti-users-plus text-white fs-24"></i>
                                </div>
                                <p class="mb-0 text-gray-6">Avg Time</p>
                                <h2 class="mb-0">2.4h</h2>
                                <div>
                                    <div
                                        class="rounded-pill bg-light fs-13 text-gray-9 d-inline-flex align-items-center gap-2 p-2px ps-2">
                                        +12.3%
                                        <p
                                            class="btn pe-none btn-sm btn-icon bg-success rounded-circle d-flex align-items-center justify-content-center text-white">
                                            <i class="ti ti-arrow-up-right fs-20 "></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="bg-info"></span>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="card shadow-none border-0 ticket-card bg-danger-transparent card-5">
                        <div class="card-body">
                            <div class="d-inline-flex flex-column gap-3">
                                <div class="avatar avatar-lg bg-danger rounded-3 flex-shrink-0">
                                    <i class="ti ti-users-plus text-white fs-24"></i>
                                </div>
                                <p class="mb-0 text-gray-6">Overdue</p>
                                <h2 class="mb-0">23</h2>
                                <div>
                                    <div
                                        class="rounded-pill bg-light fs-13 text-gray-9 d-inline-flex align-items-center gap-2 p-2px ps-2">
                                        -5.2%
                                        <p
                                            class="btn pe-none btn-sm btn-icon bg-danger rounded-circle d-flex align-items-center justify-content-center text-white">
                                            <i class="ti ti-arrow-down-right fs-20 "></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="bg-danger"></span>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="card shadow-none ticket-card bg-pink-transparent card-6">
                        <div class="card-body">
                            <div class="d-inline-flex flex-column gap-3">
                                <div class="avatar avatar-lg bg-pink rounded-3 flex-shrink-0">
                                    <i class="ti ti-users-plus text-white fs-24"></i>
                                </div>
                                <p class="mb-0 text-gray-6">Active Agents</p>
                                <h2 class="mb-0">42</h2>
                                <div>
                                    <div
                                        class="rounded-pill bg-light fs-13 text-gray-9 d-inline-flex align-items-center gap-2 p-2px ps-2">
                                        +8.2%
                                        <p
                                            class="btn pe-none btn-sm btn-icon bg-success rounded-circle d-flex align-items-center justify-content-center text-white">
                                            <i class="ti ti-arrow-up-right fs-20 "></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="bg-pink"></span>
                    </div>
                </div>
            </div>

            <!-- start row -->
            <div class="row">
                <div class="col-xxl-6 d-flex">
                    <!-- Ticket Trends -->
                    <div class="card flex-fill">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
                                <h3 class="mb-0 card-title">Ticket Trends</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Monthly
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div id="ticket-trends">
                                    <apexchart type="area" height="241" :options="ticketTrends.ticket"
                                        :series="ticketTrends.series"></apexchart>
                                </div>
                                <div class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                                    <p class="d-flex align-items-center gap-1 mb-0 text-dark"> <i
                                            class="ti ti-circle-filled text-primary fs-14"></i> Created </p>
                                    <p class="d-flex align-items-center gap-1 mb-0 text-dark"> <i
                                            class="ti ti-circle-filled text-secondary fs-14"></i> Resolved </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-6 d-flex">
                    <!-- Ticket Trends -->
                    <div class="card flex-fill">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                                <h3 class="mb-0 card-title">Tickets By Status</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Monthly
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="row align-items-center justify-content-center">
                                <div class="col-lg-6">
                                    <div id="ticket-status">
                                        <apexchart type="radialBar" height="296" :options="ticketStatus.ticket"
                                            :series="ticketStatus.series"></apexchart>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <p class="mb-0">Total Tickets</p>
                                        <h2 class="main-title">968</h2>
                                    </div>
                                    <div class="d-flex flex-column gap-3">
                                        <div
                                            class="bg-light d-flex align-items-center justify-content-between rounded-pill px-3 py-2">
                                            <p class="mb-0 d-flex align-items-center gap-1"><i
                                                    class="ti ti-square-filled fs-8 text-primary"></i> Open</p>
                                            <p class="mb-0 fw-semibold text-dark">653</p>
                                        </div>
                                        <div
                                            class="bg-light d-flex align-items-center justify-content-between rounded-pill px-3 py-2">
                                            <p class="mb-0 d-flex align-items-center gap-1"><i
                                                    class="ti ti-square-filled fs-8 text-info"></i> In Progres</p>
                                            <p class="mb-0 fw-semibold text-dark">342</p>
                                        </div>
                                        <div
                                            class="bg-light d-flex align-items-center justify-content-between rounded-pill px-3 py-2">
                                            <p class="mb-0 d-flex align-items-center gap-1"><i
                                                    class="ti ti-square-filled fs-8 text-warning"></i> On Hold</p>
                                            <p class="mb-0 fw-semibold text-dark">185</p>
                                        </div>
                                        <div
                                            class="bg-light d-flex align-items-center justify-content-between rounded-pill px-3 py-2">
                                            <p class="mb-0 d-flex align-items-center gap-1"><i
                                                    class="ti ti-square-filled fs-8 text-purple"></i> Closed</p>
                                            <p class="mb-0 fw-semibold text-dark">67</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->

            <!-- start row -->
            <div class="row mb-4 row-gap-4">
                <div class="col-xxl-4 col-xl-6 d-flex">
                    <div class="card mb-0 flex-fill">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 ">
                                <h3 class="mb-0 card-title">SLA Compliance</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Monthly
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sla-wrapper">
                                <div id="sla-compliance">
                                    <apexchart type="radialBar" height="230" :options="slaCompliance.sla"
                                        :series="slaCompliance.series"></apexchart>
                                </div>
                            </div>
                            <div class="d-flex flex-column gap-3">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <span class="d-block border border-2 h-12 border-success rounded-5 me-2"></span>
                                        <p>First Response SLA</p>
                                    </div>
                                    <span
                                        class="badge bg-success d-inline-flex align-items-center gap-1 rounded-pill fs-13">96.2%</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <span class="d-block border border-2 h-12 border-success rounded-5 me-2"></span>
                                        <p class="fs-14">Resolution SLA</p>
                                    </div>
                                    <span
                                        class="badge bg-success d-inline-flex align-items-center gap-1 rounded-pill fs-13">92.8%</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <span class="d-block border border-2 h-12 border-warning rounded-5 me-2"></span>
                                        <p class="fs-14">Escalation SLA</p>
                                    </div>
                                    <span
                                        class="badge bg-danger d-inline-flex align-items-center gap-1 rounded-pill fs-13">89.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end col -->

                <div class="col-xxl-4 col-xl-6">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <h3 class="mb-0 card-title">Backlog Growth</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Monthly
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div id="backlog-growth">
                                <apexchart type="bar" height="300" :options="backlogGrowth.backlog"
                                    :series="backlogGrowth.series"></apexchart>
                            </div>

                            <p class="mb-0 gap-2 text-dark text-center">
                                <span class="badge bg-success rounded-circle p-1 me-2">
                                    <i class="ti ti-caret-up-filled text-white fs-14"></i>
                                </span>
                                12% Compared to Last Week
                            </p>
                        </div>
                    </div>
                </div>
                <!-- end col -->

                <div class="col-xxl-4 col-xl-12">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
                                <h3 class="mb-0 card-title">Tickets by Category</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Monthly
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <help-ticket></help-ticket>

                            <div class="row row-gap-4">
                                <div class="col-lg-4 col-md-4">
                                    <div class="border-5 border-start border-primary text-center">
                                        <p class="fs-13 d-inline-flex align-items-center mb-1 fs-12">IT Support</p>
                                        <h4 class="fs-14">485</h4>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4">
                                    <div class="border-5 border-start border-secondary text-center">
                                        <p class="fs-13 d-inline-flex align-items-center mb-1 fs-12">HR</p>
                                        <h4 class="fs-14">342</h4>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4">
                                    <div class="border-5 border-start border-success text-center">
                                        <p class="fs-13 d-inline-flex align-items-center mb-1 fs-12">Payroll</p>
                                        <h4 class="fs-14">268</h4>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4">
                                    <div class="border-5 border-start border-warning text-center">
                                        <p class="fs-13 d-inline-flex align-items-center mb-1 fs-12">Access</p>
                                        <h4 class="fs-14">195</h4>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4">
                                    <div class="border-5 border-start border-info text-center">
                                        <p class="fs-13 d-inline-flex align-items-center mb-1 fs-12">Hardware</p>
                                        <h4 class="fs-14">412</h4>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4">
                                    <div class="border-5 border-start border-danger text-center">
                                        <p class="fs-13 d-inline-flex align-items-center mb-1 fs-12">Other</p>
                                        <h4 class="fs-14">145</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- end col -->
            </div>
            <!-- end row -->

            <div class="row">
                <div class="col-xxl-8 col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                                <h3 class="mb-0 card-title">Agent Performance</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Monthly
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <help-agent></help-agent>
                        </div>
                    </div>
                </div>
                <!-- Clock-In/Out -->
                <div class="col-xxl-4 col-xl-12 d-flex">
                    <div class="card flex-fill">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
                                <h3 class="mb-0 card-title">Activity Feed</h3>
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-calendar fs-14"></i> Today
                                    </a>
                                    <ul class="dropdown-menu mt-2 p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Weekly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="">
                                <div class="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
                                    <div class="d-flex align-items-center">
                                        <span
                                            class="avatar rounded-circle bg-transparent-primary text-primary mb-2 flex-shrink-0">
                                            <i class="ti ti-brand-hipchat fs-16"></i>
                                        </span>
                                        <div class="ms-3">
                                            <h4 class="fs-14 fw-medium text-truncate mb-1">Michael Chen replied to
                                                TKT-1247</h4>
                                            <p class="fs-13 mb-1">Added troubleshooting steps for connect</p>
                                            <p class="fs-13"><i class="ti ti-clock-record"></i> 5 min ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
                                    <div class="d-flex align-items-center">
                                        <span
                                            class="avatar rounded-circle bg-transparent-secondary text-secondary mb-2 flex-shrink-0">
                                            <i class="ti ti-user fs-16"></i>
                                        </span>
                                        <div class="ms-3">
                                            <h4 class="fs-14 fw-medium text-truncate mb-1">New ticket assigned to Sarah
                                                Johnson</h4>
                                            <p class="fs-13 mb-1">TKT-1248: Network connectivity issues</p>
                                            <p class="fs-13"><i class="ti ti-clock-record"></i> 12 min ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
                                    <div class="d-flex align-items-center">
                                        <span
                                            class="avatar rounded-circle bg-transparent-success text-success mb-2 flex-shrink-0">
                                            <i class="ti ti-checklist fs-16"></i>
                                        </span>
                                        <div class="ms-3">
                                            <h4 class="fs-14 fw-medium text-truncate mb-1">TKT-1240 marked as resolved
                                            </h4>
                                            <p class="fs-13 mb-1">Password reset completed successfully</p>
                                            <p class="fs-13"><i class="ti ti-clock-record"></i> 34 min ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
                                    <div class="d-flex align-items-center">
                                        <span
                                            class="avatar rounded-circle bg-transparent-danger text-danger mb-2 flex-shrink-0">
                                            <i class="ti ti-calendar-x fs-16"></i>
                                        </span>
                                        <div class="ms-3">
                                            <h4 class="fs-14 fw-medium text-truncate mb-1">SLA deadline approaching</h4>
                                            <p class="fs-13 mb-1">TKT-1239 has 2 hours remaining</p>
                                            <p class="fs-13"><i class="ti ti-clock-record"></i> 45 min ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:void(0);" class="btn btn-light btn-md w-100 py-2">View All Activity</a>
                        </div>
                    </div>
                </div>
                <!-- /Clock-In/Out -->
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

import { ticketTrends, ticketStatus, slaCompliance, backlogGrowth } from "./data";
export default {
    data() {
        return {
            isCollapsed: false,
            ticketTrends,
            ticketStatus,
            slaCompliance,
            backlogGrowth
        };
    },
    methods: {
        toggleCollapse() {
            // Toggle the collapsed state
            this.isCollapsed = !this.isCollapsed;

            // Optionally add/remove class on body to collapse header globally
            if (this.isCollapsed) {
                document.body.classList.add("header-collapse");
            } else {
                document.body.classList.remove("header-collapse");
            }
        },
    },
};
</script>