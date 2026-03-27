// src/services/dashboard.service.js

import api from "./api";

export const DashboardService = {
  async getOverview(params = {}) {
    try {
      const res = await api.get("/dashboard/admin/overview", {
        params, // 🔥 supports month/year filters
      });

      // ✅ handle standardized response
      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch dashboard");
      }

      return res.data.data;

    } catch (error) {
      console.error("DashboardService Error:", error);
      throw error;
    }
  },
};
