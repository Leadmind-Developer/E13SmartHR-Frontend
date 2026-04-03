import api from "@/services/api";

export default {
  getEmployees() {
    return api.get("/employees");
  },

  getEmployee(id) {
    return api.get(`/employees/${id}`);
  },

  createEmployee(data) {
    return api.post("/employees", data);
  },

  updateEmployee(id, data) {
    return api.put(`/employees/${id}`, data);
  },

  deleteEmployee(id) {
    return api.delete(`/employees/${id}`);
  },
};
