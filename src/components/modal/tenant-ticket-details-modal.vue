<template>
    <!-- Add Ticket -->
    <div class="modal fade" id="add_ticket">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Ticket</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Title</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Event Category</label>
                                    <vue3-select :options="EventCategory" v-model="selected" placeholder="Select" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Subject</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Assign To</label>
                                    <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                                        data-role="tagsinput" name="Label" value="Vaughan Lewis" :tags="tagsOne" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Ticket Description</label>
                                    <textarea class="form-control"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Priority</label>
                                    <vue3-select :options="Priority" v-model="selectedOne" placeholder="Select" />
                                </div>
                                <div class="mb-0">
                                    <label class="form-label">Status</label>
                                    <vue3-select :options="Status" v-model="selectedTwo" placeholder="Select" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add Ticket</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Ticket -->

    <!-- Add Ticket -->
    <div class="modal fade" id="edit_ticket">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Ticket</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Title</label>
                                    <input type="text" class="form-control" value="Laptop Issue">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Event Category</label>
                                    <vue3-select :options="EventCategory" v-model="selectedThree"
                                        placeholder="Internet Issue" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Subject</label>
                                    <input type="text" class="form-control" value="">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Assign To</label>
                                    <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                                        data-role="tagsinput" name="Label" value="Vaughan Lewis" :tags="tagsTwo" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Ticket Description</label>
                                    <textarea class="form-control" placeholder="Add Question"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Priority</label>
                                    <vue3-select :options="Priority" v-model="selectedFour" placeholder="High" />
                                </div>
                                <div class="mb-0">
                                    <label class="form-label">Status</label>
                                    <vue3-select :options="Status" v-model="selectedFive" placeholder="Reopened" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Ticket -->
</template>
<script>
import Vue3TagsInput from 'vue3-tags-input';
export default {
    components: {
        Vue3TagsInput,
    },
    data() {
        return {
            selected: null,
            selectedOne: null,
            selectedTwo: null,
            selectedThree: null,
            selectedFour: null,
            selectedFive: null,
            EventCategory: [
                { label: 'Select', value: 'Select' },
                { label: 'Internet Issue', value: 'Internet Issue' },
                { label: 'Redistribute', value: 'Redistribute' },
                { label: 'Computer', value: 'Computer' },
                { label: 'Complaint', value: 'Complaint' },
            ],
            Priority: [
                { label: 'Select', value: 'Select' },
                { label: 'High', value: 'High' },
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'Medium' },
            ],
            Status: [
                { label: 'Select', value: 'Select' },
                { label: 'Closed', value: 'Closed' },
                { label: 'Reopened', value: 'Reopened' },
                { label: 'Inprogress', value: 'Inprogress' },
            ],
            tagsOne: ["Vaughan Lewis"],
            tagsTwo: ["Vaughan Lewis"],
        }
    }
}
</script>