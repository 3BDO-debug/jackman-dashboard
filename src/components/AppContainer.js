import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// material
import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
// pages
import HomePage from "../pages/HomePage/HomePage";
import PendingRequestsPage from "../pages/PendingRequestsPage/PendingRequestsPage";
import AcceptedRequestsPage from "../pages/AcceptedRequestsPage/AcceptedRequestsPage";
import RejectedRequestsPage from "../pages/RejectedRequestsPage/RejectedRequestsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import InitialPage from "../pages";

// -----------------------------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// -----------------------------------------------------------------------------------------

function AppContainer() {
  const navigate = useNavigate();
  const [alert, setAlert] = useRecoilState(alertAtom);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
      setAlert({
        status: "open",
        variant: "success",
        message: "Welcome back.",
      });
    } else {
      setAlert({
        status: "open",
        variant: "error",
        message: "Session expired, please login to continue.",
      });
      navigate("/login");
    }
  }, [navigate.apply, setAlert]);

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
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Box>
  );
}

export default AppContainer;
