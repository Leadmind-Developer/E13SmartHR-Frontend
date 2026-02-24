<template>
    <!-- Add Probation -->
    <div class="modal fade" id="add_modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Request</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name <span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Designation <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Designations" v-model="selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3 ">
                                    <label class="form-label">Current Shift <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Shifts" v-model="selectedOne" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3 ">
                                    <label class="form-label">Requested Shift <span class="text-danger">
                                            *</span></label>
                                    <vue3-select :options="Requested" v-model="selectedTwo" placeholder="Select" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add Request</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Probation -->

    <!-- Edit Probation -->
    <div class="modal fade" id="edit_modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Request</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name <span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control" value="Anthony Lewis">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Designation <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Designations" v-model="selected" placeholder="Accountant" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3 ">
                                    <label class="form-label">Current Shift <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Shifts" v-model="selectedOne" placeholder="Regular" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3 ">
                                    <label class="form-label">Requested Shift <span class="text-danger">
                                            *</span></label>
                                    <vue3-select :options="Requested" v-model="selectedTwo" placeholder="Regular" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3 ">
                                    <label class="form-label">Status <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Status" v-model="selectedThree" placeholder="Approved" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Edit Probation -->

    <!-- Details -->
    <div class="offcanvas offcanvas-end offcanvas-medium" tabindex="-1" id="probation_details">
        <div class="offcanvas-header border-bottom">
            <h4 class="d-flex align-items-center">Employee Details</h4>
            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                <i class="ti ti-x"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="card bg-light">
                <div class="card-body">
                    <div class="d-flex align-items-center flex-wrap flex-md-nowrap row-gap-3">
                        <span class="avatar avatar-ld avatar-rounded flex-shrink-0 me-3">
                            <img src="@/assets/img/users/user-03.jpg" alt="Img">
                        </span>
                        <div>
                            <p class="mb-0"><a href="javascript:void(0);" class="text-dark fw-semibold">Anthony
                                    Lewis</a></p>
                            <span class="badge badge-soft-dark d-inline-flex align-items-center badge-xs">
                                <i class="ti ti-point-filled me-1"></i>Accountant
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <div class="d-flex align-items-center justify-content-between mb-1">
                    <p class="mb-0">Completed Days</p>
                    <p class="text-dark mb-0">70 Days</p>
                </div>
                <div class="progress progress-xs flex-grow-1 mb-2">
                    <div class="progress-bar bg-purple rounded" role="progressbar" style="width: 80%;"
                        aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <div class="mb-4 pb-4 border-bottom">
                <div class="fs-14 fw-semibold text-dark mb-3">Basic Information</div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-id me-1"></i>Employee ID</span>
                    <p class="fs-13 text-dark mb-0">EMP0001</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-star me-1"></i>Team</span>
                    <p class="fs-13 text-dark mb-0">Finance</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar-check me-1"></i>Date of Join</span>
                    <p class="fs-13 text-dark mb-0">14 Jan 2025</p>
                </div>
            </div>

            <div>
                <div class="fs-14 fw-semibold text-dark mb-3">Notice Period</div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar me-1"></i>Notice Start Date</span>
                    <p class="fs-13 text-dark mb-0">14 Jan 2026</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar me-1"></i>Notice End Date</span>
                    <p class="fs-13 text-dark mb-0">14 Mar 2026</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar-stats me-1"></i>Notice Duration</span>
                    <p class="fs-13 text-dark mb-0">6 months</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-user-edit me-1"></i>Handover Status</span>
                    <span class="badge badge-soft-info">Pending</span>
                </div>
            </div>
        </div>
    </div>
    <!-- Details -->

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
export default {
    data() {
        return {
            Designations: [
                { value: 'Select', label: 'Select' },
                { value: 'Accountant', label: 'Accountant' },
                { value: 'App Developer', label: 'App Developer' },
                { value: 'Technician', label: 'Technician' },
                { value: 'Web Developer', label: 'Web Developer' },
                { value: 'Sales Executive Officer', label: 'Sales Executive Officer' },
            ],
            Shifts: [
                { value: 'Select', label: 'Select' },
                { value: 'Regular', label: 'Regular' },
                { value: 'Night', label: 'Night' },
            ],
            Requested: [
                { value: 'Select', label: 'Select' },
                { value: 'Regular', label: 'Regular' },
                { value: 'Night', label: 'Night' },
            ],
            Status: [
                { value: 'Select', label: 'Select' },
                { value: 'Approved', label: 'Approved' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Rejected', label: 'Rejected' },
            ],
            selected: null,
            selectedOne: null,
            selectedTwo: null,
            selectedThree: null,
        }
    }
}
</script>