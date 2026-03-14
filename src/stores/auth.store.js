// src/stores/auth.store.js

import { defineStore } from "pinia";
import { AuthService } from "@/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    /**
     * Login user
     */
    async login(credentials) {
      this.loading = true;

      try {
        const user = await AuthService.login(credentials);
        this.user = user;
        return user;
      } catch (error) {
        this.user = null;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch authenticated user profile
     */
    async fetchUser() {
      try {
        const user = await AuthService.me();
        this.user = user;
        return user;
      } catch (error) {
        this.user = null;
        throw error;
      }
    },

    /**
     * Restore session on app load
     * Uses refresh token cookie to obtain new access token
     */
    async restoreSession() {
      if (this.initialized) return this.user;

      this.loading = true;

      try {
        await AuthService.refresh(); // get new access token
        const user = await AuthService.me(); // fetch user profile

        this.user = user;
        return user;
      } catch (error) {
        this.user = null;
        return null;
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },

    /**
     * Logout user
     */
    async logout() {
      try {
        await AuthService.logout();
      } catch (error) {
        // ignore logout API errors
      } finally {
        this.user = null;
        this.initialized = false;
      }
    },

    /**
     * Reset auth state (used when refresh fails)
     */
    clearAuth() {
      this.user = null;
      this.initialized = false;
    },
  },
});
