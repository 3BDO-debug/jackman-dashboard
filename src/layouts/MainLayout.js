import React from "react";
// material
import { Box, Divider, Paper, useTheme } from "@mui/material";
// components
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { MotionViewport, varSlide } from "../components/animate";

// ----------------------------------------------------------------------------

function MainLayout({ children }) {
  return (
    <Box sx={styles.sideNavWrapper}>
      {/* Side nav wrapper */}
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <SideNav />
      </Box>
      {/* Right side wrapper */}
      <MotionViewport variants={varSlide().inRight} sx={{ width: "100%" }}>
        <Paper sx={styles.rightSideWrapper} elevation={0}>
          {/* Header */}
          <Box>
            <Header />
          </Box>
          <Box />
          {/* Content */}
          <Box>{children}</Box>
        </Paper>
      </MotionViewport>
    </Box>
  );
}

const styles = {
  sideNavWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 2,
  },
  rightSideWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "43px",
    paddingTop: "43px",
    paddingRight: "40px",
  },
};

export default MainLayout;
