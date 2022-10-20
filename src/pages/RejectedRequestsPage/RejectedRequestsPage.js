import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box } from "@mui/material";
// atoms
import bookingModalAtom from "../../recoil/atoms/bookingModalAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { deleteBookings, getRejectedBookings } from "../../__apis__/bookings";
// utils
import {
  bookingsColumnsGenerator,
  bookingsRowsMocker,
} from "../../utils/bookingsDataMocker";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import rejectedRequestsPageStyles from "./rejectedRequestsPageStyles";
import MUIDataTable from "mui-datatables";
// components
import PageIntro from "../../components/PageIntro";

// --------------------------------------------------------------------------------

function RejectedRequestsPage() {
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [bookingModal, setBookingModal] = useRecoilState(bookingModalAtom);
  const setAlert = useSetRecoilState(alertAtom);

  const fetchRejectedRequests = useCallback(async () => {
    await getRejectedBookings()
      .then((acceptedBookings) => {
        setRejectedRequests(acceptedBookings);
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
    fetchRejectedRequests();
  }, [fetchRejectedRequests]);

  useEffect(() => {
    setTableData(bookingsRowsMocker(rejectedRequests));
  }, [rejectedRequests]);

  return (
    <MainLayout>
      {/* Main wrapper */}
      <Box
        sx={[
          rejectedRequestsPageStyles.mainWrapper,
          { width: { xs: "300px", sm: "400px", md: "100%", lg: "100%" } },
        ]}
      >
        <PageIntro title="Rejected Requests" titleColor="error" />

        {/* Data table */}
        <Box sx={{ ...rejectedRequestsPageStyles.verticalMargin }}>
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

export default RejectedRequestsPage;
