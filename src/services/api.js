// src/services/api.js
import axios from "axios";
import { TokenService } from "./token.service";
import router from "@/router";

const api = axios.create({
  baseURL: "https://api.e13solution.com/api",
  withCredentials: true, // important to send cookies
});

let isRefreshing = false;
let queue = [];

function processQueue(token) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/")
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          "https://api.e13solution.com/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        TokenService.setAccessToken(data.accessToken);

        processQueue(data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);

      } catch (err) {
        TokenService.clear();
        router.push("/login");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
