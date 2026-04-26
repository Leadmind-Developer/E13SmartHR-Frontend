<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap gap-2">

          <!-- PAYROLL RUN -->
          <button class="btn btn-dark" @click="openRunModal">
            <i class="ti ti-rocket me-1"></i> Run Payroll
          </button>

          <!-- ADD SALARY -->
          <button class="btn btn-primary" @click="openSalaryModal">
            <i class="ti ti-circle-plus me-1"></i> Add Salary
          </button>

        </div>
      </div>

      <!-- TABLE CARD -->
      <div class="card">
        <div class="card-header d-flex justify-content-between flex-wrap">

          <h5>Employee Payroll</h5>

          <input
            v-model="search"
            type="text"
            class="form-control w-25"
            placeholder="Search employee..."
          />
        </div>

        <div class="card-body p-0">

          <table class="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Basic Salary</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Payslip</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="emp in filteredEmployees" :key="emp.id">

                <!-- EMPLOYEE -->
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="emp.avatar" class="avatar me-2" />
                    <div>
                      <div class="fw-bold">{{ emp.name }}</div>
                      <small>{{ emp.email }}</small>
                    </div>
                  </div>
                </td>

                <!-- SALARY -->
                <td>₦{{ emp.basicSalary }}</td>

                <!-- NET -->
                <td>
                  <span class="fw-bold text-success">
                    ₦{{ emp.netSalary || 0 }}
                  </span>
                </td>

                <!-- STATUS -->
                <td>
                  <span class="badge bg-info">
                    {{ emp.approvalStatus || 'PENDING' }}
                  </span>
                </td>

                <!-- PAYSLIP -->
                <td>
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="generatePayslip(emp)"
                  >
                    Generate
                  </button>
                </td>

                <!-- ACTIONS -->
                <td class="d-flex gap-2">

                  <!-- APPROVE -->
                  <button
                    class="btn btn-sm btn-success"
                    @click="approve(emp, 'HR')"
                  >
                    HR
                  </button>

                  <button
                    class="btn btn-sm btn-warning"
                    @click="approve(emp, 'FINANCE')"
                  >
                    Finance
                  </button>

                  <button
                    class="btn btn-sm btn-dark"
                    @click="downloadPDF(emp)"
                  >
                    PDF
                  </button>

                </td>

              </tr>
            </tbody>

          </table>

        </div>
      </div>

    </div>
  </div>

  <!-- MODALS -->
  <employee-salary-modal ref="salaryModal" />
  <payroll-run-modal ref="runModal" />
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Employee Salary",
      text: "Finance",
      text1: "Payroll",

      employees: [],
      search: "",
    };
  },

  computed: {
    filteredEmployees() {
      return this.employees.filter((e) =>
        `${e.name} ${e.email}`
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    },
  },

  async mounted() {
    await this.fetchEmployees();
  },

  methods: {

    // -----------------------------
    // FETCH EMPLOYEES + SALARY
    // -----------------------------
    async fetchEmployees() {
      const { data } = await api.get("/employees/payroll");

      this.employees = data?.data || [];
    },

    // -----------------------------
    // CREATE SALARY
    // -----------------------------
    openSalaryModal() {
      this.$refs.salaryModal.open();
    },

    // -----------------------------
    // QUEUE PAYROLL RUN
    // -----------------------------
    openRunModal() {
      this.$refs.runModal.open(async (payload) => {
        await api.post("/payroll/run", payload);
        this.$toast.success("Payroll run queued");
      });
    },

    // -----------------------------
    // GENERATE PAYSLIP
    // -----------------------------
    async generatePayslip(emp) {
      await api.post("/payroll/payslip/generate", {
        employeeId: emp.id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });

      this.$toast.success("Payslip generated");
      await this.fetchEmployees();
    },

    // -----------------------------
    // APPROVAL WORKFLOW
    // -----------------------------
    async approve(emp, stage) {
      await api.patch(`/payroll/payslip/${emp.payslipId}/approve`, {
        stage,
      });

      this.$toast.success(`${stage} approval updated`);
      await this.fetchEmployees();
    },

    // -----------------------------
    // DOWNLOAD PDF
    // -----------------------------
    async downloadPDF(emp) {
      const res = await api.get(
        `/payroll/payslip/${emp.payslipId}/pdf`
      );

      window.open(res.data.data.url, "_blank");
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
