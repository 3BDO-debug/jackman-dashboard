import React from "react";
// material
import { Box, Typography } from "@mui/material";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import rejectedRequestsPageStyles from "./rejectedRequestsPageStyles";
// components
import SearchField from "../../components/SearchField";
import DataTable from "../../components/DataTable";

// --------------------------------------------------------------------------------

const tableHeaderLabels = [
  "#ID",
  "Full Name",
  "Date issued",
  "Date requested",
  "EMAIL & PHONE",
  "Place",
  "MANAGE",
];

// --------------------------------------------------------------------------------

function RejectedRequestsPage() {
  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box sx={rejectedRequestsPageStyles.mainWrapper}>
        {/* Intro */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <Typography variant="body2" color="secondary">
            Your ID: 13647832648
          </Typography>
        </Box>
        {/* Search field */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <SearchField />
        </Box>
        {/* Title */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <Typography variant="h6" color="error">
            Rejected Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <DataTable headerLabels={tableHeaderLabels} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default RejectedRequestsPage;
