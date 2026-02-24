<template>
    <!-- Add Probation -->
    <div class="modal fade" id="add_modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Rule</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Trigger Type</label>
                                    <vue3-select :options="TriggerType" v-model="selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Escalation Level</label>
                                    <vue3-select :options="EscalationLevel" v-model="selectedOne"
                                        placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Time Threshold</label>
                                    <vue3-select :options="TimeThreshold" v-model="selectedTwo" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Escalate To</label>
                                    <vue3-select :options="EscalateTo" v-model="selectedThree" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3 ">
                                    <label class="form-label">Notify By</label>
                                    <vue3-select :options="NotifyBy" v-model="selectedFour" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Notes</label>
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Rule</button>
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
            selected: null,
            selectedOne: null,
            selectedTwo: null,
            selectedThree: null,
            selectedFour: null,

            TriggerType: [
                { label: 'Select', value: 'Select' },
                { label: 'SLA Breach', value: 'SLA Breach' },
                { label: 'Status Based', value: 'Status Based' },
                { label: 'Priority Based', value: 'Priority Based' },
                { label: 'Time Based', value: 'Time Based' },
            ],
            EscalationLevel: [
                { label: 'Select', value: 'Select' },
                { label: 'Level 1', value: 'Level 1' },
                { label: 'Level 2', value: 'Level 2' },
            ],
            TimeThreshold: [
                { label: 'Select', value: 'Select' },
                { label: '30 mins', value: '30 mins' },
                { label: '1 hour', value: '1 hour' },
                { label: '4 hours', value: '4 hours' },
                { label: '6 hours', value: '6 hours' },
                { label: '8 hours', value: '8 hours' },
            ],
            EscalateTo: [
                { label: 'Select', value: 'Select' },
                { label: 'Team Lead', value: 'Team Lead' },
                { label: 'Support Lead', value: 'Support Lead' },
                { label: 'Supervisor', value: 'Supervisor' },
                { label: 'Admin', value: 'Admin' },
            ],
            NotifyBy: [
                { label: 'Select', value: 'Select' },
                { label: 'Support Lead', value: 'Support Lead' },
                { label: 'Support Team', value: 'Support Team' },
            ],
        };
    },
}
</script>