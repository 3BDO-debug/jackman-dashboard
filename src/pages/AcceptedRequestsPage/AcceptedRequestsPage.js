import React from "react";
// material
import { Box, Typography } from "@mui/material";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import acceptedRequestsPageStyles from "./acceptedRequestsPageStyles";
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

function AcceptedRequestsPage() {
  return (
    <MainLayout>
      <Box sx={acceptedRequestsPageStyles.mainWrapper}>
        {/* Intro */}
        <Box sx={acceptedRequestsPageStyles.verticalMargin}>
          <Typography variant="body1" color="secondary">
            Your ID: 13647832648
          </Typography>
        </Box>
        {/* Search field  */}
        <Box sx={acceptedRequestsPageStyles.verticalMargin}>
          <SearchField />
        </Box>
        {/* Title */}
        <Box sx={{ ...acceptedRequestsPageStyles.verticalMargin }}>
          <Typography variant="h6" color="#21D66A">
            Accepted Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...acceptedRequestsPageStyles.verticalMargin }}>
          <DataTable headerLabels={tableHeaderLabels} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default AcceptedRequestsPage;
