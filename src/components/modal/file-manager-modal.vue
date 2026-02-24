<template>
  <!-- Preview -->
  <div class="sidebar-themesettings offcanvas offcanvas-end" id="preview">
    <div
      class="offcanvas-header d-flex align-items-center justify-content-between bg-dark"
    >
      <div>
        <h4 class="mb-1 text-white">Preview</h4>
      </div>
      <div class="d-flex align-items-center">
        <a href="javascript:void(0);" class="d-flex align-items-center justify-content-center me-3"
          ><i class="ti ti-star-filled filled text-warning"></i
        ></a>
        <a
          href="javascript:void(0);"
          class="d-flex align-items-center justify-content-center text-white me-3"
          ><i class="ti ti-trash"></i
        ></a>
        <a
          href="javascript:void(0);"
          class="custom-btn-close d-flex align-items-center justify-content-center text-white"
          data-bs-dismiss="offcanvas"
          ><i class="ti ti-x"></i
        ></a>
      </div>
    </div>
    <div class="offcanvas-body p-0">
      <div class="bg-light document-wrap text-center">
        <div class="mb-2">
          <img src="@/assets/img/icons/pdf-icon.svg" alt="icon" />
        </div>
        <h4 class="mb-1">
          Document Final Proof Read<span
            class="badge badge-secondary-transparent fw-normal fs-12 ms-2"
            >2.4 GB</span
          >
        </h4>
        <p>Last Accessed on 15 Mar 2025, 08:15:23 PM</p>
      </div>
      <div class="preview-content">
        <h4 class="mb-3">File Info</h4>
        <div class="file-type p-2 pb-0 gx-2 mb-2">
          <div class="text-center mb-2 border-end me-2">
            <p class="fs-12 mb-0">File Type</p>
            <p class="text-title">PDF</p>
          </div>
          <div class="text-center mb-2 border-end me-2 pe-2">
            <p class="fs-12 mb-0">Created on</p>
            <p class="text-title text-nowrap">22 July 2025, 08:30 PM</p>
          </div>
          <div class="text-center mb-2 border-0">
            <p class="fs-12 mb-0">Location</p>
            <p class="text-title">Drive</p>
          </div>
        </div>
        <div class="mb-4">
          <h6 class="mb-2 fw-medium">Description</h6>
          <div class="summernote"></div>
        </div>
        <h4 class="mb-3">Recent Activity</h4>
        <div class="card shadow-none">
          <div class="card-body p-3 pb-0">
            <h6 class="mb-3">Today</h6>
            <ul class="recent-activity mb-3">
              <li class="d-flex">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-01.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2 flex-grow-1">
                  <p class="mb-0">
                    <span class="text-title">Mercy</span> Added New File in
                    <span class="text-title">Drive</span>
                  </p>
                  <p class="mb-0">05:22 PM</p>
                  <div
                    class="bg-light rounded p-2 d-flex align-items-center justify-content-between mt-1"
                  >
                    <div class="d-flex align-items-center">
                      <i class="ti ti-video text-title fs-16"></i>
                      <p class="ms-2">All_files.mp4</p>
                    </div>
                    <span class="fs-12">8.2 MB</span>
                  </div>
                </div>
              </li>
              <li class="d-flex">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-15.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2 flex-grow-1">
                  <p class="mb-0">
                    <span class="text-title">Druman</span> Added New File in
                    <span class="text-title">ROOT FOLDER</span>
                  </p>
                  <p class="mb-0">05:23 PM</p>
                  <div
                    class="bg-light rounded p-2 d-flex align-items-center justify-content-between mt-1"
                  >
                    <div class="d-flex align-items-center">
                      <i class="ti ti-photo text-title fs-16"></i>
                      <p class="ms-2">WebsiteBackupScreen.png</p>
                    </div>
                    <span class="fs-12">3.2 MB</span>
                  </div>
                  <div
                    class="bg-light rounded p-2 d-flex align-items-center justify-content-between mt-1"
                  >
                    <div class="d-flex align-items-center">
                      <i class="ti ti-file-zip text-title fs-16"></i>
                      <p class="ms-2">Finaldraft.zip</p>
                    </div>
                    <span class="fs-12">4 MB</span>
                  </div>
                  <div
                    class="bg-light rounded p-2 d-flex align-items-center justify-content-between mt-1"
                  >
                    <div class="d-flex align-items-center">
                      <i class="ti ti-photo text-title fs-16"></i>
                      <p class="ms-2">Photo.jpg</p>
                    </div>
                    <span class="fs-12">6.5 MB</span>
                  </div>
                </div>
              </li>
            </ul>
            <h6 class="mb-3">28 Jan 2025</h6>
            <ul class="recent-activity mb-3">
              <li class="d-flex">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-29.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2 flex-grow-1">
                  <p class="mb-0">
                    <span class="text-title">Mercy</span> Added New File in
                    <span class="text-title">Personal Assets</span>
                  </p>
                  <p class="mb-0">05:22 PM</p>
                  <div
                    class="bg-light rounded p-2 d-flex align-items-center justify-content-between mt-1"
                  >
                    <div class="d-flex align-items-center">
                      <i class="ti ti-photo text-title fs-16"></i>
                      <p class="ms-2">Photo_12.jpg</p>
                    </div>
                    <span class="fs-12">6.2 MB</span>
                  </div>
                </div>
              </li>
              <li class="d-flex">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-25.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2 flex-grow-1">
                  <p class="mb-0">
                    <span class="text-title">Jackson</span> Added New File in
                    <span class="text-title">Drive</span>
                  </p>
                  <p class="mb-0">05:23 PM</p>
                  <div
                    class="bg-light rounded p-2 d-flex align-items-center justify-content-between mt-1"
                  >
                    <div class="d-flex align-items-center">
                      <i class="ti ti-photo text-title fs-16"></i>
                      <p class="ms-2">Photo.jpg</p>
                    </div>
                    <span class="fs-12">15.5 MB</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mb-3">Members</h4>
          <a
            href="javascript:void(0);"
            class="fs-12 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#add_member"
            >Add Members</a
          >
        </div>
        <div class="card shadow-none mb-0">
          <div class="card-body p-3 pb-0">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center mb-2">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-29.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2">
                  <h6 class="fw-medium">Anthony Lewis</h6>
                  <p class="fs-12">Finance</p>
                </div>
              </div>
              <a href="javascript:void(0);" class="user-icon mb-2">
                <i class="ti ti-user-x fs-16"></i>
              </a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center mb-2">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-06.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2">
                  <h6 class="fw-medium">Harvey Smith</h6>
                  <p class="fs-12">Developer</p>
                </div>
              </div>
              <a href="javascript:void(0);" class="user-icon mb-2">
                <i class="ti ti-user-x fs-16"></i>
              </a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center mb-2">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-02.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2">
                  <h6 class="fw-medium">Stephan Peralt</h6>
                  <p class="fs-12">Executive Officer</p>
                </div>
              </div>
              <a href="javascript:void(0);" class="user-icon mb-2">
                <i class="ti ti-user-x fs-16"></i>
              </a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center mb-2">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-26.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2">
                  <h6 class="fw-medium">Doglas Martini</h6>
                  <p class="fs-12">Manager</p>
                </div>
              </div>
              <a href="javascript:void(0);" class="user-icon mb-2">
                <i class="ti ti-user-x fs-16"></i>
              </a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center mb-2">
                <span class="avatar avatar-md">
                  <img
                    src="@/assets/img/profiles/avatar-01.jpg"
                    class="rounded-circle"
                    alt="img"
                  />
                </span>
                <div class="ms-2">
                  <h6 class="fw-medium">Linda Ray</h6>
                  <p class="fs-12">Finance</p>
                </div>
              </div>
              <a href="javascript:void(0);" class="user-icon mb-2">
                <i class="ti ti-user-x fs-16"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Preview -->

  <!-- Create Folder -->
  <div class="modal fade" id="add_folder">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Create Folder</h4>
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
          <div class="modal-body">
            <div class="mb-0">
              <label class="form-label">Folder Name</label>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add New Folder</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Create Folder -->

  <!-- Add Customer -->
  <div class="modal fade" id="add_member">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Members</h4>
          <button
            type="button"
            class="btn-close custom-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="position-relative input-icon mb-3">
            <span class="input-icon-addon">
              <i class="ti ti-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search Email" />
          </div>
          <div class="form-check ps-0">
            <label
              class="form-check-label member-check-list activate d-flex align-items-center justify-content-between p-2 rounded mb-1"
            >
              <span class="d-flex align-items-center text-dark">
                <span class="avatar avatar-md avatar-rounded">
                  <img src="@/assets/img/profiles/avatar-01.jpg" class="me-2" alt="Img" />
                </span>
                Sophie
              </span>
              <input type="checkbox" class="form-check-input" checked />
            </label>
            <label
              class="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1"
            >
              <span class="d-flex align-items-center text-dark">
                <span class="avatar avatar-md avatar-rounded">
                  <img src="@/assets/img/profiles/avatar-02.jpg" class="me-2" alt="Img" />
                </span>
                Cameron
              </span>
              <input type="checkbox" class="form-check-input" />
            </label>
            <label
              class="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1"
            >
              <span class="d-flex align-items-center text-dark">
                <span class="avatar avatar-md avatar-rounded">
                  <img src="@/assets/img/profiles/avatar-03.jpg" class="me-2" alt="Img" />
                </span>
                Doris
              </span>
              <input type="checkbox" class="form-check-input" />
            </label>
            <label
              class="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1"
            >
              <span class="d-flex align-items-center text-dark">
                <span class="avatar avatar-md avatar-rounded">
                  <img src="@/assets/img/profiles/avatar-04.jpg" class="me-2" alt="Img" />
                </span>
                Rufana
              </span>
              <input type="checkbox" class="form-check-input" />
            </label>
            <label
              class="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1"
            >
              <span class="d-flex align-items-center text-dark">
                <span class="avatar avatar-md avatar-rounded">
                  <img src="@/assets/img/profiles/avatar-04.jpg" class="me-2" alt="Img" />
                </span>
                Michael
              </span>
              <input type="checkbox" class="form-check-input" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add Customer -->
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    submitForm() {
      this.$router.push("/applications/file-manager");
    },
  },
};
</script>
