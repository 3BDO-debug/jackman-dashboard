import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// material
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
// __apis__
import {
  dealerAvatarUploader,
  dealerInfoUpdater,
} from "../../__apis__/dealers";
import { cloudinaryUpload } from "../../__apis__/cloudinary";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// components
import UploadAvatar from "../UploadAvatar";
import { useRecoilValue, useSetRecoilState } from "recoil";

// ---------------------------------------------------------------

function DealerInfo() {
  const [dealerAvatar, setDealerAvatar] = useState(null);

  const dealerInfo = useRecoilValue(triggeredDealerAtom);
  const setAlert = useSetRecoilState(alertAtom);

  const [uploading, setUploading] = useState(false);
  const [initialMount, setInitialMount] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber1: "",
      phoneNumber2: "",
      location: "",
      description: "",
      dealerAvatar: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Dealer's name is required"),
      phoneNumber1: Yup.string().required("Dealer's phone number is required"),
      phoneNumber2: Yup.string().required("Dealer's phone number is required"),
      location: Yup.string().required("Dealer's location is required"),
      description: Yup.string().required("Dealer description is required"),
      dealerAvatar: Yup.mixed().required("Dealer's avatar is required "),
    }),
    onSubmit: async (values) => {
      const requestData = {
        dealerId: dealerInfo.id,
        name: values.name,
        phoneNumber1: values.phoneNumber1,
        phoneNumber2: values.phoneNumber2,
        location: values.location,
        description: values.description,
      };

      await dealerInfoUpdater(requestData)
        .then((response) => {
          setAlert({
            status: "open",
            variant: "success",
            message: "Dealer updated successfully",
          });
        })
        .catch((error) => {
          console.log("Error updating dealer info", error);
          setAlert({
            status: "open",
            variant: "error",
            message: "Something wrong happened",
          });
        });
    },
  });

  const {
    values,
    setFieldValue,
    errors,
    touched,
    dirty,
    handleSubmit,
    isSubmitting,
    getFieldProps,
  } = formik;

  const uploadDealerImage = useCallback(async () => {
    setUploading(true);
    const requestData = new FormData();
    requestData.append("file", values.dealerAvatar);
    requestData.append("upload_preset", "h9n6uj5b");
    await cloudinaryUpload(requestData)
      .then(async (response) => {
        await dealerAvatarUploader({
          dealerId: dealerInfo.id,
          url: response.url,
        }).then(() => {
          setAlert({
            status: "open",
            message: "Successfully uploaded dealer image",
            variant: "success",
          });
        });
      })
      .catch((error) => {
        console.log("Error uploading to cloudinary", error);
      });

    setUploading(false);
  }, [values.dealerAvatar, dealerInfo]);

  const handleDealerAvatarDrop = useCallback(
    (acceptedFiles) => {
      setInitialMount(1);
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("dealerAvatar", file);
        setDealerAvatar({
          ...file,
          preview: URL.createObjectURL(file),
        });
        uploadDealerImage();
      }
    },
    [setFieldValue, uploadDealerImage]
  );

  useEffect(() => {
    if (dealerInfo) {
      setFieldValue("name", dealerInfo.name);
      setFieldValue("phoneNumber1", dealerInfo.phoneNumber1);
      setFieldValue("phoneNumber2", dealerInfo.phoneNumber2);
      setFieldValue("location", dealerInfo.location);
      setFieldValue("description", dealerInfo.description);
      setFieldValue("dealerAvatar", dealerInfo.image);
      setDealerAvatar(dealerInfo.image);
    }
  }, [dealerInfo]);

  useEffect(() => {
    if (initialMount !== 0) {
      uploadDealerImage();
    }
  }, [values.dealerAvatar]);

  return (
    <Box marginTop={3}>
      <Card elevation={5}>
        <CardHeader title="Dealer info" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {uploading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <CircularProgress size="70px" />
                </Box>
              ) : (
                <UploadAvatar
                  accept="image/*"
                  file={dealerAvatar}
                  onDrop={handleDealerAvatarDrop}
                  error={Boolean(touched.dealerAvatar && errors.dealerAvatar)}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone Number 1"
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone Number 2"
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
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <LoadingButton
            variant="contained"
            sx={{ float: "right", marginLeft: "auto", mb: 2 }}
            startIcon={<SaveIcon />}
            disabled={!dirty}
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Update
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
}

export default DealerInfo;
