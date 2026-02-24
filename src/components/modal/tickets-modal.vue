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
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input type="text" class="form-control" placeholder="Enter Title" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Event Category</label>
                  <vue3-select :options="Redist" v-model="selected" placeholder="Select" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Subject</label>
                  <input type="text" class="form-control" placeholder="Enter Subject" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Assign To</label>
                  <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                    data-role="tagsinput" name="Label" value="Tag1" :tags="Onetags" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Ticket Description</label>
                  <textarea class="form-control" placeholder="Add Question"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <vue3-select :options="Medispr" v-model="selectedOne" placeholder="Select" />
                </div>
                <div class="mb-0">
                  <label class="form-label">Status</label>
                  <vue3-select :options="CloseTic" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
            <button type="submit" class="btn btn-primary">Add Ticket</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Ticket -->

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
            <router-link to="/tickets/tickets-grid" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
<script>
import Vue3TagsInput from "vue3-tags-input";
export default {
  components: {
    Vue3TagsInput,
  },
  data() {
    return {
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      Onetags: ["Vaughan Lewis"],
      CloseTic: [
        { label: "Select", value: "Select" },
        { label: "Closed", value: "Closed" },
        { label: "Reopened", value: "Reopened" },
        { label: "Inprogress", value: "Inprogress" },
      ],
      Medispr: [
        { label: "Select", value: "Select" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
      ],
      Daneik: [
        { label: "Select", value: "Select" },
        { label: "Teresa", value: "Teresa" },
        { label: "James", value: "James" },
        { label: "Daniel", value: "Daniel" },
        { label: "Jacquelin", value: "Jacquelin" },
      ],
      Redist: [
        { label: "Select", value: "Select" },
        { label: "Internet Issue", value: "Internet Issue" },
        { label: "Redistribute", value: "Redistribute" },
        { label: "Computer", value: "Computer" },
        { label: "Complaint", value: "Complaint" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/tickets/tickets-grid");
    },
  },
};
</script>
