import axiosInstance from "./axiosConfig";

export const register = async (registerDetails, signal) => {
  const endpoint = "/user/register";
  const response = await axiosInstance.post(endpoint, registerDetails, {
    signal,
  });
  return response.data;
};

export const login = async (credentials, signal) => {
  const endpoint = "/user/login";
  const response = await axiosInstance.post(endpoint, credentials, { signal });
  return response.data;
};

export const logout = async () => {
  const endpoint = "/user/logout";
  const response = await axiosInstance.post(endpoint);
  return response;
};

export const changePassword = async (updateCredentials, signal) => {
  const endpoint = "/user/change-password";
  const response = await axiosInstance.post(endpoint, updateCredentials, {
    signal,
  });
  return response;
};
