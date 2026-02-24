import { defineStore } from "pinia";
import { AuthService } from "@/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      try {
        this.user = await AuthService.login(credentials);
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      try {
        this.user = await AuthService.me();
      } catch {
        this.user = null;
      }
    },

    async logout() {
      await AuthService.logout();
      this.user = null;
    },
  },
});
