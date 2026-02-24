<script>
export default {
  data() {
    return {
      title: "Companies",
      text: "CRM",
      text1: "Companies Grid",
    };
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>

<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>

  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="d-flex align-items-center border bg-white rounded p-1 me-2">
              <router-link to="/crm/companies-crm" class="btn btn-icon btn-sm me-1"><i
                  class="ti ti-list-tree"></i></router-link>
              <router-link to="/crm/companies-grid" class="btn btn-icon btn-sm active bg-primary text-white"><i
                  class="ti ti-layout-grid"></i></router-link>
            </div>
          </div>
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-2">
            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_company"
              class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add Company</a>
          </div>
          <div class="head-icons ms-2">
            <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <div class="card">
        <div class="card-body p-3">
          <div class="d-flex align-items-center justify-content-between">
            <h5>Companies Grid</h5>
            <div class="dropdown">
              <a href="javascript:void(0);"
                class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Recently Added</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Descending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Month</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last 7 Days</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-12.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">BrightWave Innovations</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-05.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-06.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-07.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-08.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-09.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  darlee@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (163) 2459 315
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Germany
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.2</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-13.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Stellar Dynamics</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-01.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-02.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-03.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-04.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-05.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  sharon@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (146) 1249 296
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  USA
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>5.0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-14.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Quantum Nexus</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-06.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-07.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-03.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-04.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-05.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  vaughan@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (158) 3459 596
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  India
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.5</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-15.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">EcoVision Enterprises</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-08.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-09.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-10.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-11.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-12.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  jessica@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (135) 3489 516
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Canada
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.5</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-16.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Aurora Technologies</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-13.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-14.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-15.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-16.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-17.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  carol@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (196) 4862 196
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  China
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>3.0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-17.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">BlueSky Ventures</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-18.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-19.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-20.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-21.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-22.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  dawn@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (163) 6498 256
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Japan
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>5.0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-18.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">TerraFusion Energy</router-link>
                </h6>
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
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-26.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-27.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  rachel@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (154) 6481 075
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Indonesia
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>3.5</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-19.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">UrbanPulse Design</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-28.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-29.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-30.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-01.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-02.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  jonella@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (184) 6348 195
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Cuba
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.5</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-20.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Nimbus Networks</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-10.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-11.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-12.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-13.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-14.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  jonathan@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (175) 2496 125
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Israel
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.4</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-21.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Epicurean Delights</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-15.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-16.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-17.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-18.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-19.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  patricia@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (132) 3145 977
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Colombia
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>2.7</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-22.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Hermann Groups</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-20.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-21.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-22.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-23.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-24.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  patricia@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (132) 3145 977
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Colombia
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.6</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="form-check form-check-md">
                  <input class="form-check-input" type="checkbox" />
                </div>
                <div>
                  <router-link to="/crm/companies-details"
                    class="avatar avatar-xl avatar-rounded online border rounded-circle">
                    <img src="@/assets/img/company/company-23.svg" class="img-fluid h-auto w-auto" alt="img" />
                  </router-link>
                </div>
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#edit_company"><i class="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);" data-bs-toggle="modal"
                        data-bs-target="#delete_modal"><i class="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-center mb-3">
                <h6 class="mb-1">
                  <router-link to="/crm/companies-details">Beacon Softwares</router-link>
                </h6>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-25.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-26.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-27.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-28.jpg" alt="img" />
                  </span>
                  <span class="avatar avatar-rounded">
                    <img class="border border-white" src="@/assets/img/profiles/avatar-29.jpg" alt="img" />
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                    +1
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-mail-forward text-gray-5 me-2"></i>
                  gloria@example.com
                </p>
                <p class="text-dark d-inline-flex align-items-center mb-2">
                  <i class="ti ti-phone text-gray-5 me-2"></i>
                  (134) 7589 6348
                </p>
                <p class="text-dark d-inline-flex align-items-center">
                  <i class="ti ti-map-pin text-gray-5 me-2"></i>
                  Brazil
                </p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div class="icons-social d-flex align-items-center">
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-mail"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-phone-call"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-message-2"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm me-1"><i
                      class="ti ti-brand-skype"></i></a>
                  <a href="javascript:void(0);" class="avatar avatar-rounded avatar-sm"><i
                      class="ti ti-brand-facebook"></i></a>
                </div>
                <span class="d-inline-flex align-items-center"><i
                    class="ti ti-star-filled text-warning me-1"></i>4.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mb-4">
        <a href="javascript:void(0);" class="btn btn-white border"><i class="ti ti-loader-3 text-primary me-2"></i>Load
          More</a>
      </div>
    </div>

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">{{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->

  <companies-crm-modal></companies-crm-modal>
</template>
