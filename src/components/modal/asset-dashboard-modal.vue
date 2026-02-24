<template>
    <!-- Add Todo -->
    <div class="modal fade" id="add_todo">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add New Todo</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3">
                                    <label class="form-label">Todo Title</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label">Tag</label>
                                    <vue3-select :options="Tags" v-model="selected" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label">Priority</label>
                                    <vue3-select :options="Priority" v-model="selectedOne" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label class="form-label">Descriptions</label>
                                    <div class="summernote">
                                        <div class="quill-editor">
                                            <div class="editor three-line">
                                                <div class="editor-container">
                                                    <div ref="editorRef" class="quill-editor" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <label class="form-label">Add Assignee</label>
                                    <vue3-select :options="Assignee" v-model="selectedTwo" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-0">
                                    <label class="form-label">Status</label>
                                    <vue3-select :options="Status" v-model="selectedThree" placeholder="Select" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add New Todo</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Todo -->

    <!-- Add Project -->
    <div class="modal fade" id="add_project" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header header-border align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <h5 class="modal-title me-2">Add Project </h5>
                        <p class="text-dark">Project ID : PRO-0004</p>
                    </div>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <div class="add-info-fieldset">
                    <div class="add-details-wizard p-3 pb-0">
                        <ul class="progress-bar-wizard d-flex align-items-center border-bottom">
                            <li class="active p-2 pt-0">
                                <h6 class="fw-medium">Basic Information</h6>
                            </li>
                            <li class="p-2 pt-0">
                                <h6 class="fw-medium">Members</h6>
                            </li>
                        </ul>
                    </div>
                    <fieldset id="first-field-file">
                        <form>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div
                                            class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                                            <div
                                                class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                <i class="ti ti-photo text-gray-2 fs-16"></i>
                                            </div>
                                            <div class="profile-upload">
                                                <div class="mb-2">
                                                    <h6 class="mb-1">Upload Project Logo</h6>
                                                    <p class="fs-12">Image should be below 4 mb</p>
                                                </div>
                                                <div class="profile-uploader d-flex align-items-center">
                                                    <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                                                        Upload
                                                        <input type="file" class="form-control image-sign" multiple>
                                                    </div>
                                                    <a href="javascript:void(0);"
                                                        class="btn btn-light btn-sm">Cancel</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">Project Name</label>
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">Client</label>
                                            <vue3-select :options="Client" v-model="selectedFour"
                                                placeholder="Select" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Start Date</label>
                                                    <div class="input-icon-end position-relative">
                                                        <input type="text" class="form-control datetimepicker"
                                                            placeholder="dd/mm/yyyy" value="02-05-2024">
                                                        <span class="input-icon-addon">
                                                            <i class="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">End Date</label>
                                                    <div class="input-icon-end position-relative">
                                                        <input type="text" class="form-control datetimepicker"
                                                            placeholder="dd/mm/yyyy" value="02-05-2024">
                                                        <span class="input-icon-addon">
                                                            <i class="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Priority</label>
                                                    <vue3-select :options="Priority" v-model="selectedFive"
                                                        placeholder="Select" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Project Value</label>
                                                    <input type="text" class="form-control" value="$">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Total Working Hours</label>
                                                    <div class="input-icon-end position-relative">
                                                        <a-time-picker class="form-control timepicker"
                                                            placeholder="-- : -- : --" use12-hours format="h:mm a"
                                                            type="text" />
                                                        <span class="input-icon-addon">
                                                            <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Extra Time</label>
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-0">
                                            <label class="form-label">Description</label>
                                            <div class="summernote">
                                                <div class="quill-editor">
                                                    <div class="editor three-line">
                                                        <div class="editor-container">
                                                            <div ref="editorRefOne" class="quill-editor" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="d-flex align-items-center justify-content-end">
                                    <button type="button" class="btn btn-outline-light border me-2"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary wizard-next-btn" type="button"
                                        data-bs-dismiss="modal">Add Team
                                        Member</button>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                    <fieldset>
                        <form>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label me-2">Team Members</label>
                                            <vue3-tags-input class="input-tags form-control" placeholder="Add new"
                                                type="text" data-role="tagsinput" name="Label"
                                                value="Jerald,Andrew,Philip,Davis" :tags="tagsFour" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label me-2">Team Leader</label>
                                            <vue3-tags-input class="input-tags form-control" placeholder="Add new"
                                                type="text" data-role="tagsinput" name="Label" value="Hendry,James"
                                                :tags="tagsTwo" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label me-2">Project Manager</label>
                                            <vue3-tags-input class="input-tags form-control" placeholder="Add new"
                                                type="text" data-role="tagsinput" name="Label" value="Dwight"
                                                :tags="tagsThree" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">Status</label>
                                            <vue3-select :options="StatusOne" v-model="selectedSix"
                                                placeholder="Select" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div>
                                            <label class="form-label">Tags</label>
                                            <vue3-select :options="TagsOne" v-model="selectedSeven"
                                                placeholder="Select" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="d-flex align-items-center justify-content-end">
                                    <button type="button" class="btn btn-outline-light border me-2"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary" type="button" data-bs-toggle="modal"
                                        data-bs-target="#success_modal">Save</button>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
    <!-- /Add Project -->

    <!-- Add Leaves -->
    <div class="modal fade" id="add_leaves">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Leave Request</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name</label>
                                    <vue3-select :options="EmployeeName" v-model="selectedEight" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Leave Type</label>
                                    <vue3-select :options="LeaveType" v-model="selectedNine" placeholder="Select" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">From </label>
                                    <div class="input-icon-end position-relative">
                                        <input type="text" class="form-control datetimepicker" placeholder="dd/mm/yyyy">
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">To </label>
                                    <div class="input-icon-end position-relative">
                                        <input type="text" class="form-control datetimepicker" placeholder="dd/mm/yyyy">
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">No of Days</label>
                                    <input type="text" class="form-control" disabled>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Remaining Days</label>
                                    <input type="text" class="form-control" disabled>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Reason</label>
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add Leaves</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add Leaves -->
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Vue3TagsInput from "vue3-tags-input";
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
            selectedSix: null,
            selectedSeven: null,
            selectedEight: null,
            selectedNine: null,
            Tags: [
                { label: 'Select', value: 'Select' },
                { label: 'Internal', value: 'Internal' },
                { label: 'Projects', value: 'Projects' },
                { label: 'Meetings', value: 'Meetings' },
                { label: 'Reminder', value: 'Reminder' },
            ],
            Priority: [
                { label: 'Select', value: 'Select' },
                { label: 'High', value: 'High' },
                { label: 'Medium', value: 'Medium' },
                { label: 'Low', value: 'Low' },
            ],
            Assignee: [
                { label: 'Select', value: 'Select' },
                { label: 'Sophie', value: 'Sophie' },
                { label: 'Cameron', value: 'Cameron' },
                { label: 'Doris', value: 'Doris' },
                { label: 'Rufana', value: 'Rufana' },
            ],
            Status: [
                { label: 'Select', value: 'Select' },
                { label: 'Completed', value: 'Completed' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Onhold', value: 'Onhold' },
                { label: 'In Progress', value: 'In Progress' },
            ],
            Client: [
                { label: 'Select', value: 'Select' },
                { label: 'Anthony Lewis', value: 'Anthony Lewis' },
                { label: 'Brian Villalobos', value: 'Brian Villalobos' },
            ],
            StatusOne: [
                { label: 'Select', value: 'Select' },
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
            ],
            TagsOne: [
                { label: 'Select', value: 'Select' },
                { label: 'High', value: 'High' },
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'Medium' },
            ],
            EmployeeName: [
                { label: 'Select', value: 'Select' },
                { label: 'Anthony Lewis', value: 'Anthony Lewis' },
                { label: 'Brian Villalobos', value: 'Brian Villalobos' },
                { label: 'Harvey Smith', value: 'Harvey Smith' },
            ],
            LeaveType: [
                { label: 'Select', value: 'Select' },
                { label: 'Medical Leave', value: 'Medical Leave' },
                { label: 'Casual Leave', value: 'Casual Leave' },
                { label: 'Annual Leave', value: 'Annual Leave' },
            ],
            tagsFour: ['Jerald', 'Andrew', 'Philip', 'Davis'],
            tagsTwo: ['Hendry', 'James'],
            tagsThree: ['Dwight'],
        };
    },
    mounted() {
        this.initQuill();
    },
    methods: {
        initQuill() {
            const quill = new Quill(this.$refs.editorRef, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        ["image", "code-block"],
                    ],
                },
            });
            const quillOne = new Quill(this.$refs.editorRefOne, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        ["image", "code-block"],
                    ],
                },
            });

            quill.on("text-change", () => {
                this.content = quill.root.innerHTML;
            });
            quillOne.on("text-change", () => {
                this.content = quillOne.root.innerHTML;
            });
        },
    },
};
</script>