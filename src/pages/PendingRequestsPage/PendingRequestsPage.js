import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import moment from "moment";
// material
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
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
import pendingRequestsPageStyles from "./pendingRequestsPageStyles";
// components
import SearchField from "../../components/SearchField";
import DataTable from "../../components/DataTable";
import { LoadingButton } from "@mui/lab";
import AcceptBookingPopUp from "../../components/__pendingRequestsPage/AcceptBookingPopUp";

// --------------------------------------------------------------------------------

const tableHeaderLabels = [
  "#ID",
  "Full Name",
  "Date issued",
  "Date requested",
  "Phone",
  "Place",
  "Actions",
];

// --------------------------------------------------------------------------------

function PendingRequestsPage() {
  const [bookings, setBookings] = useRecoilState(bookingsAtom);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const [acceptBookingPopUp, triggerAcceptBookingPopUp] = useState(false);
  const [triggeredBooking, setTriggeredBooking] = useState(0);

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
      plateNumber: booking.car.plateNo,
      chassisNumber: booking.car.chassisName,
      actions: (
        <Stack direction="row">
          <Button
            color="success"
            variant="text"
            onClick={() => {
              setTriggeredBooking(booking.id);
              triggerAcceptBookingPopUp(true);
            }}
          >
            Accept
          </Button>
          <LoadingButton color="error" variant="text">
            Reject
          </LoadingButton>
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
        </Stack>
      ),
    }));

    setTableData(bookingsMappedData);
  }, [bookings, deleteBookingHandler, setBookingModal]);

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
          <DataTable headerLabels={tableHeaderLabels} data={tableData} />
        </Box>
        {/* Accept request pop up */}
        <AcceptBookingPopUp
          isTriggered={acceptBookingPopUp}
          closeHandler={() => triggerAcceptBookingPopUp(false)}
          bookingId={triggeredBooking}
        />
      </Box>
    </MainLayout>
  );
}

export default PendingRequestsPage;
