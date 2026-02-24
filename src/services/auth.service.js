import api from "./api";
import { TokenService } from "./token.service";

export const AuthService = {
  async login(payload) {
    const { data } = await api.post("/auth/login", payload);
    TokenService.setAccessToken(data.accessToken);
    return data.user;
  },

  async logout() {
    await api.post("/auth/logout");
    TokenService.clear();
  },

  async me() {
    const { data } = await api.get("/users/me");
    return data;
  },
};
