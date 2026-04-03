// stores/employee.store.js
import { defineStore } from "pinia";
import employeeService from "@/services/employee.service";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    total: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchEmployees(params) {
      this.loading = true;
      this.error = null;

      try {
        const res = await employeeService.getEmployees(params);

        this.employees = res.data.items;
        this.total = res.data.total;
      } catch (err) {
        this.error = err;
        console.error("Fetch employees failed:", err);
      } finally {
        this.loading = false;
      }
    },

    async deleteEmployee(id) {
      await employeeService.deleteEmployee(id);
    },
  },
});
