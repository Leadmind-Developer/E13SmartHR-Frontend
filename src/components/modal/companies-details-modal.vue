<template>
  <!-- Add Company -->
  <div class="modal fade" id="add_company">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Company</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                  <div
                    class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                    <img src="@/assets/img/profiles/avatar-30.jpg" alt="img" class="rounded-circle" />
                  </div>
                  <div class="profile-upload">
                    <div class="mb-2">
                      <h6 class="mb-1">Upload Profile Image</h6>
                      <p class="fs-12">Image should be below 4 mb</p>
                    </div>
                    <div class="profile-uploader d-flex align-items-center">
                      <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                        Upload
                        <input type="file" class="form-control image-sign" multiple />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-light btn-sm">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Account URL</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Website</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword ? 'text' : 'password'" class="pass-input form-control" />
                    <span @click="toggleShow" class="ti toggle-password" :class="{
                      'ti-eye': showPassword,
                      'ti-eye-off': !showPassword,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Confirm Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword1 ? 'text' : 'password'" class="pass-inputs form-control" />
                    <span @click="toggleShow1" class="ti toggle-passwords" :class="{
                      'ti-eye': showPassword1,
                      'ti-eye-off': !showPassword1,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Name <span class="text-danger"> *</span></label>
                  <vue3-select :options="AdvanSelc" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Type <span class="text-danger"> *</span></label>
                  <vue3-select :options="SelMonth" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Currency <span class="text-danger"> *</span></label>
                  <vue3-select :options="DollarSel" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Language <span class="text-danger"> *</span></label>
                  <vue3-select :options="EnglishSele" v-model="selectedThree" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="InActiveSele" v-model="selectedFour" placeholder="Select" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Company</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Company -->

  <!-- Edit Company -->
  <div class="modal fade" id="edit_company">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Company</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                  <div
                    class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                    <img src="@/assets/img/profiles/avatar-30.jpg" alt="img" class="rounded-circle" />
                  </div>
                  <div class="profile-upload">
                    <div class="mb-2">
                      <h6 class="mb-1">Upload Profile Image</h6>
                      <p class="fs-12">Image should be below 4 mb</p>
                    </div>
                    <div class="profile-uploader d-flex align-items-center">
                      <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                        Upload
                        <input type="file" class="form-control image-sign" multiple="" />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-light btn-sm">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" value="Stellar Dynamics" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" value="sophie@example.com" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Account URL</label>
                  <input type="text" class="form-control" value="sd.example.com" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" value="+1 895455450" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Website</label>
                  <input type="text" class="form-control" value="Admin Website" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword ? 'text' : 'password'" class="pass-input form-control" />
                    <span @click="toggleShow" class="ti toggle-password" :class="{
                      'ti-eye': showPassword,
                      'ti-eye-off': !showPassword,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Confirm Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword1 ? 'text' : 'password'" class="pass-inputs form-control" />
                    <span @click="toggleShow1" class="ti toggle-passwords" :class="{
                      'ti-eye': showPassword1,
                      'ti-eye-off': !showPassword1,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Name <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditAdvanSelc" v-model="selectedFive" placeholder="Advanced" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Type <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditSelMonth" v-model="selectedSix" placeholder="Monthly" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Currency <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditDollarSel" v-model="selectedSeven" placeholder="Dollar" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Language <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditEnglishSele" v-model="selectedEight" placeholder="English" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="EditInActiveSele" v-model="selectedNine" placeholder="Active" />
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
  <!-- /Edit Company -->

  <!-- Add Note -->
  <div class="modal fade" id="add_notes" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header header-border align-items-center justify-content-between">
          <h5 class="modal-title">Add New Note</h5>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Title <span class="text-danger"> *</span></label>
              <input class="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label class="form-label">Note <span class="text-danger"> *</span></label>
              <textarea class="form-control" rows="4"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Attachment <span class="text-danger"> *</span></label>
              <div
                class="d-flex align-items-center justify-content-center border border-dashed rounded p-3 flex-column">
                <span class="avatar avatar-lg avatar-rounded bg-primary-transparent mb-2"><i
                    class="ti ti-folder-open fs-24"></i></span>
                <p class="fs-14 text-center mb-2">Drag and drop your files</p>
                <div class="file-upload position-relative btn btn-sm btn-primary px-3 mb-2">
                  <i class="ti ti-upload me-1"></i>Upload
                  <input type="file" accept="video/image" />
                </div>
              </div>
            </div>
            <div class="mb-0">
              <label class="form-label">Uploaded Files</label>
              <div class="border bg-light-500 rounded mb-3 p-3">
                <h6 class="fw-medium mb-1">Projectneonals teyys.xls</h6>
                <p class="mb-2">4.25 MB</p>
                <div class="progress progress-xs mb-2">
                  <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="25"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p>45%</p>
              </div>
              <div class="d-flex align-items-center justify-content-between bg-light-500 rounded p-3">
                <div>
                  <h6 class="fw-medium mb-1">tes.txt</h6>
                  <p>1.2 MB</p>
                </div>
                <a href="javascript:void(0);" class="btn btn-sm btn-icon text-danger"><i
                    class="ti ti-trash fs-20"></i></a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="d-flex align-items-center justify-content-end m-0">
              <button type="button" class="btn btn-outline-light border me-2">
                Cancel
              </button>
              <button class="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Note -->

  <!-- Add Call -->
  <div class="modal fade" id="add_call" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header header-border align-items-center justify-content-between">
          <h5 class="modal-title">Create Call Log</h5>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Status <span class="text-danger"> *</span></label>
                  <vue3-select :options="WrongNumb" v-model="selectedTen" placeholder="Busy" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Followup Date <span class="text-danger"> *</span></label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Note <span class="text-danger"> *</span></label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="check" />
                  <label class="form-check-label" for="check">
                    Create a follow up task
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="d-flex align-items-center justify-content-end m-0">
              <button type="button" class="btn btn-outline-light border me-2">
                Cancel
              </button>
              <button class="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Call -->

  <!-- Create File -->
  <div class="modal fade" id="create_file" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header header-border align-items-center justify-content-between">
          <h5 class="modal-title">Create New File</h5>
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
                <h6 class="fw-medium">Add Recipient</h6>
              </li>
            </ul>
          </div>
          <fieldset id="first-field-file">
            <form @submit.prevent="submitFormOne">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Choose Deal <span class="text-danger"> *</span></label>
                      <vue3-select :options="Wisozk" v-model="selected1" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Document Type
                        <span class="text-danger"> *</span></label>
                      <vue3-select :options="Quote" v-model="selected2" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Owner <span class="text-danger"> *</span></label>
                      <vue3-select :options="Jackson" v-model="selected3" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Title <span class="text-danger"> *</span></label>
                      <input class="form-control" type="text" placeholder="Enter Name" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="form-label">Locale <span class="text-danger"> *</span></label>
                      <vue3-select :options="Enes" v-model="selected4" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Username <span class="text-danger"> *</span></label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Email <span class="text-danger"> *</span></label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Password <span class="text-danger"> *</span></label>
                      <div class="pass-group">
                        <input :type="showPassword ? 'text' : 'password'" class="pass-input form-control" />
                        <span @click="toggleShow" class="ti toggle-password" :class="{
                          'ti-eye': showPassword,
                          'ti-eye-off': !showPassword,
                        }"></span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Confirm Password
                        <span class="text-danger"> *</span></label>
                      <div class="pass-group">
                        <input :type="showPassword1 ? 'text' : 'password'" class="pass-inputs form-control" />
                        <span @click="toggleShow1" class="ti toggle-passwords" :class="{
                          'ti-eye': showPassword1,
                          'ti-eye-off': !showPassword1,
                        }"></span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Company</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="bg-light-500 rounded p-3 pb-0 mb-3">
                      <h4>Signature</h4>
                      <ul class="nav">
                        <li class="nav-item form-check form-check-md mb-2">
                          <span data-bs-toggle="tab" data-bs-target="#nosign">
                            <input type="radio" class="form-check-input mt-2" id="sign1" name="email" />
                            <label for="sign1" class="form-check-label"><span
                                class="d-block fw-medium text-dark mb-1">No Signature</span>This document does not
                              require a signature before
                              acceptance.</label>
                          </span>
                        </li>
                        <li class="nav-item form-check form-check-md mb-2">
                          <span class="active mb-0" data-bs-toggle="tab" data-bs-target="#use-esign">
                            <input type="radio" class="form-check-input mt-2" id="sign2" name="email" checked />
                            <label for="sign2" class="form-check-label"><span
                                class="d-block fw-medium text-dark mb-1">Use e-signature</span>This document require
                              e-signature before
                              acceptance.</label>
                          </span>
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div class="tab-pane fade" id="nosign"></div>
                        <div class="tab-pane show active" id="use-esign">
                          <div class="mb-0">
                            <label class="form-label">Document Signers
                              <span class="text-danger"> *</span></label>
                          </div>
                          <div class="sign-content">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mb-3">
                                  <input class="form-control" type="text" />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="d-flex align-items-center mb-3">
                                  <div class="flex-fill me-2">
                                    <input class="form-control" type="text" />
                                  </div>
                                  <div>
                                    <a href="javascript:void(0);" class="btn btn-icon btn-sm add-sign text-primary"><i
                                        class="ti ti-circle-plus"></i></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div>
                      <label class="form-label">Content <span class="text-danger"> *</span></label>
                      <textarea class="form-control" rows="3" placeholder="Add Content"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="d-flex align-items-center justify-content-end">
                  <button type="button" class="btn btn-outline-light border me-2">
                    Cancel
                  </button>
                  <button class="btn btn-primary wizard-next-btn" type="button">
                    Next
                  </button>
                </div>
              </div>
            </form>
          </fieldset>
          <fieldset>
            <form @submit.prevent="submitFormOne">
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="bg-light-500 rounded p-3 pb-0 mb-3">
                      <h4>Signature</h4>
                      <ul class="nav">
                        <li class="nav-item form-check form-check-md mb-2">
                          <span data-bs-toggle="tab" data-bs-target="#nosign2">
                            <input type="radio" class="form-check-input mt-2" id="sign3" name="email" />
                            <label for="sign3" class="form-check-label"><span
                                class="d-block fw-medium text-dark mb-1">No Signature</span>This document does not
                              require a signature before
                              acceptance.</label>
                          </span>
                        </li>
                        <li class="nav-item form-check form-check-md mb-2">
                          <span class="active mb-0" data-bs-toggle="tab" data-bs-target="#use-esign2">
                            <input type="radio" class="form-check-input mt-2" id="sign4" name="email" checked />
                            <label for="sign4" class="form-check-label"><span
                                class="d-block fw-medium text-dark mb-1">Use e-signature</span>This document require
                              e-signature before
                              acceptance.</label>
                          </span>
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div class="tab-pane fade" id="nosign2"></div>
                        <div class="tab-pane show active" id="use-esign2">
                          <div class="mb-0">
                            <label class="form-label">Document Signers
                              <span class="text-danger"> *</span></label>
                          </div>
                          <div class="sign-content">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mb-3">
                                  <input class="form-control" type="text" />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="d-flex align-items-center mb-3">
                                  <div class="flex-fill me-2">
                                    <input class="form-control" type="text" />
                                  </div>
                                  <div>
                                    <a href="javascript:void(0);" class="btn btn-icon btn-sm add-sign text-primary"><i
                                        class="ti ti-circle-plus"></i></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <label class="form-label">Message Subject
                        <span class="text-danger"> *</span></label>
                      <input class="form-control" type="text" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Message Text <span class="text-danger"> *</span></label>
                      <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <button type="button" class="btn btn-dark mb-3">
                      Send Now
                    </button>
                    <div class="border border-success bg-success-transparent p-3 rounded">
                      <p class="d-flex align-items-center">
                        <i class="ti ti-circle-check fs-24 me-2"></i> Document
                        Sent successfully to the Selected Recipients
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="d-flex align-items-center justify-content-end">
                  <button type="button" class="btn btn-outline-light border me-2">
                    Cancel
                  </button>
                  <button class="btn btn-primary" type="button" data-bs-dismiss="modal">
                    Save & Next
                  </button>
                </div>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
  <!-- /Create File -->

  <!-- Connect Account -->
  <div class="modal fade" id="connect_account" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header header-border align-items-center justify-content-between">
          <h5 class="modal-title">Connect Account</h5>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Account Type <span class="text-danger"> *</span></label>
                  <vue3-select :options="Imap" v-model="selected5" placeholder="select" />
                </div>
              </div>
              <div class="col-md-12">
                <div>
                  <p class="text-dark fw-medium mb-2">Sync emails from</p>
                  <div class="form-check form-check-md mb-2">
                    <input type="radio" class="form-check-input" id="email_1" name="email" />
                    <label for="email_1" class="form-check-label text-dark">Now</label>
                  </div>
                  <div class="form-check form-check-md mb-2">
                    <input type="radio" class="form-check-input" id="email_2" name="email" />
                    <label for="email_2" class="form-check-label text-dark">1 month ago</label>
                  </div>
                  <div class="form-check form-check-md mb-2">
                    <input type="radio" class="form-check-input" id="email_3" name="email" />
                    <label for="email_3" class="form-check-label text-dark">3 months ago</label>
                  </div>
                  <div class="form-check form-check-md">
                    <input type="radio" class="form-check-input" id="email_4" name="email" />
                    <label for="email_4" class="form-check-label text-dark">6 months ago</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="d-flex align-items-center justify-content-end m-0">
              <button class="btn btn-outline-light border me-2" type="button" data-bs-dismiss="modal">
                Cancel
              </button>
              <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#success_modal">
                Connect Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Connect Account -->

  <!-- Connect Account Success -->
  <div class="modal fade" id="success_modal" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center p-3">
            <span class="avatar avatar-lg avatar-rounded bg-success mb-3"><i class="ti ti-check fs-24"></i></span>
            <h5 class="mb-2">Email Connected Successfully!!!</h5>
            <p class="mb-3">
              Email Account is configured with
              <span class="d-block text-dark">“example@example.com”. </span>
              Now you can access email.
            </p>
            <router-link to="/applications/email" class="btn btn-primary w-100">Go to Email</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Connect Account Success -->

  <!-- Add Deals -->
  <div class="modal fade" id="add_deals">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Deals</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormTwo">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Deal Name <span class="text-danger"> *</span></label>
                  <vue3-select :options="Collins" v-model="selected6" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-block mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label">Pipeline <span class="text-danger"> *</span></label>
                    <a href="javascript:void(0);" class="add-new text-primary" data-bs-toggle="modal"
                      data-bs-target="#add_pipeline"><i class="ti ti-plus text-primary me-1"></i>Add New</a>
                  </div>
                  <vue3-select :options="Selectsal" v-model="selected7" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Status <span class="text-danger"> *</span></label>
                  <vue3-select :options="OpenSelec" v-model="selected8" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Deal Value <span class="text-danger"> *</span></label>
                  <vue3-select :options="Amountsel" v-model="selected9" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Currency<span class="text-danger"> *</span></label>
                  <vue3-select :options="SeleCurent" v-model="selected10" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Period <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Period Value <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Contact <span class="text-danger"> *</span></label>
                  <vue3-select :options="Darleesh" v-model="selected11" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Project * <span class="text-danger"> *</span></label>
                  <vue3-select :options="Office" v-model="selected12" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Due Date <span class="text-danger"> *</span>
                  </label>
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
                  <label class="form-label">Expected Closing Date <span class="text-danger"> *</span>
                  </label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueThree" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Assignee <span class="text-danger"> *</span></label>
                  <vue3-select :options="CompaniesStat" v-model="selected13" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tags <span class="text-danger"> *</span></label>
                  <vue3-select :options="PromotionSel" v-model="selected14" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Followup Date <span class="text-danger">*</span></label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueFour" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Source <span class="text-danger"> *</span></label>
                  <vue3-select :options="BarrySel" v-model="selected15" plaecholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Priority <span class="text-danger"> *</span></label>
                  <vue3-select :options="HighSel" v-model="selected16" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Description <span class="text-danger"> *</span></label>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Deal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Deals -->
  <activity-modal></activity-modal>
