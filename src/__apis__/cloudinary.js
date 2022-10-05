import axios from "axios";

export const cloudinaryUpload = async (data) =>
  axios
    .post("https://api.cloudinary.com/v1_1/dgif0xikd/upload", data)
    .then((response) => response.data);
