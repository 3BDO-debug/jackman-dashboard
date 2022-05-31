import React, { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box, Paper, Grid } from "@mui/material";
// atoms
import bookingsAtom from "../recoil/atoms/bookingsAtom";
import alertAtom from "../recoil/atoms/alertAtom";
// __apis__
import { getBookings } from "../__apis__/bookings";
// components
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { MotionViewport, varSlide } from "../components/animate";
import Drawer from "../components/Drawer";
import ActionModal from "../components/BookingModal";
import LogoutConfirmationPopUp from "../components/LogoutConfirmationPopUp";

// ---------------------------------------------------------------------------------------

function MainLayout({ children }) {
  const [bookings, setBookings] = useRecoilState(bookingsAtom);
  const setAlert = useSetRecoilState(alertAtom);

  const bookingsFetcher = useCallback(async () => {
    await getBookings()
      .then((bookingsResponse) =>
        setBookings({ ...bookings, data: bookingsResponse, refresh: false })
      )
      .catch((error) =>
        setAlert({
          status: "open",
          variant: "error",
          message:
            "Something wrong happened while fetching bookings. Please try again later.",
        })
      );
  }, [setAlert, setBookings, bookings]);

  useEffect(() => {
    bookingsFetcher();
  });

  /*   useEffect(() => {
    if (bookings.refresh) {
      bookingsFetcher();
    }
  }, [bookings.refresh, bookingsFetcher]); */

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
                  xs: "100%",
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
                  xs: "100%",
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
      {/* Booking action modal */}
      <ActionModal />
      {/* Logout confirmation popup */}
      <LogoutConfirmationPopUp />
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
