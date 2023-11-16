import axios from "axios";
import { AuthGuard } from "../components/features/guard/authGuard";
import { envConfig } from "../config/env";
import { UserRole } from "../utils/enum/userEnum";

const API = axios.create({
  baseURL: envConfig.API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 403) {
      const path: string | undefined = AuthGuard();
      if (path) {
        window.location.href = path;
      }
    }
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      if (!window.location.href?.search("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export { API };
