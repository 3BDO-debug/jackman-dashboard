import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import moment from "moment";
// material
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
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
import ModifyBookingPopUP from "../../components/ModifyBookingPopUp/ModifyBookingPopUp";

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
  const [modifyBookingPopUp, triggerModifyBookingPopUp] = useState(false);
  const [modifyBookingPopUpVariant, setModifyBookingPopUpVariant] =
    useState("");
  const [triggeredBooking, setTriggeredBooking] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [queriedBookings, setQueriedBookings] = useState([]);

  const dateFormatter = (date) => {
    const dateMoment = moment(date);
    return dateMoment.format("YYYY-MM-DD:hh:m");
  };

  const searchHandler = useCallback(() => {
    if (searchQuery.length === 0) {
      setQueriedBookings(bookings);
    } else {
      const filteredBookings = bookings.data.filter((booking) => {
        return booking?.client?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setQueriedBookings({ data: filteredBookings, refresh: false });
    }
  }, [searchQuery, bookings]);

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
    const bookingsData = searchQuery.length > 0 ? queriedBookings : bookings;
    const bookingsMappedData = bookingsData.data.map((booking) => ({
      id: booking.id,
      fullname: booking.client.name,
      dateIssued: "Issued date not available yet",
      dateRequested: (
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          width="200px"
        >
          <Typography>{dateFormatter(booking?.requestedDate1)}</Typography>
          <Typography>{dateFormatter(booking?.requestedDate2)}</Typography>
          <Typography>{dateFormatter(booking?.requestedDate3)}</Typography>
        </Stack>
      ),
      phoneNumber: booking?.client.phoneNumber,
      place: booking?.dealer.location,
      plateNumber: booking?.car?.plateNo,
      chassisNumber: booking?.car?.chassisName,
      actions: (
        <Stack direction="row">
          <Button
            color="success"
            variant="text"
            onClick={() => {
              setModifyBookingPopUpVariant("accept");
              setTriggeredBooking(booking?.id);
              triggerModifyBookingPopUp(true);
            }}
          >
            Accept
          </Button>
          <Button
            color="error"
            variant="text"
            onClick={() => {
              setModifyBookingPopUpVariant("reject");
              setTriggeredBooking(booking?.id);
              triggerModifyBookingPopUp(true);
            }}
          >
            Reject
          </Button>
          <IconButton
            onClick={() =>
              setBookingModal({
                show: true,
                variant: "error",
                title: "Delete",
                bodyText: "Are you sure you want to delete this request.",
                confirmHandler: () => deleteBookingHandler(booking?.id),
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
  }, [
    bookings,
    deleteBookingHandler,
    setBookingModal,
    queriedBookings,
    searchQuery.length,
  ]);

  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box
        sx={[
          pendingRequestsPageStyles.mainWrapper,
          { width: { xs: "300px", sm: "400px", md: "100%", lg: "100%" } },
        ]}
      >
        {/* Page intro */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <Typography variant="body2" color="secondary">
            Your ID: 13647832648
          </Typography>
        </Box>
        {/* Search field */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <SearchField
            searchState={[searchQuery, setSearchQuery]}
            onSearchHandler={searchHandler}
          />
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
        <ModifyBookingPopUP
          isTriggered={modifyBookingPopUp}
          closeHandler={() => triggerModifyBookingPopUp(false)}
          bookingId={triggeredBooking}
          variant={modifyBookingPopUpVariant}
        />
      </Box>
    </MainLayout>
  );
}

export default PendingRequestsPage;
