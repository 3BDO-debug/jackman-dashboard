import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import { useRecoilState, useSetRecoilState } from "recoil";
import moment from "moment";
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import bookingsAtom from "../../recoil/atoms/bookingsAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { modifyBooking } from "../../__apis__/bookings";
//
import AcceptBookingPopUpContent from "./AcceptBookingPopUpContent";
import RejectBookingPopUpContent from "./RejectBookingPopUpContent";

// --------------------------------------------------------------------------------------------------------------

const PopUpActions = (props) => {
  const [actionIsDisabled, setDisableAction] = useState(true);

  const { isSubmitting, dirty, handleSubmit, values } = useFormikContext();

  useEffect(() => {
    if (props.variant === "accept") {
      if (values.selectedDate !== "") {
        setDisableAction(false);
      } else {
        setDisableAction(true);
      }
    } else if (props.variant === "reject") {
      if (Object.keys(values.suggestedDates).length === 3) {
        setDisableAction(false);
      } else {
        setDisableAction(true);
      }
    }
  }, [values, props.variant]);

  return (
    <DialogActions>
      <Button color="error" onClick={props.closeHandler}>
        Cancel
      </Button>
      <LoadingButton
        variant="contained"
        color={actionIsDisabled ? "inherit" : "success"}
        loading={isSubmitting}
        disabled={!dirty || actionIsDisabled}
        onClick={handleSubmit}
      >
        {props.variant === "accept" ? "Accept" : "Reject"}
      </LoadingButton>
    </DialogActions>
  );
};

// --------------------------------------------------------------------------------------------------------------

function ModifyBookingPopUP({ isTriggered, closeHandler, bookingId, variant }) {
  const [bookings, setBookings] = useRecoilState(bookingsAtom);
  const [bookingData, setBookingData] = useState({});
  const setAlert = useSetRecoilState(alertAtom);

  const suggestedDatesParser = (suggestedDates) => {
    const suggestedDatesData = [];

    // First suggested date parsing
    const firstSuggestedDate = moment(suggestedDates.firstSuggestedDate).format(
      "YYYY-MM-DD"
    );
    const firstSuggestedDateTime = moment(
      suggestedDates.firstSuggestedDate
    ).format("HH:mm:SS");
    const parsedFirstSuggestedDate = `${firstSuggestedDate}T${firstSuggestedDateTime}`;

    // Second suggested date parsing
    const secondSuggestedDate = moment(
      suggestedDates.secondSuggestedDate
    ).format("YYYY-MM-DD");
    const secondSuggestedDateTime = moment(
      suggestedDates.secondSuggestedDate
    ).format("HH:mm:SS");
    const parsedSecondSuggestedDate = `${secondSuggestedDate}T${secondSuggestedDateTime}`;

    // Third suggested date parsing
    const thirdSuggestedDate = moment(suggestedDates.thirdSuggestedDate).format(
      "YYYY-MM-DD"
    );
    const thirdSuggestedDateTime = moment(
      suggestedDates.thirdSuggestedDate
    ).format("HH:mm:SS");
    const parsedThirdSuggestedDate = `${thirdSuggestedDate}T${thirdSuggestedDateTime}`;

    // injecting suggested dates data

    suggestedDatesData.push([
      parsedFirstSuggestedDate,
      parsedSecondSuggestedDate,
      parsedThirdSuggestedDate,
    ]);

    return suggestedDatesData;
  }; // in case of rejecting a booking

  const handleFormSubmission = async (values, { resetForm }) => {
    let data;
    if (variant === "accept") {
      data = {
        decision: "accept",
        selectedDate: values.selectedDate,
        bookingId: bookingData.id,
      };
    } else {
      data = {
        decision: "reject",
        bookingId: bookingData.id,
        suggestedDates: suggestedDatesParser(values.suggestedDates),
      };
    }

    await modifyBooking(data)
      .then(() => {
        setBookings({ ...bookings, refresh: true });
        setAlert({
          status: "open",
          variant: "success",
          message: `Booking request has been ${
            variant === "accept" ? "accepted" : "rejected"
          } successfully.`,
        });
        closeHandler();
      })
      .catch(() =>
        setAlert({
          status: "open",
          variant: "error",
          message:
            "Something wrong happened and we couldnt process your request at the moment.",
        })
      );

    resetForm();
  };

  useEffect(() => {
    if (bookings.data) {
      const triggeredBookingData = bookings.data.find(
        (booking) => booking.id === bookingId
      );
      setBookingData(triggeredBookingData);
    }
  }, [bookings.data, bookingId]);

  return (
    <Dialog open={isTriggered} onClose={closeHandler}>
      <DialogTitle>
        {variant === "accept" ? "Accept" : "Reject"} booking confirmation
      </DialogTitle>
      <Formik
        initialValues={{ selectedDate: "", suggestedDates: {} }}
        onSubmit={handleFormSubmission}
      >
        <>
          <DialogContent>
            {variant === "accept" ? (
              <AcceptBookingPopUpContent bookingData={bookingData} />
            ) : (
              <RejectBookingPopUpContent />
            )}
          </DialogContent>
          <PopUpActions variant={variant} closeHandler={closeHandler} />
        </>
      </Formik>
    </Dialog>
  );
}

export default ModifyBookingPopUP;
