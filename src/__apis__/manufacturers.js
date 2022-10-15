import axiosInstance from "./axios";

export const manufacturersFetcher = async () =>
  axiosInstance.get("/manufacturer/get").then((response) => response.data);
