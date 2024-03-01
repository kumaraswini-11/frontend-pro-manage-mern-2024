import axios from "axios";

// Initializing  or Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: `${String(import.meta.env.VITE_BACKEND_URL)}/api/v1`,
  // Include credentials (cookies) in cross-origin requests. This is used when making a request using the older XMLHttpRequest object.
  withCredentials: true,
  // adding a custom language header
  headers: {
    "Custom-Language": "en",
  },
  // timeout: 5000,
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }
  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default axiosInstance;
