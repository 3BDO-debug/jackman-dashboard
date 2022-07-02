import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// material
import { Box, Divider, Stack, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import bookingsAtom from "../../recoil/atoms/bookingsAtom";
import bookingModalAtom from "../../recoil/atoms/bookingModalAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { deleteBookings } from "../../__apis__/bookings";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import homePageStyles from "./homePageStyles";
// utils
import {
  bookingsColumnsGenerator,
  bookingsRowsMocker,
} from "../../utils/bookingsDataMocker";
// components
import Indicator from "../../components/__homePage/Indicator";
import userAtom from "../../recoil/atoms/userAtom";

// --------------------------------------------------------------------------------------------------------------

function HomePage() {
  const [bookings, setBookings] = useRecoilState(bookingsAtom);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const userInfo = useRecoilValue(userAtom);

  const deleteBookingHandler = useCallback(
    async (bookingId) => {
      setBookingModal({ ...bookingModal, confirming: true });
      await deleteBookings(bookingId)
        .then((response) => {
          setBookings({ ...bookings, refresh: Math.random() });
          setAlert({
            status: "open",
            variant: "success",
            message: "Booking had been deleted successfully.",
          });
        })
        .catch((error) => {
          setAlert({
            status: "open",
            variant: "error",
            message:
              "Something wrong happened while deleting booking, we are working on getting it done soon.",
          });
          console.log("Error deleting booking", error);
        });
      setBookingModal({ ...bookingModal, confirming: false });
    },
    [bookingModal, setBookingModal, bookings, setAlert, setBookings]
  );

  const onDeleteBookingClick = (bookingId) => {
    setBookingModal({
      show: true,
      variant: "error",
      title: "Delete",
      bodyText: "Are you sure you want to delete this request.",
      confirmHandler: () => deleteBookingHandler(bookingId),
      confirming: false,
    });
  };

  useEffect(() => {
    setTableData(bookingsRowsMocker(bookings.data));
  }, [bookings]);

  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box sx={homePageStyles.mainWrapper}>
        {/* Instructions */}
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          marginTop={2}
        >
          {/* Account id */}
          <Typography
            sx={homePageStyles.indicatorWrapper}
            variant="body2"
            color="secondary"
          >
            Your ID: {userInfo.id}
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

        {/* Data table */}
        <Box
          marginTop={4}
          sx={{ width: { xs: "300px", sm: "100%", md: "100%", lg: "100%" } }}
        >
          <MUIDataTable
            columns={bookingsColumnsGenerator(false, {
              deleteCallback: onDeleteBookingClick,
            })}
            data={tableData}
            options={{ selectableRowsHideCheckboxes: true, elevation: 0 }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default HomePage;
