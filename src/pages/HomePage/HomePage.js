import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import moment from "moment";
// material
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
// components
import Indicator from "../../components/__homePage/Indicator";
import DataTable from "../../components/DataTable";
import SearchField from "../../components/SearchField";
import userAtom from "../../recoil/atoms/userAtom";

// --------------------------------------------------------------------------------------------------------------

const tableHeaderLabels = [
  "#ID",
  "Full Name",
  "Date issued",
  "Date requested",
  "Phone",
  "Place",
  "Status",
  "Actions",
];

// --------------------------------------------------------------------------------------------------------------

function HomePage() {
  const [bookings, setBookings] = useRecoilState(bookingsAtom);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const userInfo = useRecoilValue(userAtom);

  const dateFormatter = (date) => {
    const dateMoment = moment(date);
    return dateMoment.format("YYYY-MM-DD:hh:m");
  };

  const deleteBookingHandler = useCallback(
    async (bookingId) => {
      setBookingModal({ ...bookingModal, confirming: true });
      await deleteBookings(bookingId)
        .then((response) => {
          setBookings({ ...bookings, refresh: (bookings.refresh += 1) });
          setAlert({
            status: "open",
            variant: "success",
            message: "Booking had been deleted successfully.",
          });
        })
        .catch((error) => "hello");
      setBookingModal({ ...bookingModal, confirming: false });
    },
    [bookingModal, setBookingModal, bookings, setAlert, setBookings]
  );

  useEffect(() => {
    const bookingsMappedData = bookings.data.map((booking) => ({
      id: booking.id,
      fullname: booking.client.name,
      dateIssued: "Date goes here",
      dateRequested: (
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          width="200px"
        >
          <Typography>{dateFormatter(booking.requestedDate1)}</Typography>
          <Typography>{dateFormatter(booking.requestedDate2)}</Typography>
          <Typography>{dateFormatter(booking.requestedDate3)}</Typography>
        </Stack>
      ),
      phoneNumber: booking.client.phoneNumber,
      place: booking.dealer.location,
      status: (
        <Typography
          color={
            booking.status === "accept"
              ? "success"
              : booking.status === "reject"
              ? "error"
              : "#496360"
          }
        >
          {booking.status}
        </Typography>
      ),
      plateNumber: booking.car.plateNo,
      chassisNumber: booking.car.chassisName,
      actions: (
        <IconButton
          onClick={() =>
            setBookingModal({
              show: true,
              variant: "error",
              title: "Delete",
              bodyText: "Are you sure you want to delete this request.",
              confirmHandler: () => deleteBookingHandler(booking.id),
              confirming: false,
            })
          }
        >
          <DeleteIcon />
        </IconButton>
      ),
    }));

    setTableData(bookingsMappedData);
  }, [bookings, deleteBookingHandler, setBookingModal]);

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
        {/* Search box */}
        <Box marginTop={4}>
          <SearchField />
        </Box>
        {/* Data table */}
        <Box
          marginTop={4}
          sx={{ width: { xs: "300px", sm: "100%", md: "100%", lg: "100%" } }}
        >
          <DataTable headerLabels={tableHeaderLabels} data={tableData} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default HomePage;
