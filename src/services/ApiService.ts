/* eslint-disable @typescript-eslint/no-explicit-any */
import appConfig from "@/configs/app.config";
import store from "@/store/store";
import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = appConfig.apiBaseUrl + appConfig.apiPrefix;
const ApiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

ApiService.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

const makeRequest = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await ApiService(config);

    if (response.status === 403 || response.status === 401) {
      window.location.replace("/access-denied");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET request
const get = <T = any>(endpoint: string, params?: object): Promise<T> => {
  return makeRequest<T>({ method: "GET", url: endpoint, params });
};

// POST request
const post = <T = any>(endpoint: string, data?: object): Promise<T> => {
  return makeRequest<T>({ method: "POST", url: endpoint, data });
};

// PUT request
const put = <T = any>(endpoint: string, data?: object): Promise<T> => {
  return makeRequest<T>({ method: "PUT", url: endpoint, data });
};

// PATCH request
const patch = <T = any>(endpoint: string, data?: object): Promise<T> => {
  return makeRequest<T>({ method: "PATCH", url: endpoint, data });
};

// DELETE request
const del = <T = any>(endpoint: string): Promise<T> => {
  return makeRequest<T>({ method: "DELETE", url: endpoint });
};

// Export the ApiService and CRUD methods
export default {
  ...ApiService, // Spread the Axios instance to retain all Axios methods and properties
  get,
  post,
  put,
  patch,
  delete: del, // 'delete' is a reserved word in JavaScript, so we use 'del' instead
};
