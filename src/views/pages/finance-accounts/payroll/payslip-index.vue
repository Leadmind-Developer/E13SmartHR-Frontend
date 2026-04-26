<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">
          <button
            class="btn btn-dark d-flex align-items-center"
            :disabled="!payslip"
            @click="downloadPDF"
          >
            <i class="ti ti-download me-2"></i>
            Download PDF
          </button>
        </div>
      </div>

      <!-- GENERATE PAYSLIP -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="row g-3 align-items-end">

            <div class="col-md-4">
              <label class="form-label">Employee ID</label>
              <input v-model="form.employeeId" class="form-control" placeholder="Enter Employee ID" />
            </div>

            <div class="col-md-3">
              <label class="form-label">Month</label>
              <input v-model="form.month" class="form-control" placeholder="e.g. October" />
            </div>

            <div class="col-md-2">
              <label class="form-label">Year</label>
              <input v-model="form.year" type="number" class="form-control" />
            </div>

            <div class="col-md-3">
              <button
                class="btn btn-primary w-100"
                :disabled="loading"
                @click="generatePayslip"
              >
                <span v-if="loading">Generating...</span>
                <span v-else>Generate Payslip</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- PAYSLIP VIEW -->
      <div v-if="payslip" class="card">
        <div class="card-body">

          <!-- HEADER -->
          <div class="row border-bottom mb-3 pb-3">
            <div class="col-md-6">
              <img src="@/assets/img/logo.jpeg" style="height:40px" />
              <p class="mt-2 mb-0">Payroll System</p>
            </div>

            <div class="col-md-6 text-end">
              <h5>
                Payslip #
                <span class="text-primary">{{ payslip.payslipNumber }}</span>
              </h5>
              <p>
                {{ payslip.month }} {{ payslip.year }}
              </p>
            </div>
          </div>

          <!-- SUMMARY -->
          <div class="row mb-3">
            <div class="col-md-4">
              <p><strong>Gross Salary:</strong> {{ format(payslip.grossSalary) }}</p>
            </div>
            <div class="col-md-4">
              <p><strong>Deductions:</strong> {{ format(payslip.totalDeductions) }}</p>
            </div>
            <div class="col-md-4">
              <p><strong>Net Salary:</strong>
                <span class="text-success fw-bold">
                  {{ format(payslip.netSalary) }}
                </span>
              </p>
            </div>
          </div>

          <!-- COMPONENTS -->
          <div class="row">
            <div class="col-md-6">

              <div class="list-group">
                <div class="list-group-item bg-light fw-bold">Earnings</div>

                <div
                  v-for="c in earnings"
                  :key="c.name"
                  class="list-group-item d-flex justify-content-between"
                >
                  <span>{{ c.name }}</span>
                  <strong>{{ format(c.amount) }}</strong>
                </div>
              </div>

            </div>

            <div class="col-md-6">

              <div class="list-group">
                <div class="list-group-item bg-light fw-bold">Deductions</div>

                <div
                  v-for="c in deductions"
                  :key="c.name"
                  class="list-group-item d-flex justify-content-between"
                >
                  <span>{{ c.name }}</span>
                  <strong class="text-danger">{{ format(c.amount) }}</strong>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="text-center py-5 text-muted">
        No payslip generated yet
      </div>

    </div>

    <!-- FOOTER -->
    <div class="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
      <p class="mb-0">{{ new Date().getFullYear() }} © Payroll System</p>
    </div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Payslip",
      text: "Finance",
      text1: "Payroll",

      loading: false,

      form: {
        employeeId: "",
        month: "",
        year: new Date().getFullYear(),
      },

      payslip: null,
    };
  },

  computed: {
    earnings() {
      return (
        this.payslip?.PayslipComponents?.filter((c) => c.type === "EARNING") ||
        []
      );
    },

    deductions() {
      return (
        this.payslip?.PayslipComponents?.filter(
          (c) => c.type === "DEDUCTION"
        ) || []
      );
    },
  },

  methods: {
    async generatePayslip() {
      if (!this.form.employeeId || !this.form.month || !this.form.year) return;

      this.loading = true;

      try {
        const { data } = await api.post(
          "/payroll/payslip/generate",
          this.form
        );

        this.payslip = data.data;
      } catch (err) {
        console.error("Payslip generation failed:", err);
        alert("Failed to generate payslip");
      } finally {
        this.loading = false;
      }
    },

    async downloadPDF() {
      if (!this.payslip?.id) return;

      try {
        const res = await api.get(
          `/payroll/payslip/${this.payslip.id}/pdf`
        );

        const url = res.data?.data?.url;

        if (url) {
          window.open(url, "_blank");
        }
      } catch (err) {
        console.error("PDF download failed:", err);
      }
    },

    format(amount) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount || 0);
    },
  },
};
</script>
