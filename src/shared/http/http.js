import axios from "axios";

const http = axios.create({
  baseURL: "https://hr-employment-general-api.onrender.com/api/v1",
  timeout: 50000,
});

http.interceptors.request.use(
  (config) => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      // If authToken exists in sessionStorage, include it as a Bearer token in the request headers.
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if the request URL is not the sign-in API
      if (!error.config.url.endsWith("/signin")) {
        sessionStorage.removeItem("authToken");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default http;
