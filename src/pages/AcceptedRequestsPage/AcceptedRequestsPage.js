import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import bookingModalAtom from "../../recoil/atoms/bookingModalAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { deleteBookings, getAcceptedBookings } from "../../__apis__/bookings";
// utils
import {
  bookingsColumnsGenerator,
  bookingsRowsMocker,
} from "../../utils/bookingsDataMocker";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import acceptedRequestsPageStyles from "./acceptedRequestsPageStyles";

// --------------------------------------------------------------------------------

function AcceptedRequestsPage() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const [refreshData, setRefreshData] = useState(false);

  const fetchAcceptedRequests = useCallback(async () => {
    await getAcceptedBookings()
      .then((acceptedBookings) => {
        setAcceptedRequests(acceptedBookings);
      })
      .catch((error) => console.log("error", error));
    setRefreshData(false);
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
        .catch((error) => "hello");
      setRefreshData(true);
      setBookingModal({ ...bookingModal, confirming: false });
    },
    [bookingModal, setBookingModal, setAlert]
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
    fetchAcceptedRequests();
  }, [fetchAcceptedRequests]);

  useEffect(() => {
    if (refreshData) {
      fetchAcceptedRequests();
    }
  }, [refreshData, fetchAcceptedRequests]);

  useEffect(() => {
    setTableData(bookingsRowsMocker(acceptedRequests));
  }, [acceptedRequests]);

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
        {/* Title */}
        <Box sx={{ ...acceptedRequestsPageStyles.verticalMargin }}>
          <Typography variant="h6" color="#21D66A">
            Accepted Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...acceptedRequestsPageStyles.verticalMargin }}>
          <MUIDataTable
            columns={bookingsColumnsGenerator(false, {
              deleteCallback: onDeleteBookingClick,
            })}
            data={tableData}
            options={{
              selectableRowsHideCheckboxes: true,
              elevation: 0,
              downloadOptions: {
                filterOptions: {
                  useDisplayedRowsOnly: true,
                },
              },
            }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default AcceptedRequestsPage;
