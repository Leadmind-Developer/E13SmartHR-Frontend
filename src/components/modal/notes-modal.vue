<template>
  <!-- Add Note -->
  <div class="modal fade" id="add_note">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Notes</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Note Title</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Assignee</label>
                  <vue3-select :options="NotAss" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Tag</label>
                  <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                    data-role="tagsinput" name="Label" value="Tag1" :tags="tagsOne" />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <vue3-select :options="PrioSelec" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-6">
                <div class="input-blocks todo-calendar">
                  <label class="form-label">Due Date</label>
                  <div class="input-groupicon calender-input">
                    <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="ActSel" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-0 summer-description-box notes-summernote">
                  <label class="form-label">Descriptions</label>
                  <div class="quill-editor">
                    <div class="editor three-line">
                      <div class="editor-container">
                        <div ref="editorRef" class="quill-editor" />
                      </div>
                    </div>
                  </div>
                  <small>Maximum 60 Characters</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Note -->

  <!-- Edit Note -->
  <div class="modal fade" id="edit-note-units">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Notes</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Note Title</label>
                  <input type="text" class="form-control" value="Team meet at Starbucks" />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Assignee</label>
                  <vue3-select :options="EditNotAss" v-model="selectedThree" placeholder="Kathleen" />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Tag</label>
                  <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                    data-role="tagsinput" name="Label" value="Tag1" :tags="tagsOne" />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <vue3-select :options="EditPrioSelec" v-model="selectedFour" placeholder="Medium" />
                </div>
              </div>
              <div class="col-6">
                <div class="input-blocks todo-calendar">
                  <label class="form-label">Due Date</label>
                  <div class="input-groupicon calender-input">
                    <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="EditActSel" v-model="selectedFive" placeholder="Active" />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-0 summer-description-box notes-summernote">
                  <label class="form-label">Descriptions</label>
                  <div class="quill-editor">
                    <div class="editor three-line">
                      <div class="editor-container">
                        <div ref="editorRefOne" class="quill-editor" />
                      </div>
                    </div>
                  </div>
                  <small>Maximum 60 Characters</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Note -->

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
            <router-link to="/applications/notes" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->

  <!-- View Note -->
  <div class="modal fade" id="view-note-units">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header">
              <div class="d-flex align-items-center">
                <h4 class="modal-title me-3">Notes</h4>
                <p class="text-info">Personal</p>
              </div>
              <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div>
                    <h4 class="mb-2">Meet Lisa to discuss project details</h4>
                    <p>
                      Hiking is a long, vigorous walk, usually on trails or footpaths in
                      the countryside. Walking for pleasure developed in Europe during the
                      eighteenth century. Religious pilgrimages have existed much longer
                      but they involve walking long distances for a spiritual purpose
                      associated with specific religions and also we achieve inner peace
                      while we hike at a local park.
                    </p>

                    <p class="badge bg-outline-danger d-inline-flex align-items-center mb-0">
                      <i class="fas fa-circle fs-6 me-1"></i> High
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a href="javascript:void(0);" class="btn btn-danger" data-bs-dismiss="modal">Close</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /View Note -->
</template>
<script>
import { ref } from "vue";
const valueOne = ref(new Date());
import Vue3TagsInput from "vue3-tags-input";
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  components: {
    Vue3TagsInput,
  },
  data() {
    return {
      content: "",
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      selectedFour: [],
      selectedFive: [],
      valueOne,
      tagsOne: ["Pending", "Done"],
      NotAss: [
        { label: "Choose", value: "Choose" },
        { label: "Kathleen", value: "Kathleen" },
        { label: "Gifford", value: "Gifford" },
      ],
      PrioSelec: [
        { label: "Select", value: "Select" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
      ],
      ActSel: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      EditNotAss: [
        { label: "Choose", value: "Choose" },
        { label: "Kathleen", value: "Kathleen" },
        { label: "Gifford", value: "Gifford" },
      ],
      EditPrioSelec: [
        { label: "Select", value: "Select" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
      ],
      EditActSel: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    };
  },
  mounted() {
    this.initQuill();
  },
  methods: {
    submitForm() {
      this.$router.push("/applications/notes");
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
