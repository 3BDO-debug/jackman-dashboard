import axiosInstance from "./axios";

export const dealersFetcher = async () =>
  axiosInstance
    .get("/manufacturer/getDealers")
    .then((response) => response.data.result.data);

export const dealerDeleter = async (data) =>
  axiosInstance
    .delete("/dealers/removeDealer", { data: data })
    .then((response) => response.data);

export const dealerAdder = async (data) =>
  axiosInstance
    .post("/dealers/addDealer", data)
    .then((response) => response.data);

export const dealerInfoFetcher = async (dealerId) =>
  axiosInstance
    .get(`/dealers/getDealerInfo?dealerId=${dealerId}`)
    .then((response) => response.data);

export const dealerInfoUpdater = async (data) =>
  axiosInstance
    .patch("/dealers/updateDealer", data)
    .then((response) => response.data);

export const dealerAvatarUploader = async (data) =>
  axiosInstance
    .post("/dealers/uploadDealerImage", data)
    .then((response) => response.data);

export const dealerServiceAdder = async (data) =>
  axiosInstance
    .post("/dealers/addDealerService", data)
    .then((response) => response.data.result);

export const dealerServiceDeleter = async (data) =>
  axiosInstance.delete("/dealers/removeDealerService", { data: data });

export const dealerSupportedCarsAdder = async (data) =>
  axiosInstance
    .post("/dealers/addDealerCars", data)
    .then((response) => response.data);

export const dealerSupportedCarsDeleter = async (data) =>
  axiosInstance
    .delete("/dealers/removeDealerManufacturer", { data: data })
    .then((response) => response.data);
