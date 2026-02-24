<template>
  <!-- Add Leaves -->
  <div class="modal fade" id="add_leaves">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Leave</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Employee Name</label>
                  <vue3-select :options="EmploDash" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Leave Type</label>
                  <vue3-select :options="AnnualEmp" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">From </label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
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
                    <a-date-picker v-model="valueTwo" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">No of Days</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Remaining Days</label>
                  <input type="text" class="form-control" />
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
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Leaves</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Leaves -->

  <!-- Edit Task -->
  <div class="modal fade" id="edit_task">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Task</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Todo Title</label>
                  <input type="text" class="form-control" value="Patient appointment booking" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Due Date</label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueThree" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Project</label>
                  <vue3-select :options="OffDash" v-model="selectedTwo" placeholder="Office Management" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label me-2">Team Members</label>
                  <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                    data-role="tagsinput" name="Label" value="Tag1" :tags="tags" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tag</label>
                  <vue3-select :options="ProjecDash" v-model="selectedThree" placeholder="Projects" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="InproDash" v-model="selectedFour" placeholder="Inprogress" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <vue3-select :options="MediDash" v-model="selectedFive" placeholder="Medium" />
                </div>
              </div>
              <div class="col-md-12">
                <label class="form-label">Who Can See this Task?</label>
                <div class="d-flex align-items-center">
                  <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                    <label class="form-check-label text-dark" for="flexRadioDefault4">
                      Public
                    </label>
                  </div>
                  <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5"
                      checked />
                    <label class="form-check-label text-dark" for="flexRadioDefault5">
                      Private
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" />
                    <label class="form-check-label text-dark" for="flexRadioDefault6">
                      Admin Only
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <label class="form-label">Descriptions</label>
                  <div class="quill-editor">
                    <div class="editor three-line">
                      <div class="editor-container">
                        <div ref="editorRef" class="quill-editor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <label class="form-label">Upload Attachment</label>
                <div class="bg-light rounded p-2">
                  <div class="profile-uploader border-bottom mb-2 pb-2">
                    <div class="drag-upload-btn btn btn-sm btn-white border px-3">
                      Select File
                      <input type="file" class="form-control image-sign" multiple="" />
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                    <div class="d-flex align-items-center">
                      <h6 class="fs-12 fw-medium me-1">Logo.zip</h6>
                      <span class="badge badge-soft-info">21MB </span>
                    </div>
                    <a href="javascript:void(0);" class="btn btn-sm btn-icon"><i class="ti ti-trash"></i></a>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <h6 class="fs-12 fw-medium me-1">Files.zip</h6>
                      <span class="badge badge-soft-info">25MB </span>
                    </div>
                    <a href="javascript:void(0);" class="btn btn-sm btn-icon"><i class="ti ti-trash"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Task -->

  <!-- Delete Modal -->
  <div class="modal fade" id="delete_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center">
          <span class="avatar avatar-xl bg-transparent-danger text-danger mb-3">
            <i class="ti ti-trash-x fs-36"></i>
          </span>
          <h4 class="mb-1">Confirm Delete</h4>
          <p class="mb-3">
            You want to delete all the marked items, this cant be undone once you delete.
          </p>
          <div class="d-flex justify-content-center">
            <a href="javascript:void(0);" class="btn btn-light me-3" data-bs-dismiss="modal">Cancel</a>
            <router-link to="/dashboard/employee-dashboard" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
<script>
import Vue3TagsInput from "vue3-tags-input";
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
const valueThree = ref(new Date());
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  components: {
    Vue3TagsInput,
  },
  data() {
    return {
      content: "",
      valueOne,
      valueTwo,
      valueThree,
      selected: [],
      selectedOne: [],
      selectedTwo: "Office Management",
      selectedThree: "Projects",
      selectedFour: "Inprogress",
      selectedFive: "Medium",
      MediDash: [
        { label: "Select", value: "Select" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
      ],
      InproDash: [
        { label: "Select", value: "Select" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Completed", value: "Completed" },
        { label: "Pending", value: "Pending" },
        { label: "Onhold", value: "Onhold" },
      ],
      OffDash: [
        { label: "Select", value: "Select" },
        { label: "Office Management", value: "Office Management" },
        { label: "Clinic Management", value: "Clinic Management" },
        { label: "Educational Platform", value: "Educational Platform" },
      ],
      EmploDash: [
        { label: "Select", value: "Select" },
        { label: "Anthony Lewis", value: "Anthony Lewis" },
        { label: "Brian Villalobos", value: "Brian Villalobos" },
        { label: "Harvey smith", value: "Harvey smith" },
      ],
      AnnualEmp: [
        { label: "Select", value: "Select" },
        { label: "Medical Leave", value: "Medical Leave" },
        { label: "Casual Leave", value: "Casual Leave" },
        { label: "Annual Leave", value: "Annual Leave" },
      ],
      ProjecDash: [
        { label: "Select", value: "Select" },
        { label: "Internal", value: "Internal" },
        { label: "Projects", value: "Projects" },
        { label: "Meetings", value: "Meetings" },
        { label: "Reminder", value: "Reminder" },
      ],
      tags: ["Jerald", "Andrew", "Philip", "Davis"],
    };
  },
  mounted() {
    this.initQuill();
  },
  methods: {
    submitForm() {
      this.$router.push("/dashboard/employee-dashboard");
    },
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

      quill.on("text-change", () => {
        this.content = quill.root.innerHTML;
      });
    },
  },
};
</script>
