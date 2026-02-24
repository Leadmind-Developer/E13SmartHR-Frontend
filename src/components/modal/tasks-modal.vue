<script>
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
import Vue3TagsInput from "vue3-tags-input";
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  components: {
    Vue3TagsInput,
  },
  data() {
    return {
      tags: ["Jerald", "Andrew", "Philip", "Davis"],
      valueOne,
      valueTwo,
      content: "",
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      selectedFour: [],
      selectedFive: [],
      selectedSix: [],
      selectedSeven: [],
      Project: [
        { label: "Select", value: "Select" },
        { label: "Office Management", value: "Office Management" },
        { label: "Clinic Management", value: "Clinic Management" },
        "Educational Platform",
      ],
      Tag: [
        { label: "Select", value: "Select" },
        { label: "Internal", value: "Internal" },
        { label: "Projects", value: "Projects" },
        { label: "Meetings", value: "Meetings" },
        { label: "Reminder", value: "Reminder" },
      ],
      Status: [
        { label: "Select", value: "Select" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Completed", value: "Completed" },
        { label: "Pending", value: "Pending" },
        { label: "Onhold", value: "Onhold" },
      ],
      Priority: [
        { label: "Select", value: "Select" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
      ],
    };
  },
  mounted() {
    this.initQuill();
  },
  methods: {
    submitForm() {
      this.$router.push("/projects/tasks");
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

<template>
  <!-- Add Task -->
  <div class="modal fade" id="add_task">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Task</h4>
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
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Due Date</label>
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
                  <label class="form-label">Project</label>
                  <vue3-select :options="Project" v-model="selected" placeholder="Select" />
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
                  <vue3-select :options="Tag" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <vue3-select :options="Priority" v-model="selectedThree" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <label class="form-label">Who Can See this Task?</label>
                <div class="d-flex align-items-center">
                  <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label text-dark" for="flexRadioDefault1">
                      Public
                    </label>
                  </div>
                  <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                      checked="" />
                    <label class="form-check-label text-dark" for="flexRadioDefault2">
                      Private
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                      checked="" />
                    <label class="form-check-label text-dark" for="flexRadioDefault3">
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
                        <div ref="editorRefOne" class="quill-editor" />
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
            <button type="submit" class="btn btn-primary">Add New Task</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Task -->

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
                    <a-date-picker v-model="valueTwo" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Project</label>
                  <vue3-select :options="Project" v-model="selectedFour" placeholder="Office Management" />
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
                  <vue3-select :options="Tag" v-model="selectedFive" placeholder="Projects" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selectedSix" placeholder="Inprogress" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <vue3-select :options="Priority" v-model="selectedSeven" placeholder="Medium" />
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
                      checked="" />
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

  <!-- Add Board -->
  <div class="modal fade" id="add_board">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Board</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Board Name</label>
              <input type="text" class="form-control" />
            </div>
            <label class="form-label">Board Color</label>
            <div class="d-flex align-items-center flex-wrap row-gap-3">
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="primaryColor" value="primary" checked />
                <label for="primaryColor" class="primary-clr"></label>
              </div>
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="brightblueColor" value="brightblue" />
                <label for="brightblueColor" class="brightblue-clr"></label>
              </div>
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="lunargreenColor" value="lunargreen" />
                <label for="lunargreenColor" class="lunargreen-clr"></label>
              </div>
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="lavendarColor" value="lavendar" />
                <label for="lavendarColor" class="lavendar-clr"></label>
              </div>
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="magentaColor" value="magenta" />
                <label for="magentaColor" class="magenta-clr"></label>
              </div>
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="chromeyellowColor" value="chromeyellow" />
                <label for="chromeyellowColor" class="chromeyellow-clr"></label>
              </div>
              <div class="theme-colorsset me-3">
                <input type="radio" name="color" id="lavaredColor" value="lavared" />
                <label for="lavaredColor" class="lavared-clr"></label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add New Board</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Board -->

  <!-- Todo Details -->
  <div class="modal fade" id="view_todo">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h4 class="modal-title text-white">Respond to any pending messages</h4>
          <span class="badge badge-danger d-inline-flex align-items-center"><i
              class="ti ti-square me-1"></i>Urgent</span>
          <span><i class="ti ti-star-filled text-warning"></i></span>
          <a href="javascript:void(0);"><i class="ti ti-trash text-white"></i></a>
          <button type="button" class="btn-close custom-btn-close bg-transparent fs-16 text-white position-static"
            data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <h5 class="mb-2">Task Details</h5>
          <div class="border rounded mb-3 p-2">
            <div class="row row-gap-3">
              <div class="col-md-4">
                <div class="text-center">
                  <span class="d-block mb-1">Created On</span>
                  <p class="text-dark">22 July 2025</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="text-center">
                  <span class="d-block mb-1">Due Date</span>
                  <p class="text-dark">22 July 2025</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="text-center">
                  <span class="d-block mb-1">Status</span>
                  <span class="badge badge-soft-success d-inline-flex align-items-center">
                    <i class="fas fa-circle fs-6 me-1"></i>Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <h5 class="mb-2">Description</h5>
            <p>
              Hiking is a long, vigorous walk, usually on trails or footpaths in the
              countryside. Walking for pleasure developed in Europe during the eighteenth
              century. Religious pilgrimages have existed much longer but they involve
              walking long distances for a spiritual purpose associated with specific
              religions and also we achieve inner peace while we hike at a local park.
            </p>
          </div>
          <div class="mb-3">
            <h5 class="mb-2">Tags</h5>
            <div class="d-flex align-items-center">
              <span class="badge badge-danger me-2">Internal</span>
              <span class="badge badge-success me-2">Projects</span>
              <span class="badge badge-secondary">Reminder</span>
            </div>
          </div>
          <div>
            <h5 class="mb-2">Assignee</h5>
            <div class="avatar-list-stacked avatar-group-sm">
              <span class="avatar avatar-rounded">
                <img class="border border-white" src="@/assets/img/profiles/avatar-23.jpg" alt="img" />
              </span>
              <span class="avatar avatar-rounded">
                <img class="border border-white" src="@/assets/img/profiles/avatar-24.jpg" alt="img" />
              </span>
              <span class="avatar avatar-rounded">
                <img class="border border-white" src="@/assets/img/profiles/avatar-25.jpg" alt="img" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Todo Details -->

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
            <router-link to="/projects/tasks" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
