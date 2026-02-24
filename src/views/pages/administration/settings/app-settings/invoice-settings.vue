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
        <app-sidebar></app-sidebar>
        <div class="col-xl-9">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom mb-3 pb-3">
                <h4>Invoice Settings</h4>
              </div>
              <form @submit.prevent="submitForm">
                <div class="border-bottom mb-3">
                  <div class="row">
                    <div class="col-md-12">
                      <div>
                        <div class="row">
                          <div class="col-md-3">
                            <div class="mb-3">
                              <h6>Invoice Logo</h6>
                            </div>
                          </div>
                          <div class="col-md-9">
                            <div
                              class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4"
                            >
                              <div
                                class="d-flex align-items-center justify-content-center og-upload bg-white rounded border border-dashed me-2 flex-shrink-0 text-dark frames"
                              >
                                <i class="ti ti-photo text-gray-3 fs-16"></i>
                              </div>
                              <div class="profile-upload">
                                <div class="mb-2">
                                  <h6 class="mb-1">Logo</h6>
                                  <p class="fs-12">
                                    Recommended image size is 40px x 40px
                                  </p>
                                </div>
                                <div class="profile-uploader d-flex align-items-center">
                                  <div
                                    class="drag-upload-btn btn btn-sm btn-primary me-2"
                                  >
                                    Upload
                                    <input
                                      type="file"
                                      class="form-control image-sign"
                                      multiple=""
                                    />
                                  </div>
                                  <a
                                    href="javascript:void(0);"
                                    class="btn btn-light btn-sm"
                                    >Cancel</a
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-md-3">
                            <div class="mb-3">
                              <h6>Invoice Prefix</h6>
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="mb-3">
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-md-3">
                            <div class="mb-3">
                              <h6>Invoice Due</h6>
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="mb-3">
                              <vue3-select
                                :options="SelecInv"
                                v-model="selected"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div class="col-md-5">
                            <h6 class="mb-3">Days</h6>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-md-3">
                            <div class="mb-3 d-flex">
                              <h6>Invoice Round Off</h6>
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="mb-3">
                              <vue3-select
                                :options="DownDel"
                                v-model="selectedOne"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-3">
                            <div class="mb-3 d-flex">
                              <h6>Show Company Details</h6>
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="mb-3">
                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-md-3">
                            <div class="mb-3">
                              <h6>Invoice Terms</h6>
                            </div>
                          </div>
                          <div class="col-md-9">
                            <div class="mb-3">
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
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  data() {
    return {
      content: "",
      SelecInv: [
        { label: "Select", value: "Select" },
        { label: "5", value: "5" },
        { label: "7", value: "7" },
      ],
      DownDel: [
        { label: "Select", value: "Select" },
        { label: "RoundOff Up", value: "RoundOff Up" },
      ],
      title: "Settings",
      text: "App Settings",
      text1: "Invoice Settings",
    };
  },
  mounted() {
    this.initQuill();
  },
  methods: {
    submitForm() {
      this.$router.push("/general-settings/profile-settings");
    },
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
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
