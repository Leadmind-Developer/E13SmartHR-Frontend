<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="mb-2">
          <div class="d-flex align-items-center">
            <div class="head-icons ms-2 mb-0">
              <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
                <i class="ti ti-chevrons-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <div class="card">
        <div class="card-body p-3">
          <div class="d-flex align-items-center justify-content-between">
            <h5>Knowledgebase</h5>
            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div class="me-3">
                <div class="input-icon-end position-relative">
                  <input type="text" class="form-control date-range bookingrange" ref="dateRangeInput"
                    placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                  <span class="input-icon-addon">
                    <i class="ti ti-chevron-down"></i>
                  </span>
                </div>
              </div>
              <div class="dropdown">
                <a href="javascript:void(0);"
                  class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
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
      </div>

      <div class="row">
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view"
                  class="text-dark fs-16 fw-medium text-truncate">Introduction to HRMS
                  <span class="text-primary">( 06 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">What is an HRMS and Why is
                  it Important?
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">The Key Features of an
                  HRMS Explained
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How HRMS Helps Automate HR
                  Tasks
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">HRMS Terminology : A
                  Beginner’s Guide
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Cloud vs On-Premise HRMS
                  vs Hybrid
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view" class="text-dark fs-16 fw-medium text-truncate">Employee
                  Self-Service (ESS)
                  <span class="text-primary">( 10 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to view & update your
                  personal information
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Steps to Apply for Leave
                  via the Employee Portal
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to access and download
                  your payslips
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Submitting & Tracking
                  Expense Reimbursements
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to track your
                  attendance and work hours
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view" class="text-dark fs-16 fw-medium text-truncate">Manager
                  Self-Service (MSS)
                  <span class="text-primary">( 12 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Approve or Reject
                  Employee Requests
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Viewing and managing team
                  attendance
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to conduct performance
                  reviews
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Approving expense claims
                  for your team
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to update & view
                  team’s work schedules
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view" class="text-dark fs-16 fw-medium text-truncate">Payroll
                  Management
                  <span class="text-primary">( 08 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How Payroll is Processed :
                  A Step-by-Step Guide
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Deductions, Overtime, and
                  Bonuses
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">What to Do if There’s a
                  Payroll Discrepancy
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Access Historical
                  Payroll Information
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Managing Employee Tax
                  Information and Filing
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view"
                  class="text-dark fs-16 fw-medium text-truncate">Attendance & Time Tracking
                  <span class="text-primary">( 07 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to clock in/out using
                  the hrms portal
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Submitting timesheets for
                  approval
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Tracking overtime &
                  managing work hours in hrms
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to view and manage
                  shifts and schedules
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Generating attendance
                  reports for your team
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view" class="text-dark fs-16 fw-medium text-truncate">Leave
                  Management <span class="text-primary">( 06 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Request Casual or
                  Medical Leave
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How Leave Balances Are
                  Calculated in Hrms
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Leave Approval Workflow :
                  Guide for Managers
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Viewing Your Leave History
                  & Pending Requests
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Understanding Different
                  Types of Leaves
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view"
                  class="text-dark fs-16 fw-medium text-truncate">Recruitment & Onboarding
                  <span class="text-primary">( 10 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Apply for Internal
                  Job Postings in Hrms
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Creating & Posting Job
                  Openings as a Recruiter
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Tracking Applicants and
                  Scheduling Interviews
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Complete New Hire
                  Onboarding Process
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Uploading & Verifying New
                  Employee Documents
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view"
                  class="text-dark fs-16 fw-medium text-truncate">Performance Management
                  <span class="text-primary">( 13 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Setting and Tracking Your
                  Employee Goals
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Conducting 360-degree
                  Feedback in Hrms
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Complete a
                  Performance Review
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Update Employee
                  Development Plans
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Generating Performance
                  Reports and Metrics
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="ti ti-folder text-primary fs-24 me-1"></i>
                <router-link to="/supports/knowledgebase-view" class="text-dark fs-16 fw-medium text-truncate">Reports &
                  Analytics
                  <span class="text-primary">( 15 )</span></router-link>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Generate Employee
                  Attendance Reports
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Creating Custom Payroll
                  Reports
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Analyzing Workforce
                  Metrics in Hrms
                </a>
              </div>
              <div class="d-flex align-items-center mb-2 pb-1">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">How to Track Performance
                  Metrics and KPIs
                </a>
              </div>
              <div class="d-flex align-items-center">
                <i class="ti ti-file me-1"></i>
                <a href="javascript:void(0);" class="text-gray fs-14 fw-normal text-truncate">Viewing and Analyzing
                  Compensation
                </a>
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
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
export default {
  data() {
    return {
      title: "Knowledgebase",
      text: "Help & Supports",
      text1: "Knowledgebase",
    };
  },
  setup() {
    const dateRangeInput = ref(null);

    // Move the function declaration outside of the onMounted callback
    function booking_range(start, end) {
      return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
    }

    onMounted(() => {
      if (dateRangeInput.value) {
        const start = moment().subtract(6, "days");
        const end = moment();

        new DateRangePicker(
          dateRangeInput.value,
          {
            startDate: start,
            endDate: end,
            ranges: {
              Today: [moment(), moment()],
              Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
              "Last Month": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              ],
            },
          },
          booking_range
        );

        booking_range(start, end);
      }
    });

    return {
      dateRangeInput,
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
