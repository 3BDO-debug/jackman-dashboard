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
import { deleteBookings, getAcceptedBookings } from "../../__apis__/bookings";
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
  "Phone",
  "Place",
  "Actions",
];

// --------------------------------------------------------------------------------

function AcceptedRequestsPage() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const [refreshData, setRefreshData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [queriedAcceptedRequests, setQueriedAcceptedRequests] = useState([]);

  const dateFormatter = (date) => {
    const dateMoment = moment(date);
    return dateMoment.format("YYYY-MM-DD:hh:m");
  };

  const fetchAcceptedRequests = useCallback(async () => {
    await getAcceptedBookings()
      .then((acceptedBookings) => {
        setAcceptedRequests(acceptedBookings);
      })
      .catch((error) => console.log("error", error));
    setRefreshData(false);
  }, []);

  const searchHandler = useCallback(() => {
    if (searchQuery.length === 0) {
      setQueriedAcceptedRequests(acceptedRequests);
    } else {
      const filteredRequests = acceptedRequests.filter((acceptedRequest) => {
        return acceptedRequest?.client?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setQueriedAcceptedRequests(filteredRequests);
    }
  }, [searchQuery, acceptedRequests]);

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
        .catch((error) => "hello");
      setRefreshData(true);
      setBookingModal({ ...bookingModal, confirming: false });
    },
    [bookingModal, setBookingModal, setAlert]
  );

  useEffect(() => {
    fetchAcceptedRequests();
  }, [fetchAcceptedRequests]);

  useEffect(() => {
    if (refreshData) {
      fetchAcceptedRequests();
    }
  }, [refreshData, fetchAcceptedRequests]);

  useEffect(() => {
    if (acceptedRequests.length > 0) {
      const acceptedRequestsData =
        searchQuery.length > 0 ? queriedAcceptedRequests : acceptedRequests;
      const mappedData = acceptedRequestsData.map((acceptedRequest) => ({
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
  }, [
    acceptedRequests,
    deleteBookingHandler,
    setBookingModal,
    queriedAcceptedRequests,
    searchQuery.length,
  ]);

  return (
    <MainLayout>
      <Box
        sx={[
          acceptedRequestsPageStyles.mainWrapper,
          { width: { xs: "300px", sm: "400px", md: "100%", lg: "100%" } },
        ]}
      >
        {/* Intro */}
        <Box sx={acceptedRequestsPageStyles.verticalMargin}>
          <Typography variant="body1" color="secondary">
            Your ID: 13647832648
          </Typography>
        </Box>
        {/* Search field  */}
        <Box sx={acceptedRequestsPageStyles.verticalMargin}>
          <SearchField
            searchState={[searchQuery, setSearchQuery]}
            onSearchHandler={searchHandler}
          />
        </Box>
        {/* Title */}
        <Box sx={{ ...acceptedRequestsPageStyles.verticalMargin }}>
          <Typography variant="h6" color="#21D66A">
            Accepted Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...acceptedRequestsPageStyles.verticalMargin }}>
          <DataTable headerLabels={tableHeaderLabels} data={tableData} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default AcceptedRequestsPage;
