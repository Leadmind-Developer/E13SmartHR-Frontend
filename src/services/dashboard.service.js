// src/services/dashboard.service.js

import api from "./api";

export const DashboardService = {
  async getOverview() {
    const { data } = await api.get("/dashboard/overview");
    return data;
  },
};
