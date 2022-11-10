import axios from "axios";

// https://jackman.herokuapp.com/api/v1 // https://prod.jackman-eg.com/api/v1

export const mainUrl = "https://jackman.herokuapp.com/api/v1";

const axiosInstance = axios.create({
  baseURL: mainUrl,
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response.status === 401 && !localStorage.getItem("token")) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      error.response.data.responseCode === "UNAUTHORIZED" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/superAdmin/auth/refreshtoken", {
              refreshToken: refreshToken,
            })
            .then((response) => {
              localStorage.setItem("token", response.data.result.data.token);
              localStorage.setItem(
                "refreshToken",
                response.data.result.data.refreshToken
              );

              axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.result.data.token}`;
              originalRequest.headers.Authorization = `Bearer ${response.data.result.data.token}`;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log("Refresh token not available.");
        localStorage.removeItem("token");
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
