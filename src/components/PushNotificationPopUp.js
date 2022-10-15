import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
// __apis__
import { notificationPusher } from "../__apis__/pushNotification";
// atoms
import pushNotificationPopUpAtom from "../recoil/atoms/pushNotificationPopUpAtom";
import alertAtom from "../recoil/atoms/alertAtom";
// components

// ----------------------------------------------------------------------------------------------

function PushNotificationPopUp() {
  const [pushNotification, triggerPushNotification] = useRecoilState(
    pushNotificationPopUpAtom
  );

  const setAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Notification title is required"),
      message: Yup.string().required("Notification message is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await notificationPusher(values)
        .then(() => {
          setAlert({
            status: "open",
            variant: "success",
            message: "Notification sent successfully",
          });
        })
        .catch((error) => {
          console.log("Error sending notification", error);
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
    isSubmitting,
    dirty,
    touched,
    getFieldProps,
    handleSubmit,
    errors,
  } = formik;

  const closeHandler = () => {
    triggerPushNotification(false);
  };

  return (
    <Dialog open={pushNotification} onClose={closeHandler} fullWidth>
      <DialogTitle>Send notification</DialogTitle>
      <DialogContent>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={values.title}
                onChange={(event) => setFieldValue("title", event.target.value)}
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                value={values.message}
                onChange={(event) =>
                  setFieldValue("message", event.target.value)
                }
                {...getFieldProps("message")}
                error={Boolean(touched.message && errors.message)}
                helperText={touched.message && errors.message}
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
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!dirty}
          endIcon={<SendIcon />}
        >
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default PushNotificationPopUp;
