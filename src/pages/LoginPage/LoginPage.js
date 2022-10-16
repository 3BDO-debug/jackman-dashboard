import React from "react";
// material
import { Box, Grid, Paper } from "@mui/material";
// components
import HeroWrapper from "../../components/__loginPage/HeroWrapper";
import LoginForm from "../../components/__loginPage/LoginForm";

// -----------------------------------------------------------------------------------------

function LoginPage() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        sx={{
          marginTop: {
            xs: "20vh",
            sm: "15vh",
            md: "2vh",
            lg: "2vh",
            xl: "2vh",
          },
          width: {
            xs: "90%",
            sm: "60%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
          padding: { xs: 3, sm: 3, md: 0, lg: 0 },
        }}
      >
        <Grid container spacing={3} padding={0}>
          {/* Left side wrapper */}
          <Grid
            item
            lg={6}
            xl={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
                xl: "flex",
              },
            }}
          >
            <HeroWrapper />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            justifyContent="center"
            alignItems="center"
          >
            <LoginForm />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default LoginPage;
