<template>
    <!-- Add Probation -->
    <div class="modal fade" id="add_modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Employee</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex align-items-center flex-wrap row-gap-3 w-100 rounded p-3 mb-4">
                                    <div
                                        class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                        <i class="ti ti-photo"></i>
                                    </div>
                                    <div class="profile-upload">
                                        <div class="mb-2">
                                            <h6 class="mb-1">Upload Profile Image</h6>
                                            <p class="fs-12">Image should be below 4 mb</p>
                                        </div>
                                        <div class="profile-uploader d-flex align-items-center">
                                            <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                                                Upload
                                                <input type="file" class="form-control image-sign" multiple>
                                            </div>
                                            <a href="javascript:void(0);" class="btn btn-light btn-sm">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name <span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Designation <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Designation" v-model="selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Joining Date <span class="text-danger"> *</span> </label>
                                    <div class="input-icon-end position-relative">
                                        <a-date-picker v-model="valueOne" class="form-control datetimepicker"
                                            placeholder="dd/mm/yyyy" />
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Probation End Date <span class="text-danger"> *</span>
                                    </label>
                                    <div class="input-icon-end position-relative">
                                        <a-date-picker v-model="valueTwo" class="form-control datetimepicker"
                                            placeholder="dd/mm/yyyy" />
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Reviewer <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Reviewer" v-model="selectedOne" placeholder="Select" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Empolee</button>
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
                    <h4 class="modal-title">Edit Employee</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex align-items-center flex-wrap row-gap-3 w-100 rounded p-3 mb-4">
                                    <div
                                        class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                        <i class="ti ti-photo"></i>
                                    </div>
                                    <div class="profile-upload">
                                        <div class="mb-2">
                                            <h6 class="mb-1">Upload Profile Image</h6>
                                            <p class="fs-12">Image should be below 4 mb</p>
                                        </div>
                                        <div class="profile-uploader d-flex align-items-center">
                                            <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                                                Upload
                                                <input type="file" class="form-control image-sign" multiple>
                                            </div>
                                            <a href="javascript:void(0);" class="btn btn-light btn-sm">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name <span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control" value="Anthony Lewis">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Designation <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Designation" v-model="selectedTwo"
                                        placeholder="Accountant" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Joining Date <span class="text-danger"> *</span> </label>
                                    <div class="input-icon-end position-relative">
                                        <a-date-picker v-model="valueThree" class="form-control datetimepicker"
                                            placeholder="dd/mm/yyyy" />
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Probation End Date <span class="text-danger"> *</span>
                                    </label>
                                    <div class="input-icon-end position-relative">
                                        <a-date-picker v-model="valueFour" class="form-control datetimepicker"
                                            placeholder="dd/mm/yyyy" />
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Reviewer <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Reviewer" v-model="selectedThree"
                                        placeholder="William Parsons" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
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
                            <span class="badge badge-soft-dark text-dark d-inline-flex align-items-center badge-xs">
                                <i class="ti ti-point-filled me-1"></i>Accountant
                            </span>
                        </div>
                    </div>
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
                <div class="d-flex align-items-center justify-content-between mb-0">
                    <span><i class="ti ti-calendar-check me-1"></i>Date of Join</span>
                    <p class="fs-13 text-dark mb-0">14 Jan 2025</p>
                </div>
            </div>

            <div>
                <div class="fs-14 fw-semibold text-dark mb-3">Probation Period</div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar me-1"></i>Probation Start Date</span>
                    <p class="fs-13 text-dark mb-0">02 Jan 2026</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar me-1"></i>Probation End Date</span>
                    <p class="fs-13 text-dark mb-0">02 Jul 2026</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span><i class="ti ti-calendar-stats me-1"></i>Probation Duration</span>
                    <p class="fs-13 text-dark mb-0">6 months</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-0">
                    <span><i class="ti ti-user-edit me-1"></i>Probation Status</span>
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
import { ref } from 'vue';
const valueOne = ref();
const valueTwo = ref();
const valueThree = ref();
const valueFour = ref();
export default {
    data() {
        return {
            valueOne: valueOne,
            valueTwo: valueTwo,
            valueThree: valueThree,
            valueFour: valueFour,
            selected: null,
            selectedOne: null,
            selectedTwo: "Accountant",
            selectedThree: "William Parsons",
            Designation: [
                { value: "Select", label: "Select" },
                { value: "Accountant", label: "Accountant" },
                { value: "App Developer", label: "App Developer" },
                { value: "Technician", label: "Technician" },
                { value: "Web Developer", label: "Web Developer" },
                { value: "Sales Executive Officer", label: "Sales Executive Officer" },
            ],
            Reviewer: [
                { value: "Select", label: "Select" },
                { value: "William Parsons", label: "William Parsons" },
                { value: "Lucille Tomberlin", label: "Lucille Tomberlin" },
                { value: "Frederick Johnson", label: "Frederick Johnson" },
                { value: "Sarah Henry", label: "Sarah Henry" },
                { value: "Thomas Miller", label: "Thomas Miller" },
            ],
        };
    },
};
</script>
