<template>
    <!-- Add Probation -->
    <div class="modal fade" id="add_modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Policy</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Policy</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">First Response Time</label>
                                    <vue3-select :options="ResponseTime" v-model="selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Resolution Time</label>
                                    <vue3-select :options="ResolutionTime" v-model="selectedOne" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Escalation Time</label>
                                    <vue3-select :options="EscalationTime" v-model="selectedTwo" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Escalates To</label>
                                    <vue3-select :options="EscalatesTo" v-model="selectedThree" placeholder="Select" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Policy</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Probation -->

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
            selected: 'null',
            selectedOne: 'null',
            selectedTwo: 'null',
            selectedThree: 'null',
            ResponseTime: [
                { label: 'Select', value: 'Select' },
                { label: '1 Hour', value: '1 Hour' },
                { label: '4 Hours', value: '4 Hours' },
                { label: '8 Hours', value: '8 Hours' },
                { label: '24 Hours', value: '24 Hours' },
            ],
            ResolutionTime: [
                { label: 'Select', value: 'Select' },
                { label: '2 – 4 Hours', value: '2 – 4 Hours' },
                { label: '8 Hours', value: '8 Hours' },
                { label: '24 Hours', value: '24 Hours' },
                { label: '1 - 2 Days', value: '1 - 2 Days' },
                { label: '24 Hours', value: '24 Hours' },
            ],
            EscalationTime: [
                { label: 'Select', value: 'Select' },
                { label: '1 hour', value: '1 hour' },
                { label: '2 hours', value: '2 hours' },
                { label: '4 hours', value: '4 hours' },
                { label: '6 hours', value: '6 hours' },
            ],
            EscalatesTo: [
                { label: 'Select', value: 'Select' },
                { label: 'Support Lead', value: 'Support Lead' },
                { label: 'Support Team', value: 'Support Team' },
            ],
        };
    },
};
</script>