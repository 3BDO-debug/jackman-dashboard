import React from "react";
import { Routes, Route } from "react-router-dom";
// material
import { Box } from "@mui/material";
// pages
import HomePage from "../pages/HomePage/HomePage";
import PendingRequestsPage from "../pages/PendingRequestsPage/PendingRequestsPage";
import AcceptedRequestsPage from "../pages/AcceptedRequestsPage/AcceptedRequestsPage";
import RejectedRequestsPage from "../pages/RejectedRequestsPage/RejectedRequestsPage";

// --------------------------------------------------------

function AppContainer() {
  return (
    <Box>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/pending-requests" element={<PendingRequestsPage />} />
        <Route path="/accepted-requests" element={<AcceptedRequestsPage />} />
        <Route path="/rejected-requests" element={<RejectedRequestsPage />} />
      </Routes>
    </Box>
  );
}

export default AppContainer;
