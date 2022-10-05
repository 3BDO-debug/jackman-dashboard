import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box } from "@mui/material";
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
// components
import PageIntro from "../../components/PageIntro";

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
      <PageIntro title="Accepted Requests" titleColor="#21D66A" />
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
    </MainLayout>
  );
}

export default AcceptedRequestsPage;
