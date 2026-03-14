// src/services/api.js

import axios from "axios";
import router from "@/router";
import { TokenService } from "./token.service";

const API_BASE_URL = "https://api.e13solution.com/api";

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/*
|--------------------------------------------------------------------------
| Refresh Control
|--------------------------------------------------------------------------
*/

let isRefreshing = false;
let refreshSubscribers = [];

/**
 * Notify all queued requests after token refresh
 */
function notifySubscribers(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

/**
 * Add request to refresh queue
 */
function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
| Attach access token to every request
*/

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
| Handles access token expiration
*/

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/")
    ) {
      /*
      |--------------------------------------------------------------------------
      | If refresh already running → queue request
      |--------------------------------------------------------------------------
      */

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        /*
        |--------------------------------------------------------------------------
        | Refresh Access Token
        |--------------------------------------------------------------------------
        */

        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = data?.accessToken;

        if (!newToken) {
          throw new Error("Invalid refresh response");
        }

        TokenService.setAccessToken(newToken);

        notifySubscribers(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        /*
        |--------------------------------------------------------------------------
        | Refresh Failed → logout user
        |--------------------------------------------------------------------------
        */

        TokenService.clear();

        if (router.currentRoute.value.path !== "/login") {
          router.push("/login");
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
