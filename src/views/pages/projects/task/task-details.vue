<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="row align-items-center mb-4">
        <div
          class="d-md-flex d-sm-block justify-content-between align-items-center flex-wrap"
        >
          <h6 class="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0">
            <router-link to="/projects/tasks">
              <i class="ti ti-arrow-left me-2"></i>Back to List</router-link
            >
          </h6>
          <div class="d-flex">
            <div class="text-end">
              <a
                href="javascript:void(0);"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#edit_task"
                ><i class="ti ti-edit me-1"></i>Edit Task</a
              >
            </div>
            <div class="head-icons ms-2 text-end">
              <a
                href="javascript:void(0);"
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
        </div>
      </div>
      <!-- /Breadcrumb -->

      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body pb-1">
              <div
                class="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4"
              >
                <div>
                  <h4 class="mb-1">
                    Patient and Doctor video conferencing Module
                  </h4>
                  <p>
                    Priority :
                    <span class="badge badge-danger"
                      ><i class="ti ti-point-filled me-1"></i>High</span
                    >
                  </p>
                </div>
                <div class="dropdown">
                  <a
                    href="javascript:void(0);"
                    class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    <i class="ti ti-file-export me-1"></i>
                    Mark All as Completed
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item rounded-1"
                        >All Tags</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item rounded-1"
                        >Internal</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item rounded-1"
                        >Projects</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item rounded-1"
                        >Meetings</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item rounded-1"
                        >Reminder</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item rounded-1"
                        >Research</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-sm-12">
                  <div class="mb-3">
                    <h6 class="mb-1">Description</h6>
                    <p>
                      The Enhanced Patient Management System (EPMS) project aims
                      to modernize and streamline the patient management
                      processes within. By integrating advanced technologies and
                      optimizing existing workflows, the project seeks to
                      improve patient care, enhance operational efficiency, and
                      ensure compliance with regulatory standards.
                    </p>
                  </div>
                </div>
                <div class="col-sm-3">
                  <p class="d-flex align-items-center mb-3">
                    <i class="ti ti-users-group me-2"></i>Team
                  </p>
                </div>
                <div class="col-sm-9">
                  <div class="d-flex align-items-center mb-3">
                    <div
                      class="bg-gray-100 p-1 rounded d-flex align-items-center me-2"
                    >
                      <a
                        href="javascript:void(0);"
                        class="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2"
                      >
                        <img
                          src="@/assets/img/profiles/avatar-12.jpg"
                          alt="Img"
                        />
                      </a>
                      <h6 class="fs-12">
                        <a href="javascript:void(0);">Lewis</a>
                      </h6>
                    </div>
                    <div
                      class="bg-gray-100 p-1 rounded d-flex align-items-center me-2"
                    >
                      <a
                        href="javascript:void(0);"
                        class="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2"
                      >
                        <img src="@/assets/img/users/user-19.jpg" alt="Img" />
                      </a>
                      <h6 class="fs-12">
                        <a href="javascript:void(0);">Leona</a>
                      </h6>
                    </div>
                    <div
                      class="bg-gray-100 p-1 rounded d-flex align-items-center me-2"
                    >
                      <a
                        href="javascript:void(0);"
                        class="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2"
                      >
                        <img src="@/assets/img/users/user-33.jpg" alt="Img" />
                      </a>
                      <h6 class="fs-12">
                        <a href="javascript:void(0);">Pineiro</a>
                      </h6>
                    </div>
                    <div
                      class="bg-gray-100 p-1 rounded d-flex align-items-center me-2"
                    >
                      <a
                        href="javascript:void(0);"
                        class="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2"
                      >
                        <img src="@/assets/img/users/user-37.jpg" alt="Img" />
                      </a>
                      <h6 class="fs-12">
                        <a href="javascript:void(0);">Moseley</a>
                      </h6>
                    </div>
                    <div>
                      <a
                        href="javascript:void(0);"
                        class="d-flex align-items-center fs-12"
                        ><i class="ti ti-circle-plus me-1"></i>Add New</a
                      >
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <p class="d-flex align-items-center mb-3">
                    <i class="ti ti-user-shield me-2"></i>Assignee
                  </p>
                </div>
                <div class="col-sm-9">
                  <div class="d-flex align-items-center mb-3">
                    <div
                      class="bg-gray-100 p-1 rounded d-flex align-items-center me-2"
                    >
                      <a
                        href="javascript:void(0);"
                        class="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2"
                      >
                        <img src="@/assets/img/users/user-42.jpg" alt="Img" />
                      </a>
                      <h6 class="fs-12">
                        <a href="javascript:void(0);">Ruth</a>
                      </h6>
                    </div>
                    <div>
                      <a
                        href="javascript:void(0);"
                        class="d-flex align-items-center fs-12"
                        ><i class="ti ti-circle-plus me-1"></i>Add New</a
                      >
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <p class="d-flex align-items-center mb-3">
                    <i class="ti ti-bookmark me-2"></i>Tags
                  </p>
                </div>
                <div class="col-sm-9">
                  <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-pink rounded-pill me-2"
                      >Admin Panel</span
                    >
                    <span class="badge badge-info rounded-pill">High Tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="custom-accordion-items">
            <div class="accordion accordions-items-seperate">
              <div class="accordion-item">
                <div class="accordion-header" id="headingFour">
                  <div class="accordion-button">
                    <div class="d-flex align-items-center flex-fill">
                      <h5>Files</h5>
                      <div class="ms-auto d-flex align-items-center">
                        <a
                          href="javascript:void(0);"
                          class="btn btn-primary btn-xs d-inline-flex align-items-center me-3"
                          ><i class="ti ti-square-rounded-plus-filled me-1"></i
                          >Add New</a
                        >
                        <a
                          href="javascript:void(0);"
                          class="d-flex align-items-center collapse-arrow"
                          data-bs-toggle="collapse"
                          data-bs-target="#primaryBorderFour"
                          aria-expanded="true"
                          aria-controls="primaryBorderFour"
                        >
                          <i class="ti ti-chevron-down fs-18"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="primaryBorderFour"
                  class="accordion-collapse collapse show border-top"
                  aria-labelledby="headingFour"
                >
                  <div class="accordion-body">
                    <div class="files-carousel owl-carousel">
                      <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
                        <Slide v-for="item in TaskDetailsCarousel" :key="item.id">
                          <div class="card shadow-none mb-0">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                                    <div class="d-flex align-items-center overflow-hidden">
                                        <a href="javascript:void(0);" class="avatar avatar-md bg-light me-2">
                                            <img :src="getImageUrl(item.Logo)" class="w-auto h-auto" alt="img">
                                        </a>
                                        <div class="overflow-hidden">
                                            <h6 class="mb-1 text-truncate">{{item.File_type}}</h6>
                                            <span>{{item.Size}}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <a href="javascript:void(0);" class="btn btn-sm btn-icon"><i class="ti ti-download"></i></a>
                                        <a href="javascript:void(0);" class="btn btn-sm btn-icon"><i class="ti ti-trash"></i></a>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <p class="fw-medium mb-0">{{ item.Day }}</p>
                                    <span class="avatar avatar-sm avatar-rounded"><img :src="getImageUrlOne(item.Image)" alt="Img"></span>
                                </div>
                            </div>
                          </div>
                        </Slide>
                        <template #addons>
                          <!-- <Navigation /> -->
                        </template>
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="card">
            <div class="card-body p-0">
              <div class="d-flex flex-column">
                <div
                  class="d-flex align-items-center justify-content-between border-bottom p-3"
                >
                  <p class="mb-0">Project</p>
                  <h6 class="fw-normal">Hospital Administration</h6>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between border-bottom p-3"
                >
                  <p class="mb-0">Created on</p>
                  <h6 class="fw-normal">14 Nov 2026</h6>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between border-bottom p-3"
                >
                  <p class="mb-0">Started on</p>
                  <h6 class="fw-normal">15 Jan 2026</h6>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between p-3"
                >
                  <p class="mb-0">Due Date</p>
                  <h6 class="fw-normal">15 Nov 2026</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="custom-accordion-items">
            <div class="accordion accordions-items-seperate">
              <div class="accordion-item flex-fill">
                <div class="accordion-header" id="headingSix">
                  <div class="accordion-button">
                    <div class="d-flex align-items-center flex-fill">
                      <h5>Activity</h5>
                      <div class="d-flex align-items-center ms-auto">
                        <a
                          href="javascript:void(0);"
                          class="btn btn-primary btn-xs d-inline-flex align-items-center me-3"
                          ><i class="ti ti-square-rounded-plus-filled me-1"></i
                          >Add New</a
                        >
                        <a
                          href="javascript:void(0);"
                          class="d-flex align-items-center collapse-arrow"
                          data-bs-toggle="collapse"
                          data-bs-target="#primaryBorderSix"
                          aria-expanded="true"
                          aria-controls="primaryBorderSix"
                        >
                          <i class="ti ti-chevron-down fs-18"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="primaryBorderSix"
                  class="accordion-collapse collapse show border-top"
                  aria-labelledby="headingSix"
                >
                  <div class="accordion-body">
                    <div class="notice-widget">
                      <div
                        class="d-flex align-items-center justify-content-between mb-4"
                      >
                        <div class="d-flex overflow-hidden">
                          <span
                            class="bg-info avatar avatar-md me-3 rounded-circle flex-shrink-0"
                          >
                            <i class="ti ti-checkup-list fs-16"></i>
                          </span>
                          <div class="overflow-hidden">
                            <p class="text-truncate mb-1">
                              <span class="text-gray-9 fw-medium">Andrew </span
                              >added a New Task
                            </p>
                            <p class="mb-1">15 May 2024, 6:53 PM</p>
                            <div
                              class="todo-inbox-check d-flex align-items-center"
                            >
                              <div class="form-check form-check-md me-2">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                />
                              </div>
                              <div class="strike-info">
                                <h4 class="fs-14 fw-medium text-truncate">
                                  Patient and Doctor video conferencing
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between mb-4"
                      >
                        <div class="d-flex overflow-hidden me-2">
                          <span
                            class="bg-warning avatar avatar-md me-3 rounded-circle flex-shrink-0"
                          >
                            <i class="ti ti-circle-dot fs-16"></i>
                          </span>
                          <div class="overflow-hidden">
                            <p class="text-truncate mb-1">
                              <span class="text-gray-9 fw-medium">Jermai </span
                              >Moved task
                              <span class="text-gray-9 fw-medium">
                                “Private chat module”</span
                              >
                            </p>
                            <p class="mb-1">15 May 2024, 6:53 PM</p>
                            <div class="d-flex align-items-center">
                              <span class="badge badge-success me-2"
                                ><i class="ti ti-point-filled me-1"></i
                                >Completed</span
                              >
                              <span
                                ><i class="ti ti-arrows-left-right me-2"></i
                              ></span>
                              <span class="badge badge-purple"
                                ><i class="ti ti-point-filled me-1"></i
                                >Inprogress</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between mb-4"
                      >
                        <div class="d-flex overflow-hidden me-2">
                          <span
                            class="bg-purple avatar avatar-md me-3 rounded-circle flex-shrink-0"
                          >
                            <i class="ti ti-checkup-list fs-16"></i>
                          </span>
                          <div class="overflow-hidden">
                            <p class="text-truncate mb-1">
                              <span class="text-gray-9 fw-medium">Jermai </span
                              >Created task
                              <span class="text-gray-9 fw-medium">
                                “Private chat module”</span
                              >
                            </p>
                            <p class="mb-1">15 May 2024, 6:53 PM</p>
                            <div
                              class="todo-inbox-check d-flex align-items-center"
                            >
                              <div class="form-check form-check-md me-2">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                />
                              </div>
                              <div class="strike-info">
                                <h4 class="fs-14 fw-medium text-truncate">
                                  Patient and Doctor video conferencing
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div class="d-flex overflow-hidden">
                          <span
                            class="bg-secondary avatar avatar-md me-3 rounded-circle flex-shrink-0"
                          >
                            <i class="ti ti-photo fs-16"></i>
                          </span>
                          <div class="overflow-hidden">
                            <p class="text-truncate mb-1">
                              <span class="text-gray-9 fw-medium">Hendry </span>
                              Updated Image
                              <span class="text-gray-9 fw-medium">
                                “logo.jpg”
                              </span>
                            </p>
                            <p class="mb-1">15 May 2024, 6:53 PM</p>
                            <div
                              class="todo-inbox-check d-flex align-items-center"
                            >
                              <div class="form-check form-check-md me-2">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                />
                              </div>
                              <div class="strike-info">
                                <h4 class="fs-14 fw-medium text-truncate">
                                  Patient and Doctor video conferencing
                                </h4>
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

import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import TaskDetailsCarousel from "@/assets/json/task-details-carousel.json";

export default {
  data() {
    return {
      TaskDetailsCarousel: TaskDetailsCarousel,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
        loop: true,
      },
      breakpoints: {
        575: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/icons/${imageName}`, import.meta.url).href;
    },
    getImageUrlOne(imageNameOne) {
      return new URL(`/src/assets/img/users/${imageNameOne}`, import.meta.url).href;
    }
  },
};
</script>
