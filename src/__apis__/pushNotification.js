import axiosInstance from "./axios";

export const notificationPusher = async (data) =>
  axiosInstance
    .post("/superAdmin/auth/sendNotification", data)
    .then((response) => response.data);