</template>
<script>
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
const valueThree = ref(new Date());
const valueFour = ref(new Date());
export default {
  data() {
    return {
      showPassword: false,
      showPassword1: false,
      valueOne,
      valueTwo,
      valueThree,
      valueFour,
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
      selectedTen: [],
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
      Collins: [
        { label: "Select", value: "Select" },
        { label: "Collins", value: "Collins" },
        { label: "Konopelsski", value: "Konopelsski" },
        { label: "Admas", value: "Admas" },
      ],
      SeleCurent: [
        { label: "Select", value: "Select" },
        { label: "$4,50,000", value: "$4,50,000" },
        { label: "$3,15,000", value: "$3,15,000" },
        { label: "$8,40,000", value: "$8,40,000" },
      ],
      Amountsel: [
        { label: "$4,50,000", value: "$4,50,000" },
        { label: "$3,15,000", value: "$3,15,000" },
        { label: "$8,40,000", value: "$8,40,000" },
      ],
      OpenSelec: [
        { label: "Select", value: "Select" },
        { label: "Open", value: "Open" },
        { label: "Won", value: "Won" },
        { label: "Lost", value: "Lost" },
      ],
      Selectsal: [
        { label: "Select", value: "Select" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "Calls", value: "Calls" },
      ],
      Darleesh: [
        { label: "Select", value: "Select" },
        { label: "Darlee Robertson", value: "Darlee Robertson" },
        { label: "Sharon Roy", value: "Sharon Roy" },
        { label: "Vaughan Lewis", value: "Vaughan Lewis" },
      ],
      Office: [
        { label: "Select", value: "Select" },
        { label: "Office Management App", value: "Office Management App" },
        { label: "Clinic Management", value: "Clinic Management" },
        { label: "Education platform", value: "Education platform" },
      ],
      CompaniesStat: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      PromotionSel: [
        { label: "Select", value: "Select" },
        { label: "Promotion", value: "Promotion" },
        { label: "Collab", value: "Collab" },
        { label: "Rated", value: "Collab" },
      ],
      BarrySel: [
        { label: "Select", value: "Select" },
        { label: "Barry Cuda", value: "Barry Cuda" },
        { label: "Tressa Wexler", value: "Tressa Wexler" },
      ],
      HighSel: [
        { label: "Select", value: "Select" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
      ],
      AdvanSelc: [
        { label: "Select", value: "Select" },
        { label: "Advanced", value: "Advanced" },
        { label: "Basic", value: "Basic" },
        { label: "Enterprise", value: "Enterprise" },
      ],
      SelMonth: [
        { label: "Select", value: "Select" },
        { label: "Monthly", value: "Monthly" },
        { label: "Yearly", value: "Yearly" },
      ],
      DollarSel: [
        { label: "Select", value: "Select" },
        { label: "Dollar", value: "Dollar" },
        { label: "Euro", value: "Euro" },
      ],
      EnglishSele: [
        { label: "Select", value: "Select" },
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
      ],
      InActiveSele: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      EditAdvanSelc: [
        { label: "Select", value: "Select" },
        { label: "Advanced", value: "Advanced" },
        { label: "Basic", value: "Basic" },
        { label: "Enterprise", value: "Enterprise" },
      ],
      EditSelMonth: [
        { label: "Select", value: "Select" },
        { label: "Monthly", value: "Monthly" },
        { label: "Yearly", value: "Yearly" },
      ],
      EditDollarSel: [
        { label: "Select", value: "Select" },
        { label: "Dollar", value: "Dollar" },
        { label: "Euro", value: "Euro" },
      ],
      EditEnglishSele: [
        { label: "Select", value: "Select" },
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
      ],
      EditInActiveSele: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      WrongNumb: [
        { label: "Busy", value: "Busy" },
        { label: "Unavailable", value: "Unavailable" },
        { label: "No Answer", value: "No Answer" },
        { label: "Wrong Number", value: "Wrong Number" },
      ],
      Enes: [
        { label: "Select", value: "Select" },
        { label: "en", value: "en" },
        { label: "es", value: "es" },
        { label: "ru", value: "ru" },
      ],
      Jackson: [
        { label: "Select", value: "Select" },
        { label: "Admin", value: "Admin" },
        { label: "Jackson Daniel", value: "Jackson Daniel" },
      ],
      Quote: [
        { label: "Select", value: "Select" },
        { label: "Contract", value: "Contract" },
        { label: "Proposal", value: "Proposal" },
        { label: "Quote", value: "Quote" },
      ],
      Wisozk: [
        { label: "Select", value: "Select" },
        { label: "Collins", value: "Collins" },
        { label: "Wisozk", value: "Wisozk" },
        { label: "Walter", value: "Walter" },
      ],
      Imap: [
        { label: "Select", value: "Select" },
        { label: "Gamil", value: "Gamil" },
        { label: "Outlook", value: "Outlook" },
        { label: "Imap", value: "Imap" },
      ],
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShow1() {
      this.showPassword1 = !this.showPassword1;
    },
    submitForm() {
      this.$router.push("/super-admin/companies");
    },
    submitFormOne() {
      this.$router.push("/crm/companies-details");
    },
    submitFormTwo() {
      this.$router.push("/crm/deals-grid");
    },
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
    buttonLabel1() {
      return this.showPassword1 ? "Hide" : "Show";
    },
  },
};
</script>
