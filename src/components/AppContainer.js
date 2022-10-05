import React, { useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
import userAtom from "../recoil/atoms/userAtom";
// pages
import HomePage from "../pages/HomePage/HomePage";
import PendingRequestsPage from "../pages/PendingRequestsPage/PendingRequestsPage";
import AcceptedRequestsPage from "../pages/AcceptedRequestsPage/AcceptedRequestsPage";
import RejectedRequestsPage from "../pages/RejectedRequestsPage/RejectedRequestsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import InitialPage from "../pages";
import { userInfoRequest } from "../__apis__/auth";
import DealersPage from "../pages/DealersPage/DealersPage";
import DealerDetailsPage from "../pages/DealerDetailsPage/DealerDetailsPage";

// -----------------------------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// -----------------------------------------------------------------------------------------

function AppContainer() {
  const navigate = useNavigate();
  const route = useLocation();
  const [alert, setAlert] = useRecoilState(alertAtom);
  const setUserInfo = useSetRecoilState(userAtom);

  const token = localStorage.getItem("token");

  const fetchUserInfo = useCallback(async () => {
    await userInfoRequest()
      .then((response) => setUserInfo(response))
      .catch((error) => console.log("User info error", error));
  }, [setUserInfo]);

  useEffect(() => {
    if (token) {
      if (route.pathname === "/home") {
        setAlert({
          status: "open",
          variant: "success",
          message: "Welcome back.",
        });
      }
      fetchUserInfo();
    } else {
      setAlert({
        status: "open",
        variant: "error",
        message: "Session expired, please login to continue.",
      });
      navigate("/login");
    }
  }, [setAlert, fetchUserInfo, navigate, route.pathname, token]);

  return (
    <Box>
      {/* Popup alert */}
      <Snackbar
        open={alert.status === "open"}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, status: "closed" })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, status: "closed" })}
          severity={alert.variant}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pending-requests" element={<PendingRequestsPage />} />
        <Route path="/accepted-requests" element={<AcceptedRequestsPage />} />
        <Route path="/rejected-requests" element={<RejectedRequestsPage />} />
        <Route path="/dealers" element={<DealersPage />} />
        <Route
          path="/dealer-details/:dealerId"
          element={<DealerDetailsPage />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Box>
  );
}

export default AppContainer;
