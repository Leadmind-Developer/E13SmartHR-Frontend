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
                                    <vue3-select :options="Designation" v-model="Selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Shift <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Shift" v-model="SelectedOne" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Start Date <span class="text-danger"> *</span> </label>
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
                                    <label class="form-label">End Date <span class="text-danger"> *</span> </label>
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
                                    <textarea class="form-control"></textarea>
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
                                    <vue3-select :options="Designation" v-model="Selected" placeholder="Accountant" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Shift <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Shift" v-model="SelectedOne" placeholder="Regular" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Start Date <span class="text-danger"> *</span> </label>
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
                                    <label class="form-label">End Date <span class="text-danger"> *</span> </label>
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
                                    <textarea class="form-control">Mild health issue</textarea>
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
const valueOne = ref(null);
const valueTwo = ref(null);
export default {
    setup() {
        return {
            valueOne,
            valueTwo,
            Selected: null,
            SelectedOne: null,
            Designation: [
                { label: "Accountant", value: "Accountant" },
                { label: "Software Engineer", value: "Software Engineer" },
                { label: "Project Manager", value: "Project Manager" },
                { label: "HR Manager", value: "HR Manager" },
                { label: "Marketing Manager", value: "Marketing Manager" },
            ],
            Shift: [
                { label: "Morning", value: "Morning" },
                { label: "Afternoon", value: "Afternoon" },
                { label: "Evening", value: "Evening" },
                { label: "Night", value: "Night" },
            ],
        };
    },
};
</script>