<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="head-icons ms-2">
          <a
            href="javascript:void(0);"
            class=""
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Collapse"
            id="collapse-header"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <settings-tab></settings-tab>
      <div class="row">
        <website-sidebar></website-sidebar>
        <div class="col-xl-9">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom mb-3 pb-3">
                <h4>Localization</h4>
              </div>
              <form @submit.prevent="submitForm">
                <div class="border-bottom mb-3">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Language</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="SpaSel"
                            v-model="selected"
                            placeholder="Select"
                          />

                          <p
                            class="fs-13 fw-normal mt-2 form-check form-check-md form-switch me-2"
                          >
                            <input
                              class="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />Language Switcher
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Timezone</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="TimeSel"
                            v-model="selectedOne"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Date Format</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="DateSel"
                            v-model="selectedTwo"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Time Format</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="FormSel"
                            v-model="selectedThree"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Financial Year</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="FinaSel"
                            v-model="selectedFour"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Starting Month</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="StarSel"
                            v-model="selectedFive"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-bottom mb-3">
                  <h6 class="mb-3">Currency Information</h6>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Currency</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="AmerSel"
                            v-model="selectedSix"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Currency Symbol</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="CurrSe"
                            v-model="selectedSeven"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Currency Position</label>
                        </div>
                        <div class="col-md-7"></div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Decimal Seperator</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="DecSel"
                            v-model="selectedEight"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Thousand Seperator</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="ThouSel"
                            v-model="selectedNine"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-bottom mb-3">
                  <h6 class="mb-3">Country Settings</h6>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Countries Restriction</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="CountSele"
                            v-model="selectedEleven"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-bottom mb-3">
                  <h6 class="mb-3">File Settings</h6>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Allowed Files</label>
                        </div>
                        <div class="col-md-7">
                          <vue3-select
                            :options="FilSel"
                            v-model="selectedTen"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row align-items-center mb-3">
                        <div class="col-md-5">
                          <label class="form-label mb-md-0">Max File Size</label>
                        </div>
                        <div class="col-md-7">
                          <input type="text" class="form-control" placeholder="5000 MB" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-end">
                  <button type="button" class="btn btn-outline-light border me-3">
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">{{new Date().getFullYear()}} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      selectedFour: [],
      selectedFive: [],
      selectedSix: [],
      selectedSeven: [],
      selectedEight: [],
      selectedNine: [],
      selectedEleven: [],
      selectedTen: [],
      TimeSel: [{label: "Select", value: "Select"}, {label: "(UTC +5:30)", value: "(UTC +5:30)"}, {label: "(UTC+11:00) INR", value: "(UTC+11:00) INR"}],
      SpaSel: [{label: "Select", value: "Select"}, {label: "English", value: "English"}, {label: "French", value: "French"}, {label: "Spanish", value: "Spanish"}],
      DateSel: [{label: "Select", value: "Select"}, {label: "15 Nov 2024", value: "15 Nov 2024"}, {label: "Nov 15 2024", value: "Nov 15 2024"}],
      FormSel: [{label: "Select", value: "Select"}, {label: "12 Hours", value: "12 Hours"}, {label: "24 Hours", value: "24 Hours"}],
      FinaSel: [{label: "Select", value: "Select"}, {label: "2024", value: "2024"}, {label: "2023", value: "2023"}],
      StarSel: [{label: "Select", value: "Select"}, {label: "January", value: "January"}, {label: "February", value: "February"}, {label: "March", value: "March"}],
      AmerSel: [{label: "Select", value: "Select"}, {label: "United State of America", value: "United State of America"}, {label: "India", value: "India"}],
      CurrSe: [{label: "Select", value: "Select"}, {label: "$", value: "$"}, {label: "€", value: "€"}],
      PosSel: [{label: "Select", value: "Select"}, {label: "100$", value: "100$"}, {label: "$100", value: "$100"}],
      DecSel: [{label: "Select", value: "Select"}, {label: ".", value: "."}, {label: ".", value: "."}],
      ThouSel: [{label: "Select", value: "Select"}, {label: ",", value: ","}, {label: ",", value: ","}],
      CountSele: [{label: "Select", value: "Select"}, {label: "Allow All Countries", value: "Allow All Countries"}, {label: "Deny All Countries", value: "Deny All Countries"}],
      FilSel: [{label: "Select", value: "Select"}, {label: "jpg", value: "jpg"}, {label: "gif", value: "gif"}, {label: "png", value: "png"}],
      title: "Settings",
      text: "Website Settings",
      text1: "Localization Settings",
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/website-settings/localization-settings");
    },

    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>
