import React from "react";
import { useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
// material
import { Box, TextField, MenuItem } from "@mui/material";

// -------------------------------------------------------------------------

function AcceptBookingPopUpContent({ bookingData }) {
  const acceptBookingFormik = useFormik({
    initialValues: {
      selectedDate: "",
    },
    validationSchema: Yup.object().shape({
      selectedDate: Yup.string().required("Please select date to accept"),
    }),
  });

  const { values, setFieldValue, touched, errors } = acceptBookingFormik;

  const setMainFormikValue = useFormikContext()?.setFieldValue;

  console.log("bvv", bookingData);

  return (
    <Box component="form" marginTop={1}>
      <TextField
        label="Pick a booking date"
        value={values.selectedDate}
        onChange={(event) => {
          setFieldValue("selectedDate", event.target.value);
          setMainFormikValue("selectedDate", event.target.value);
        }}
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
  );
}

export default AcceptBookingPopUpContent;
