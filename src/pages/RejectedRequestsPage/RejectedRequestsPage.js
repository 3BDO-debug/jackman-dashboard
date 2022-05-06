import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// atoms
import bookingModalAtom from "../../recoil/atoms/bookingModalAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { deleteBookings, getRejectedBookings } from "../../__apis__/bookings";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import rejectedRequestsPageStyles from "./rejectedRequestsPageStyles";
// components
import SearchField from "../../components/SearchField";
import DataTable from "../../components/DataTable";

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

function RejectedRequestsPage() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);

  const dateFormatter = (date) => {
    const dateMoment = moment(date);
    return dateMoment.format("YYYY-MM-DD:hh:m");
  };

  const fetchRejectedRequests = useCallback(async () => {
    await getRejectedBookings()
      .then((acceptedBookings) => {
        setAcceptedRequests(acceptedBookings);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const deleteBookingHandler = useCallback(
    async (bookingId) => {
      setBookingModal({ ...bookingModal, confirming: true });
      await deleteBookings(bookingId)
        .then(() => {
          setAlert({
            status: "open",
            variant: "success",
            message: "Booking had been deleted successfully.",
          });
        })
        .catch(() =>
          setAlert({
            status: "open",
            variant: "error",
            message: "Something wrong happened fetching rejected requests.",
          })
        );
      fetchRejectedRequests();
      setBookingModal({ ...bookingModal, confirming: false });
    },
    [bookingModal, setBookingModal, setAlert, fetchRejectedRequests]
  );

  useEffect(() => {
    fetchRejectedRequests();
  }, [fetchRejectedRequests]);

  useEffect(() => {
    if (acceptedRequests.length > 0) {
      const mappedData = acceptedRequests.map((acceptedRequest) => ({
        id: acceptedRequest.id,
        fullname: acceptedRequest.client.name,
        dateIssued: acceptedRequest.selectedDate,
        dateRequested: (
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            width="200px"
          >
            <Typography>
              {dateFormatter(acceptedRequest.requestedDate1)}
            </Typography>
            <Typography>
              {dateFormatter(acceptedRequest.requestedDate2)}
            </Typography>
            <Typography>
              {dateFormatter(acceptedRequest.requestedDate3)}
            </Typography>
          </Stack>
        ),
        phoneNumber: acceptedRequest.client.phoneNumber,
        place: acceptedRequest.dealer.location,
        actions: (
          <IconButton
            onClick={() =>
              setBookingModal({
                show: true,
                variant: "error",
                title: "Delete",
                bodyText: "Are you sure you want to delete this request.",
                confirmHandler: () => deleteBookingHandler(acceptedRequest.id),
                confirming: false,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        ),
      }));

      setTableData(mappedData);
    }
  }, [acceptedRequests, deleteBookingHandler, setBookingModal]);

  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box
        sx={[
          rejectedRequestsPageStyles.mainWrapper,
          { width: { xs: "300px", sm: "400px", md: "100%", lg: "100%" } },
        ]}
      >
        {/* Intro */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <Typography variant="body2" color="secondary">
            Your ID: 13647832648
          </Typography>
        </Box>
        {/* Search field */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <SearchField />
        </Box>
        {/* Title */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <Typography variant="h6" color="error">
            Rejected Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
          <DataTable headerLabels={tableHeaderLabels} data={tableData} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default RejectedRequestsPage;
