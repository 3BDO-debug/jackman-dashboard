import React from "react";
// material
import { Box, Divider, Stack, Typography } from "@mui/material";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import homePageStyles from "./homePageStyles";
// components
import Indicator from "../../components/__homePage/Indicator";
import DataTable from "../../components/DataTable";
import SearchField from "../../components/SearchField";

// -----------------------------------------------------------------

const tableHeaderLabels = [
  "#ID",
  "Full Name",
  "Date issued",
  "Date requested",
  "EMAIL & PHONE",
  "Place",
  "MANAGE",
];

// -----------------------------------------------------------------

function HomePage() {
  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box sx={homePageStyles.mainWrapper}>
        {/* Instructions */}
        <Stack direction="row" alignItems="center" marginTop={2}>
          {/* Account id */}
          <Typography
            sx={homePageStyles.indicatorWrapper}
            variant="body2"
            color="secondary"
          >
            Your ID: 13647832648
          </Typography>
          {/* Accepted indicator */}
          <Indicator variant="success" label="Accepted" />
          {/* Rejected indicator */}
          <Indicator variant="error" label="Rejected" />
          {/* Pending indicator */}
          <Indicator variant="secondary" label="Pending" />
        </Stack>
        {/* Divider */}
        <Divider
          sx={{ ...homePageStyles.verticalMargin, borderColor: "#9AACB5" }}
          variant="fullWidth"
        />
        {/* Search box */}
        <Box marginTop={4}>
          <SearchField />
        </Box>
        {/* Data table */}
        <Box marginTop={4}>
          <DataTable headerLabels={tableHeaderLabels} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default HomePage;
