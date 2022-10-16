import axiosInstance from "./axios";

export const getBookings = async () =>
  axiosInstance
    .get("/bookingSuperAdmin/myBookings?orderBy=ASC")
    .then((response) => response.data.result.data);

export const deleteBookings = async (bookingId) =>
  axiosInstance
    .delete(`/bookingSuperAdmin/myBookings/remove/${bookingId}`)
    .then((response) => response.data);

export const modifyBooking = async (data) =>
  axiosInstance
    .patch("/bookingSuperAdmin/modifyBooking", data)
    .then((response) => response.data);

export const getAcceptedBookings = async () =>
  axiosInstance
    .get("/bookingSuperAdmin/myBookings?orderBy=ASC&status=a")
    .then((response) => response.data.result.data);

export const getRejectedBookings = async () =>
  axiosInstance
    .get("/bookingSuperAdmin/myBookings?orderBy=ASC&status=r")
    .then((response) => response.data.result.data);
