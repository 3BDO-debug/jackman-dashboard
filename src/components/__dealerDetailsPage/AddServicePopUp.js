import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// material
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { dealerServiceAdder } from "../../__apis__/dealers";

// ------------------------------------------------------------------------------------

function AddServicePopUp({ isTriggered, closeHandler }) {
  const [dealerInfo, setDealerInfo] = useRecoilState(triggeredDealerAtom);
  const setAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      type: "",
      price: 0,
      description: "",
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required("Service type is required"),
      price: Yup.number()
        .min(0, "Service price cannot be negative value")
        .required("Service price is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const requestData = {
        dealerId: dealerInfo?.id,
        type: values.type,
        price: values.price,
        description: values.description,
      };

      await dealerServiceAdder(requestData)
        .then((response) => {
          setDealerInfo({
            ...dealerInfo,
            services: [...dealerInfo.services, { ...response }],
          });
          setAlert({
            status: "open",
            variant: "success",
            message: "Dealer service added successfully",
          });
          resetForm();
        })
        .catch((error) => {
          setAlert({
            status: "open",
            variant: "error",
            message: "Something wrong happened",
          });
          console.log("Error adding dealer service", error);
        });

      setSubmitting(false);
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    dirty,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add service</DialogTitle>
      <DialogContent>
        <Box marginTop={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Service type"
                value={values.type}
                onChange={(event) => setFieldValue("type", event.target.value)}
                {...getFieldProps("type")}
                error={Boolean(touched.type && errors.type)}
                helperText={touched.type && errors.type}
                select
                fullWidth
              >
                <MenuItem value="car_wash">Car Wash</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="tires_battaries">
                  Tires &amp; Batteries
                </MenuItem>
                <MenuItem value="protection">Protection</MenuItem>
                <MenuItem value="tuning">Tuning</MenuItem>
                <MenuItem value="dent_repair">Dent Repair</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                value={values.price}
                onChange={(event) => setFieldValue("price", event.target.value)}
                {...getFieldProps("price")}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={values.description}
                onChange={(event) =>
                  setFieldValue("description", event.target.value)
                }
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="outlined" color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!dirty}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddServicePopUp;
