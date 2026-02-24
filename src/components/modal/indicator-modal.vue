<script>
export default {
  data() {
    return {
      selected: [],
      selected1: [],
      selected2: [],
      selected3: [],
      selected4: [],
      selected5: [],
      selected6: [],
      selected7: [],
      selected8: [],
      selected9: [],
      selected10: [],
      selected11: [],
      selected12: [],
      selected13: [],
      selected14: [],
      selected15: [],
      selected16: [],
      selected17: [],
      selected18: [],
      selected19: [],
      selected20: [],
      selected21: [],
      selected22: [],
      selected23: [],
      selected24: [],
      selected25: [],
      selected26: [],
      selected27: [],
      selected28: [],
      selected29: [],
      selected30: [],
      selected31: [],
      Designation: [{label: "Select", value: "Select"}, {label: "Web Designer", value: "Web Designer"}, {label: "Web Developer", value: "Web Developer"}, {label: "IOS Developer", value: "IOS Developer"}],
      Experience: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Marketing: [{label: "Select", value: "Select"}, {label: "Expert/Leader", value: "Expert/Leader"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Management: [{label: "Select", value: "Select"}, {label: "Intermediate", value: "Intermediate"}, {label: "Medium", value: "Medium"}, {label: "Average", value: "Average"}],
      Administration: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Presentation: [{label: "Select", value: "Select"}, {label: "None", value: "None"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Quality: [{label: "Select", value: "Select"}, {label: "None", value: "None"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Efficiency: [{label: "Select", value: "Select"}, {label: "None", value: "None"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Integrity: [{label: "Select", value: "Select"}, {label: "None", value: "None"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Professionalism: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Teamwork: [{label: "Select", value: "Select"}, {label: "None", value: "None"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Critical: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Conflict: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Attendance: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Ability: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      AbilityOne: [{label: "Select", value: "Select"}, {label: "Advanced", value: "Advanced"}, {label: "Intermediate", value: "Intermediate"}, {label: "Average", value: "Average"}],
      Status: [{label: "Select", value: "Select"}, {label: "Active", value: "Active"}, {label: "Inactive", value: "Inactive"}],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/performance/performance-indicator");
    },
  },
};
</script>

<template>
  <!-- Add Indicator -->
  <div class="modal fade" id="add_performance_indicator">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Indicator</h4>
          <button
            type="button"
            class="btn-close custom-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Designation</label>
                  <vue3-select
                    :options="Designation"
                    v-model="selected"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <h6 class="fw-medium">Technical</h6>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Customer Experience</label>
                  <vue3-select
                    :options="Experience"
                    v-model="selected1"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Marketing</label>
                  <vue3-select
                    :options="Marketing"
                    v-model="selected2"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Management</label>
                  <vue3-select
                    :options="Management"
                    v-model="selected3"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Administration</label>
                  <vue3-select
                    :options="Administration"
                    v-model="selected4"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Presentation Skills</label>
                  <vue3-select
                    :options="Presentation"
                    v-model="selected5"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Quality of Work</label>
                  <vue3-select :options="Quality" v-model="selected6" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Efficiency</label>
                  <vue3-select
                    :options="Efficiency"
                    v-model="selected7"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <h6 class="fw-medium">Organizational</h6>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Integrity</label>
                  <vue3-select
                    :options="Integrity"
                    v-model="selected8"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Professionalism</label>
                  <vue3-select
                    :options="Professionalism"
                    v-model="selected9"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Team Work</label>
                  <vue3-select
                    :options="Teamwork"
                    v-model="selected10"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Critical Thinking</label>
                  <vue3-select
                    :options="Critical"
                    v-model="selected11"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Conflict Management</label>
                  <vue3-select
                    :options="Conflict"
                    v-model="selected12"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Attendance</label>
                  <vue3-select
                    :options="Attendance"
                    v-model="selected13"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Ability To Meet Deadline</label>
                  <vue3-select :options="Ability" v-model="selected14" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selected15" placeholder="Select" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Indicator</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Indicator -->

  <!-- Edit Indicator -->
  <div class="modal fade" id="edit_performance-indicator">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Indicator</h4>
          <button
            type="button"
            class="btn-close custom-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Designation</label>
                  <vue3-select
                    :options="Designation"
                    v-model="selected16"
                    placeholder="Web Designer"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <h6 class="fw-medium">Technical</h6>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Customer Experience</label>
                  <vue3-select
                    :options="Experience"
                    v-model="selected17"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Marketing</label>
                  <vue3-select
                    :options="Marketing"
                    v-model="selected18"
                    placeholder="Expert/Leader"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Management</label>
                  <vue3-select
                    :options="Management"
                    v-model="selected19"
                    placeholder="Intermediate"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Administration</label>
                  <vue3-select
                    :options="Administration"
                    v-model="selected20"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Presentation Skills</label>
                  <vue3-select
                    :options="Presentation"
                    v-model="selected21"
                    placeholder="None"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Quality of Work</label>
                  <vue3-select :options="Quality" v-model="selected22" placeholder="None" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Efficiency</label>
                  <vue3-select
                    :options="Efficiency"
                    v-model="selected23"
                    placeholder="None"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <h6 class="fw-medium">Organizational</h6>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Integrity</label>
                  <vue3-select
                    :options="Integrity"
                    v-model="selected24"
                    placeholder="None"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Professionalism</label>
                  <vue3-select
                    :options="Professionalism"
                    v-model="selected25"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Team Work</label>
                  <vue3-select
                    :options="Teamwork"
                    v-model="selected26"
                    placeholder="None"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Critical Thinking</label>
                  <vue3-select
                    :options="Critical"
                    v-model="selected27"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Conflict Management</label>
                  <vue3-select
                    :options="Conflict"
                    v-model="selected28"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Attendance</label>
                  <vue3-select
                    :options="Attendance"
                    v-model="selected29"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Ability To Meet Deadline</label>
                  <vue3-select
                    :options="AbilityOne"
                    v-model="selected30"
                    placeholder="Advanced"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select
                    :options="Status"
                    v-model="selected31"
                    placeholder="Active"
                  />
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
  <!-- /Edit Indicator -->

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
            <a
              href="javascript:void(0);"
              class="btn btn-light me-3"
              data-bs-dismiss="modal"
              >Cancel</a
            >
            <router-link to="/performance/performance-indicator" class="btn btn-danger"
              >Yes, Delete</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
