<template>

    <!-- Add Probation -->
    <div class="modal fade" id="add_modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Certification</h4>
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
                                    <vue3-select :options="Employees" v-model="selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Designation <span class="text-danger"> *</span></label>
                                    <vue3-select :options="Designations" v-model="selectedOne" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Training Type <span class="text-danger"> *</span></label>
                                    <vue3-select :options="TrainingType" v-model="selectedTwo" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Trainer Name <span class="text-danger"> *</span></label>
                                    <vue3-select :options="TrainerName" v-model="selectedThree" placeholder="Select" />
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
                                    <label class="form-label">Completion Date <span class="text-danger"> *</span>
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
                                <div class="mb-3">
                                    <label class="form-label">Certificate Issue Date <span class="text-danger"> *</span>
                                    </label>
                                    <div class="input-icon-end position-relative">
                                        <a-date-picker v-model="valueThree" class="form-control datetimepicker"
                                            placeholder="dd/mm/yyyy" />
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Certification</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Probation -->

    <!--Certificate details -->
    <div class="modal fade" id="details_modal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">View Certificate</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div>
                            <img src="@/assets/img/reports/certificate.png" alt="certificate" class="img-fluid">
                        </div>
                    </div>
                    <div class="modal-footer mt-3 border-top">
                        <button type="submit" class="btn btn-primary">Download</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Certificate details -->

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
export default {
    data() {
        return {
            valueOne,
            valueTwo,
            valueThree,
            selected: null,
            selectedOne: null,
            selectedTwo: null,
            selectedThree: null,
            Employees: [
                { label: 'Select', value: 'Select' },
                { label: 'Anthony Lewis', value: 'Anthony Lewis' },
                { label: 'Brian Villalobos', value: 'Brian Villalobos' },
                { label: 'Sophie Headrick', value: 'Sophie Headrick' },
                { label: 'Stephan Peralt', value: 'Stephan Peralt' },
                { label: 'Thomas Bordelon', value: 'Thomas Bordelon' },
            ],
            Designations: [
                { label: 'Select', value: 'Select' },
                { label: 'Accountant', value: 'Accountant' },
                { label: 'App Developer', value: 'App Developer' },
                { label: 'Technician', value: 'Technician' },
                { label: 'Web Developer', value: 'Web Developer' },
                { label: 'Sales Executive Officer', value: 'Sales Executive Officer' },
            ],
            TrainingType: [
                { label: 'Select', value: 'Select' },
                { label: 'Git Training', value: 'Git Training' },
                { label: 'HTML Training', value: 'HTML Training' },
                { label: 'React Training', value: 'React Training' },
                { label: 'Nodejs Training', value: 'Nodejs Training' },
                { label: 'Django Training', value: 'Django Training' },
            ],
            TrainerName: [
                { label: 'Select', value: 'Select' },
                { label: 'Harold Gaynor', value: 'Harold Gaynor' },
                { label: 'Sandra Ornellas', value: 'Sandra Ornellas' },
                { label: 'John Harris', value: 'John Harris' },
                { label: 'Whitney Barnette', value: 'Whitney Barnette' },
                { label: 'Richard Thompson', value: 'Richard Thompson' },
            ],
        };
    },
};
</script>