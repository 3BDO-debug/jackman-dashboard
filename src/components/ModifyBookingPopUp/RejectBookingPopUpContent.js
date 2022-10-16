import React, { useEffect, useState } from "react";
import { useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
// material
import { Box, Grid, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// --------------------------------------------------------------------------------------------------

function RejectBookingPopUpContent() {
  const [firstDisabledDate, setFirstDisabledDate] = useState(null);
  const [secondDisabledDate, setSecondDisabledDate] = useState(null);

  const rejectBookingFormik = useFormik({
    initialValues: {
      firstSuggestedDate: null,
      secondSuggestedDate: null,
      thirdSuggestedDate: null,
    },
    validationSchema: Yup.object().shape({
      firstSuggestedDate: Yup.date().required(
        "You should suggest date for the user"
      ),
      secondSuggestedDate: Yup.date().required(
        "You should suggest date for the user"
      ),
      thirdSuggestedDate: Yup.date().required(
        "You should suggest date for the user"
      ),
    }),
  });

  const { values, setFieldValue, errors, touched } = rejectBookingFormik;

  const mainFormikValues = useFormikContext()?.values;
  const setMainFormikValue = useFormikContext()?.setFieldValue;

  const handleSuuggestedDatesUniqueness = (key, value) => {
    if (key === "firstSuggestedDate") {
      if ("firstSuggestedDate" in mainFormikValues.suggestedDates) {
        const suggestedDatesCopy = mainFormikValues.suggestedDates;
        suggestedDatesCopy.firstSuggestedDate = value;
        setMainFormikValue("suggestedDates", suggestedDatesCopy);
      } else {
        setMainFormikValue("suggestedDates", { firstSuggestedDate: value });
      }
    }

    if (key === "secondSuggestedDate") {
      if ("secondSuggestedDate" in mainFormikValues.suggestedDates) {
        const suggestedDatesCopy = mainFormikValues.suggestedDates;
        suggestedDatesCopy.secondSuggestedDate = value;
        setMainFormikValue("suggestedDates", suggestedDatesCopy);
      } else {
        setMainFormikValue("suggestedDates", {
          ...mainFormikValues.suggestedDates,
          secondSuggestedDate: value,
        });
      }
    }

    if (key === "thirdSuggestedDate") {
      if ("thirdSuggestedDate" in mainFormikValues.suggestedDates) {
        const suggestedDatesCopy = mainFormikValues.suggestedDates;
        suggestedDatesCopy.thirdSuggestedDate = value;
        setMainFormikValue("suggestedDates", suggestedDatesCopy);
      } else {
        setMainFormikValue("suggestedDates", {
          ...mainFormikValues.suggestedDates,
          thirdSuggestedDate: value,
        });
      }
    }
  };

  const handleDateChange = (key, value) => {
    if (key === "firstSuggestedDate") {
      setFieldValue("firstSuggestedDate", value);
      handleSuuggestedDatesUniqueness("firstSuggestedDate", value);
    } else if (key === "secondSuggestedDate") {
      setFieldValue("secondSuggestedDate", value);
      handleSuuggestedDatesUniqueness("secondSuggestedDate", value);
    } else if (key === "thirdSuggestedDate") {
      setFieldValue("thirdSuggestedDate", value);
      handleSuuggestedDatesUniqueness("thirdSuggestedDate", value);
    }
  };

  useEffect(() => {
    if (values.firstSuggestedDate) {
      setFirstDisabledDate(values.firstSuggestedDate);
    }
  }, [values.firstSuggestedDate]);

  useEffect(() => {
    if (values.secondSuggestedDate) {
      setSecondDisabledDate(values.secondSuggestedDate);
    }
  }, [values.secondSuggestedDate]);

  return (
    <Box component="form" marginTop={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                label="Suggested first date"
                {...props}
                fullWidth
                error={Boolean(
                  touched.firstSuggestedDate && errors.firstSuggestedDate
                )}
                helperText={
                  touched.firstSuggestedDate && errors.firstSuggestedDate
                }
              />
            )}
            label="Suggested first date"
            value={values.firstSuggestedDate || new Date()}
            onChange={(newValue) => {
              handleDateChange("firstSuggestedDate", newValue);
            }}
          />
        </Grid>
        {values.firstSuggestedDate && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  label="Suggested second date"
                  {...props}
                  error={Boolean(
                    touched.secondSuggestedDate && errors.secondSuggestedDate
                  )}
                  helperText={
                    touched.secondSuggestedDate && errors.secondSuggestedDate
                  }
                  fullWidth
                />
              )}
              label="Suggested second date"
              value={values.secondSuggestedDate || new Date()}
              onChange={(newValue) => {
                handleDateChange("secondSuggestedDate", newValue);
              }}
              shouldDisableDate={(date) => {
                if (
                  date?.format("MM/DD/YYYY") ===
                  firstDisabledDate?.format("MM/DD/YYYY")
                ) {
                  return true;
                }

                return false;
              }}
            />
          </Grid>
        )}
        {values.secondSuggestedDate && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  label="Suggested third date"
                  {...props}
                  error={Boolean(
                    touched.thirdSuggestedDate && errors.thirdSuggestedDate
                  )}
                  helperText={
                    touched.thirdSuggestedDate && errors.thirdSuggestedDate
                  }
                  fullWidth
                />
              )}
              label="Suggested third date"
              value={values.thirdSuggestedDate || new Date()}
              onChange={(newValue) => {
                handleDateChange("thirdSuggestedDate", newValue);
              }}
              PaperProps={{ sx: { marginBottom: "20px" } }}
              shouldDisableDate={(date) => {
                if (
                  date?.format("MM/DD/YYYY") ===
                    secondDisabledDate?.format("MM/DD/YYYY") ||
                  date?.format("MM/DD/YYYY") ===
                    firstDisabledDate?.format("MM/DD/YYYY")
                ) {
                  return true;
                }

                return false;
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default RejectBookingPopUpContent;
