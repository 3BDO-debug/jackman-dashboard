import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
// material
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// __apis__
import { dealerAdder } from "../../__apis__/dealers";
// atoms
import alertAtom from "../../recoil/atoms/alertAtom";

// --------------------------------------------------------------------

function AddDealerPopUp({ isTriggered, closeHandler, fetchDealers }) {
  const setAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber1: "",
      phoneNumber2: "",
      location: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phoneNumber1: Yup.number().required("Phone number 1 is required"),
      phoneNumber2: Yup.number().required("Phone number 2 is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await dealerAdder(values)
        .then(async () => {
          await fetchDealers();
          setAlert({
            status: "open",
            variant: "success",
            message: "Dealer added successfully",
          });
        })
        .catch((error) => {
          console.log("Error adding dealer", error);
          setAlert({
            status: "open",
            variant: "error",
            message: "Something wrong happened",
          });
        });
      resetForm();
      setSubmitting(false);
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    errors,
    touched,
    dirty,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add dealer</DialogTitle>
      <DialogContent>
        <Box marginTop={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={values.name}
                onChange={(event) => setFieldValue("name", event.target.value)}
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone number 1"
                value={values.phoneNumber1}
                onChange={(event) =>
                  setFieldValue("phoneNumber1", event.target.value)
                }
                {...getFieldProps("phoneNumber1")}
                error={Boolean(touched.phoneNumber1 && errors.phoneNumber1)}
                helperText={touched.phoneNumber1 && errors.phoneNumber1}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone number 2"
                value={values.phoneNumber2}
                onChange={(event) =>
                  setFieldValue("phoneNumber2", event.target.value)
                }
                {...getFieldProps("phoneNumber2")}
                error={Boolean(touched.phoneNumber2 && errors.phoneNumber2)}
                helperText={touched.phoneNumber2 && errors.phoneNumber2}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                value={values.location}
                onChange={(event) =>
                  setFieldValue("location", event.target.value)
                }
                {...getFieldProps("location")}
                error={Boolean(touched.location && errors.location)}
                helperText={touched.location && errors.location}
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
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ float: "right" }}>
        <Button color="error" variant="outlined" onClick={closeHandler}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          disabled={!dirty}
          onClick={handleSubmit}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddDealerPopUp;
