// src/services/superDashboard.service.js

import api from "@/services/api"; // use centralized axios instance

export const getSuperDashboard = async (params = {}) => {
  try {
    const response = await api.get("/dashboard/super/overview", {
      params,
    });

    return response.data.data;
  } catch (error) {
    console.error("❌ Failed to fetch super dashboard:", error);
    throw error; // let the caller handle errors
  }
};
