import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import bookingsAtom from "../recoil/atoms/bookingsAtom";
import alertAtom from "../recoil/atoms/alertAtom";
// __apis__
import { modifyBooking } from "../__apis__/bookings";

// --------------------------------------------------------------------------------------------------------------

function ModifyBookingPopUP({ isTriggered, closeHandler, bookingId, variant }) {
  const [bookings, setBookings] = useRecoilState(bookingsAtom);
  const [bookingData, setBookingData] = useState({});
  const setAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      selectedDate: "",
    },
    validationSchema: Yup.object().shape({
      selectedDate: Yup.string().required("Please choose a date"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        decision: variant === "accept" ? "accept" : "reject",
        selectedDate: values.selectedDate,
        bookingId: bookingData.id,
      };

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
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    errors,
    touched,
    dirty,
    isSubmitting,
    handleSubmit,
  } = formik;

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
      <DialogContent>
        <Box component="form" marginTop={1}>
          <TextField
            label="Pick a booking date"
            value={values.selectedDate}
            onChange={(event) =>
              setFieldValue("selectedDate", event.target.value)
            }
            {...getFieldProps("selectedDate")}
            error={Boolean(touched.selectedDate && errors.selectedDate)}
            helperText={touched.selectedDate && errors.selectedDate}
            fullWidth
            select
          >
            <MenuItem value={bookingData?.requestedDate1}>
              {bookingData?.requestedDate1}
            </MenuItem>
            <MenuItem value={bookingData?.requestedDate2}>
              {bookingData?.requestedDate2}
            </MenuItem>
            <MenuItem value={bookingData?.requestedDate3}>
              {bookingData?.requestedDate3}
            </MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          color="success"
          loading={isSubmitting}
          disabled={!dirty}
          onClick={handleSubmit}
        >
          {variant === "accept" ? "Accept" : "Reject"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModifyBookingPopUP;
