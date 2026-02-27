import axios from "axios";
import { TokenService } from "./token.service";
import router from "@/router";

const api = axios.create({
  baseURL: "https://api.e13solution.com/api", //import.meta.env.VITE_API_BASE_URL
  withCredentials: true,
});

// 🔐 Attach access token
api.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔁 Auto refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          "https://api.e13solution.com/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        TokenService.setAccessToken(data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        TokenService.clear();
        router.push("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
