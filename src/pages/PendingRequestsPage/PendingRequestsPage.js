import React from "react";
// material
import { Box, Typography } from "@mui/material";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import pendingRequestsPageStyles from "./pendingRequestsPageStyles";
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

function PendingRequestsPage() {
  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box sx={pendingRequestsPageStyles.mainWrapper}>
        {/* Page intro */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <Typography variant="body2" color="secondary">
            Your ID: 13647832648
          </Typography>
        </Box>
        {/* Search field */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <SearchField />
        </Box>
        {/* Title */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <Typography variant="h6" color="primary">
            Pending Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <DataTable headerLabels={tableHeaderLabels} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default PendingRequestsPage;
