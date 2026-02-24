<script>
import { ref } from "vue";
const valueOne = ref(new Date());

import { donutChart2, dealsStage } from "./data";

export default {
  data() {
    return {
      valueOne: new Date(),
      title: "Analytics",
      text: "CRM",
      text1: "Analytics",
      donutChart2: donutChart2,
      dealsStage: dealsStage,
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
          <div class="input-icon w-120 position-relative mb-2">
            <span class="input-icon-addon">
              <i class="ti ti-calendar text-gray-9"></i>
            </span>
            <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
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

      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                <h5>Recently Created Contacts</h5>
                <div class="dropdown mb-2">
                  <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown">
                    <i class="ti ti-calendar me-1"></i>This Week
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Week</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/contact-details" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-49.jpg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/contact-details">Darlee Robertson</router-link>
                            </h6>
                            <span class="fs-12 fw-normal">Facility Manager</span>
                          </div>
                        </div>
                      </td>
                      <td>darlee@example.com</td>
                      <td>(163) 2459 315</td>
                      <td>14 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/contact-details" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-50.jpg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/contact-details">Sharon Roy</router-link>
                            </h6>
                            <span class="fs-12 fw-normal">Installer</span>
                          </div>
                        </div>
                      </td>
                      <td>darlee@example.com</td>
                      <td>(146) 1249 296</td>
                      <td>15 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/contact-details" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-51.jpg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/contact-details">Vaughan Lewis</router-link>
                            </h6>
                            <span class="fs-12 fw-normal">Senior Manager</span>
                          </div>
                        </div>
                      </td>
                      <td>vaughan@example.com</td>
                      <td>(135) 3489 516</td>
                      <td>16 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/contact-details" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-02.jpg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/contact-details">Jessica Louise</router-link>
                            </h6>
                            <span class="fs-12 fw-normal">Test Engineer</span>
                          </div>
                        </div>
                      </td>
                      <td>jessica@example.com</td>
                      <td>(196) 4862 196</td>
                      <td>17 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/contact-details" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-52.jpg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/contact-details">Carol Thomas</router-link>
                            </h6>
                            <span class="fs-12 fw-normal">UI /UX Designer</span>
                          </div>
                        </div>
                      </td>
                      <td>carol@example.com</td>
                      <td>(196) 4862 196</td>
                      <td>18 Jan 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                <h6>Won Deals Stage</h6>
                <div class="dropdown">
                  <a href="javascript:void(0);"
                    class="btn btn-white border-0 dropdown-toggle btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown">
                    Sales Pipeline
                  </a>
                  <ul class="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Marketing Pipeline</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Sales Pipeline</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Email</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Chats</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="text-center mb-4">
                <p class="mb-1 fw-medium">Stages Won This Year</p>
                <div class="d-flex align-items-center justify-content-center">
                  <h3 class="me-2">$45,899,79</h3>
                  <span class="badge badge-soft-danger border-danger border rounded-pill me-1">$45,899,79</span>
                </div>
              </div>
              <div class="stage-chart-main">
                <div class="deal-stage-chart">
                  <div
                    class="text-center d-flex align-items-center justify-content-center flex-column bg-secondary rounded-circle chart-stage-1">
                    <span class="d-block text-white mb-1">Conversion</span>
                    <h6 class="text-white">48%</h6>
                  </div>
                  <div
                    class="text-center d-flex align-items-center justify-content-center flex-column bg-danger rounded-circle chart-stage-2">
                    <span class="d-block text-white mb-1">Calls</span>
                    <h6 class="text-white">24%</h6>
                  </div>
                  <div
                    class="text-center d-flex align-items-center justify-content-center flex-column bg-warning rounded-circle chart-stage-3">
                    <span class="d-block text-white mb-1">Email</span>
                    <h6 class="text-white">39%</h6>
                  </div>
                  <div
                    class="text-center d-flex align-items-center justify-content-center flex-column bg-success rounded-circle chart-stage-4">
                    <span class="d-block text-white mb-1">Chats</span>
                    <h6 class="text-white">20%</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
              <h5>Recent Deals</h5>
              <div class="d-flex align-items-center">
                <div>
                  <router-link to="/crm/deals-list" class="btn btn-sm btn-light px-3">View All</router-link>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Deal Name</th>
                      <th>Stage</th>
                      <th>Deal Value</th>
                      <th>Owner</th>
                      <th>Closed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6>
                          <router-link to="/crm/deals-details">Collins</router-link>
                        </h6>
                      </td>
                      <td>Quality To Buy</td>
                      <td>$4,50,000</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                            <img src="@/assets/img/users/user-32.jpg" alt="Img" />
                          </a>
                          <h6><a href="javascript:void(0);">Anthony Lewis</a></h6>
                        </div>
                      </td>
                      <td>14 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <h6>
                          <router-link to="/crm/deals-details">Konopelski</router-link>
                        </h6>
                      </td>
                      <td>Proposal Made</td>
                      <td>$3,15,000</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                            <img src="@/assets/img/users/user-09.jpg" alt="Img" />
                          </a>
                          <h6><a href="javascript:void(0);">Brian Villalobos</a></h6>
                        </div>
                      </td>
                      <td>21 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="/crm/deals-details">Adams</router-link></h6>
                      </td>
                      <td>Contact Made</td>
                      <td>$8,40,000</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                            <img src="@/assets/img/users/user-01.jpg" alt="Img" />
                          </a>
                          <h6><a href="javascript:void(0);">Harvey Smith</a></h6>
                        </div>
                      </td>
                      <td>20 Feb 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="/crm/deals-details">Schumm</router-link></h6>
                      </td>
                      <td>Quality To Buy</td>
                      <td>$6,10,000</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                            <img src="@/assets/img/users/user-33.jpg" alt="Img" />
                          </a>
                          <h6><a href="javascript:void(0);">Stephan Peralt</a></h6>
                        </div>
                      </td>
                      <td>15 Mar 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="/crm/deals-details">Wisozk</router-link></h6>
                      </td>
                      <td>Presentation</td>
                      <td>$4,70,000</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <a href="javascript:void(0);" class="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                            <img src="@/assets/img/users/user-34.jpg" alt="Img" />
                          </a>
                          <h6><a href="javascript:void(0);">Doglas Martini</a></h6>
                        </div>
                      </td>
                      <td>12 Apr 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card flex-fill">
            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
              <h5>Recent Leads</h5>
              <div class="d-flex align-items-center">
                <div>
                  <router-link to="/crm/leads-list" class="btn btn-sm btn-light px-3">View All</router-link>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Lead Name</th>
                      <th>Company Name</th>
                      <th>Stage</th>
                      <th>Created Date</th>
                      <th>Lead Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6>
                          <router-link to="/crm/leads-details">Collins</router-link>
                        </h6>
                      </td>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-01.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">BrightWave Innovations</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge badge-secondary d-inline-flex align-items-center">
                          <i class="ti ti-point-filled me-1"></i>
                          Contacted
                        </span>
                      </td>
                      <td>14 Jan 2024</td>
                      <td>Hendry</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="leads-details">Konopelski</router-link></h6>
                      </td>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-02.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">Stellar Dynamics</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge badge-success d-inline-flex align-items-center">
                          <i class="ti ti-point-filled me-1"></i>
                          Closed
                        </span>
                      </td>
                      <td>21 Jan 2024</td>
                      <td>Guilory</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="/crm/leads-details">Adams</router-link></h6>
                      </td>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-03.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">Quantum Nexus</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge badge-danger d-inline-flex align-items-center">
                          <i class="ti ti-point-filled me-1"></i>
                          Lost
                        </span>
                      </td>
                      <td>20 Feb 2024</td>
                      <td>Jami</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="/crm/leads-details">Schumm</router-link></h6>
                      </td>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-04.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">EcoVision Enterprises</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge badge-purple d-inline-flex align-items-center">
                          <i class="ti ti-point-filled me-1"></i>
                          Not Contacted
                        </span>
                      </td>
                      <td>15 Mar 2024</td>
                      <td>Theresa</td>
                    </tr>
                    <tr>
                      <td>
                        <h6><router-link to="/crm/leads-details">Wisozk</router-link></h6>
                      </td>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-05.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">Aurora Technologies</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge badge-success d-inline-flex align-items-center">
                          <i class="ti ti-point-filled me-1"></i>
                          Closed
                        </span>
                      </td>
                      <td>12 Apr 2024</td>
                      <td>Smith</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                <h6>Deals by Stage</h6>
                <div class="dropdown">
                  <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown">
                    <i class="ti ti-calendar me-1"></i>This Week
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Week</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body pb-0">
              <div>
                <div class="d-flex align-items-center">
                  <h3 class="me-2">98%</h3>
                  <span class="badge badge-outline-success bg-success-transparent rounded-pill me-1">12%</span>
                  <span>vs last year</span>
                </div>
                <div id="deals_stage">
                  <apexchart type="bar" height="310" :options="dealsStage.sline" :series="dealsStage.series">
                  </apexchart>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                <h6>Recent Activities</h6>
                <div>
                  <router-link to="/crm/activity" class="btn btn-sm btn-light px-3">View All</router-link>
                </div>
              </div>
            </div>
            <div class="card-body schedule-timeline activity-timeline">
              <div class="d-flex align-items-start">
                <div class="avatar avatar-md avatar-rounded bg-success flex-shrink-0">
                  <i class="ti ti-phone fs-20"></i>
                </div>
                <div class="flex-fill ps-3 pb-4 timeline-flow">
                  <p class="fw-medium text-gray-9 mb-1">
                    <router-link to="/crm/activity">Drain responded to your appointment schedule question.</router-link>
                  </p>
                  <span>09:25 PM</span>
                </div>
              </div>
              <div class="d-flex align-items-start">
                <div class="avatar avatar-md avatar-rounded bg-info flex-shrink-0">
                  <i class="ti ti-message-circle-2 fs-20"></i>
                </div>
                <div class="flex-fill ps-3 pb-4 timeline-flow">
                  <p class="fw-medium text-gray-9 mb-1">
                    <router-link to="/crm/activity">You sent 1 Message to the James.</router-link>
                  </p>
                  <span>10:25 PM</span>
                </div>
              </div>
              <div class="d-flex align-items-start">
                <div class="avatar avatar-md avatar-rounded bg-success flex-shrink-0">
                  <i class="ti ti-phone fs-20"></i>
                </div>
                <div class="flex-fill ps-3 pb-4 timeline-flow">
                  <p class="fw-medium text-gray-9 mb-1">
                    <router-link to="/crm/activity">Denwar responded to your appointment on 25 Jan 2025, 08:15
                      PM</router-link>
                  </p>
                  <span>09:25 PM</span>
                </div>
              </div>
              <div class="d-flex align-items-start">
                <div class="avatar avatar-md avatar-rounded bg-purple flex-shrink-0">
                  <i class="ti ti-user-circle fs-20"></i>
                </div>
                <div class="flex-fill ps-3 timeline-flow">
                  <p class="fw-medium text-gray-9 mb-1">
                    <router-link to="/crm/activity" class="d-flex align-items-center">Meeting With
                      <img src="@/assets/img/users/user-58.jpg" class="avatar avatar-sm rounded-circle mx-2"
                        alt="Img" />Abraham</router-link>
                  </p>
                  <span>09:25 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card flex-fill">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                <h6>Leads by Source</h6>
                <div class="dropdown">
                  <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown">
                    <i class="ti ti-calendar me-1"></i>This Week
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Week</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div id="donut-chart-2">
                <apexchart type="donut" height="185" :options="donutChart2.sline" :series="donutChart2.series">
                </apexchart>
              </div>
              <div>
                <h6 class="mb-3">Status</h6>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <p class="f-13 mb-0">
                    <i class="ti ti-circle-filled text-secondary me-1"></i>Google
                  </p>
                  <p class="f-13 fw-medium text-gray-9">40%</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <p class="f-13 mb-0">
                    <i class="ti ti-circle-filled text-warning me-1"></i>Paid
                  </p>
                  <p class="f-13 fw-medium text-gray-9">35%</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <p class="f-13 mb-0">
                    <i class="ti ti-circle-filled text-pink me-1"></i>Campaigns
                  </p>
                  <p class="f-13 fw-medium text-gray-9">15%</p>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <p class="f-13 mb-0">
                    <i class="ti ti-circle-filled text-purple me-1"></i>Referals
                  </p>
                  <p class="f-13 fw-medium text-gray-9">10%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                <h5>Recently Created Companies</h5>
                <div class="dropdown mb-2">
                  <a href="javascript:void(0);" class="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown">
                    <i class="ti ti-calendar me-1"></i>This Week
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Week</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-01.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">BrightWave Innovations</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>darlee@example.com</td>
                      <td>(163) 2459 315</td>
                      <td>14 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-02.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">Stellar Dynamics</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>sharon@example.com</td>
                      <td>(146) 1249 296</td>
                      <td>15 Jan 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center file-name-icon">
                          <router-link to="/crm/companies-details" class="avatar avatar-md border rounded-circle">
                            <img src="@/assets/img/company/company-03.svg" class="img-fluid" alt="img" />
                          </router-link>
                          <div class="ms-2">
                            <h6 class="fw-medium">
                              <router-link to="/crm/companies-details">Quantum Nexus</router-link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>jessica@example.com</td>
                      <td>(126) 1245 396</td>
                      <td>17 Jan 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
</template>
