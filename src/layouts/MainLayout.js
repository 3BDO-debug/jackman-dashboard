import React from "react";
// material
import { Box, Paper, Grid } from "@mui/material";
// components
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { MotionViewport, varSlide } from "../components/animate";
import Drawer from "../components/Drawer";

// ---------------------------------------------------------------------------------------

function MainLayout({ children }) {
  return (
    <Grid container spacing={3} sx={{ overflowX: "hidden" }}>
      <Grid
        item
        md={2}
        lg={2}
        xl={2}
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          },
        }}
      >
        <SideNav />
      </Grid>

      {/* Right side wrapper */}
      <Grid item md={12} lg={10} xl={10}>
        <MotionViewport variants={varSlide().inRight} sx={{ width: "100%" }}>
          <Paper sx={styles.rightSideWrapper} elevation={0}>
            {/* Header */}
            <Box
              sx={{
                maxWidth: {
                  xs: "55%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                },
              }}
            >
              <Header />
            </Box>
            <Box />
            {/* Content */}
            <Box
              sx={{
                maxWidth: {
                  xs: "50%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                },
              }}
            >
              {children}
            </Box>
          </Paper>
        </MotionViewport>
      </Grid>
      {/* Drawer */}
      <Drawer />
    </Grid>
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
