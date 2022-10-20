import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilValue, useSetRecoilState } from "recoil";
// material
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Autocomplete,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// __apis__
import { manufacturersFetcher } from "../../__apis__/manufacturers";
import { dealerSupportedCarsAdder } from "../../__apis__/dealers";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// components

// --------------------------------------------------------------------------------------

function AddSupportedCarsPopUp({ isTriggered, closeHandler, refreshData }) {
  const [manufacturers, setManufacturers] = useState([]);
  const [fetchingManufacturers, setFetchingManufacturers] = useState(false);
  const dealerInfo = useRecoilValue(triggeredDealerAtom);
  const setAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      selectedManufacturers: manufacturers[0],
    },
    validationSchema: Yup.object().shape({
      selectedManufacturers: Yup.array()
        .min(1, "Please select at least one manufacturer")
        .required("Manufacturer is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const requestData = {
        dealerId: dealerInfo.id,
        manufacturers: values.selectedManufacturers,
      };
      await dealerSupportedCarsAdder(requestData)
        .then(() => {
          setAlert({
            status: "open",
            variant: "success",
            message: "Added dealer supported car",
          });
        })
        .catch((error) => {
          console.log("Error adding dealer supported cars", error);
          setAlert({
            status: "open",
            variant: "error",
            message: "Added dealer supported car",
          });
        });

      await refreshData();
      resetForm();
      setSubmitting(false);
      closeHandler();
    },
  });

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    errors,
    dirty,
    touched,
  } = formik;

  const fetchManufacturers = useCallback(async () => {
    setFetchingManufacturers(true);
    await manufacturersFetcher()
      .then((response) => {
        setManufacturers(response.result.data);
      })
      .catch((error) => {
        console.log("Something wrong happened fetching manufacturers", error);
      });
    setFetchingManufacturers(false);
  }, []);

  useEffect(() => {
    fetchManufacturers();
  }, [fetchManufacturers]);

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add supported cars</DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                title="Manufacturers"
                options={manufacturers.map((manufacturer) => ({
                  label: manufacturer.name,
                  id: manufacturer.id,
                }))}
                value={values.selectedManufacturers}
                loading={fetchingManufacturers}
                onChange={(event, newValue) => {
                  setFieldValue("selectedManufacturers", newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Manufacturers" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {touched.selectedManufacturers && (
                <FormHelperText error>
                  {errors.selectedManufacturers}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="outlined" color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <LoadingButton
          disabled={!dirty}
          loading={isSubmitting}
          onClick={handleSubmit}
          variant="contained"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddSupportedCarsPopUp;
