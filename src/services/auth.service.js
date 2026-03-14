// src/services/auth.service.js

import api from "./api";
import { TokenService } from "./token.service";

export const AuthService = {
  /**
   * Login user
   * Sets access token in memory and returns user profile
   */
  async login(payload) {
    try {
      const { data } = await api.post("/auth/login", payload, {
        withCredentials: true,
      });

      if (data?.accessToken) {
        TokenService.setAccessToken(data.accessToken);
      }

      return data.user;
    } catch (error) {
      TokenService.clear();
      throw error;
    }
  },

  /**
   * Logout user
   * Clears refresh cookie server-side and removes access token
   */
  async logout() {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      // ignore API logout errors (cookie may already be cleared)
    } finally {
      TokenService.clear();
    }
  },

  /**
   * Get authenticated user profile
   */
  async me() {
    try {
      const { data } = await api.get("/users/me");
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh access token using refresh cookie
   */
  async refresh() {
    try {
      const { data } = await api.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );

      if (data?.accessToken) {
        TokenService.setAccessToken(data.accessToken);
      }

      return data;
    } catch (error) {
      TokenService.clear();
      throw error;
    }
  },
};
