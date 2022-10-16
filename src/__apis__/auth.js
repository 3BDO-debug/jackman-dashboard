import axios from "axios";
// Custom axios
import axiosInstance from "./axios";
// Main APIs domain
import { mainUrl } from "./axios";

export const loginRequest = async (requestData) =>
  axios
    .post(`${mainUrl}/superAdmin/auth/signin`, requestData)
    .then((response) => {
      localStorage.setItem("token", response.data.result.data.token);
      localStorage.setItem(
        "refreshToken",
        response.data.result.data.refreshToken
      );
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      return response.data;
    });

export const logoutRequest = async () =>
  axiosInstance.delete("/superAdmin/auth/logout").then((response) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return response.data;
  });

export const userInfoRequest = async () =>
  axiosInstance
    .get("/superAdmin/auth/get")
    .then((response) => response.data.result.data);
