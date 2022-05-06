import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
// material
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { loginRequest } from "../../__apis__/auth";

// -----------------------------------------------------------------------------

function LoginForm() {
  const setAlert = useSetRecoilState(alertAtom);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email. e.g( jackman@admin.com )")
        .required("Email cannot be empty"),
      password: Yup.string().required("Password cannot be empty"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await loginRequest(values)
        .then((response) => {
          console.log("hustle", response);
          setAlert({
            status: "open",
            variant: "success",
            message: "Logged in successfully.",
          });
          navigate("/home");
        })
        .catch((error) =>
          setAlert({
            status: "open",
            variant: "error",
            message: "Wrong email or password.",
          })
        );

      setSubmitting(false);
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    dirty,
  } = formik;

  return (
    <Box sx={styles.wrapper}>
      {/* Container */}
      <Box sx={styles.container}>
        {/* Title */}
        <Typography
          sx={{ fontSize: "40px", fontWeight: 700, marginBottom: "20px" }}
          color="#5E605F"
        >
          Sign In
        </Typography>
        {/* Email */}
        <TextField
          value={values.email}
          onChange={(event) => setFieldValue("email", event.target.value)}
          label="Email"
          {...getFieldProps("email")}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          fullWidth
        />
        {/* Password */}
        <Box sx={styles.fieldWrapper}>
          <TextField
            value={values.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
            {...getFieldProps("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "ant-design:eye-invisible-outlined"
                          : "akar-icons:eye"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* Action */}
        <LoadingButton
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!dirty}
          size="large"
          variant="contained"
          fullWidth
        >
          Sign In
        </LoadingButton>
      </Box>
    </Box>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: { xs: 0, sm: 0, md: "25vh", lg: "25vh", xl: "25vh" },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "400px",
    alignItems: "center",
    marginBottom: "20px",
  },
  fieldWrapper: {
    marginTop: "20px",
    width: "100%",
    marginBottom: "30px",
  },
};

export default LoginForm;
