import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
// material
import { Box, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import bookingsAtom from "../../recoil/atoms/bookingsAtom";
import bookingModalAtom from "../../recoil/atoms/bookingModalAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { deleteBookings } from "../../__apis__/bookings";
// utils
import {
  bookingsColumnsGenerator,
  bookingsRowsMocker,
} from "../../utils/bookingsDataMocker";
// layouts
import MainLayout from "../../layouts/MainLayout";
// styles
import pendingRequestsPageStyles from "./pendingRequestsPageStyles";
// components
import ModifyBookingPopUP from "../../components/ModifyBookingPopUp/ModifyBookingPopUp";

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

  const onAcceptBookingClick = (bookingId) => {
    setModifyBookingPopUpVariant("accept");
    setTriggeredBooking(bookingId);
    triggerModifyBookingPopUp(true);
  };

  const onRejectBookingClick = (bookingId) => {
    setModifyBookingPopUpVariant("reject");
    setTriggeredBooking(bookingId);
    triggerModifyBookingPopUp(true);
  };

  useEffect(() => {
    setTableData(bookingsRowsMocker(bookings?.data));
  }, [bookings]);

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

        {/* Title */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <Typography variant="h6" color="primary">
            Pending Requests
          </Typography>
        </Box>
        {/* Data table */}
        <Box sx={{ ...pendingRequestsPageStyles.varticalMargin }}>
          <MUIDataTable
            columns={bookingsColumnsGenerator(true, {
              acceptCallback: onAcceptBookingClick,
              rejectCallback: onRejectBookingClick,
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
