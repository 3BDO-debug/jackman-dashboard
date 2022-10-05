import React, { useState } from "react";
import { useRecoilValue } from "recoil";
// material
import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// layouts
import MainLayout from "../../layouts/MainLayout";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
// components
import DealerInfo from "../../components/__dealerDetailsPage/DealerInfo";
import DealerServices from "../../components/__dealerDetailsPage/DealerServices";
import AddServicePopUp from "../../components/__dealerDetailsPage/AddServicePopUp";
import DealerCars from "../../components/__dealerDetailsPage/DealerCars";

// --------------------------------------------------------------------------

function DealerDetailsPage() {
  const dealerInfo = useRecoilValue(triggeredDealerAtom);

  const [addService, triggerAddService] = useState(false);

  return (
    <MainLayout>
      <Grid container marginTop={3} spacing={3}>
        {/* Title */}
        <Grid item xs={6}>
          <Typography
            variant="h6"
            sx={{ justifySelf: "center" }}
            color="primary"
          >
            {dealerInfo?.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => triggerAddService(true)}
            >
              Add service
            </Button>
            {/*  <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => triggerAddService(true)}
              sx={{ ml: 1 }}
            >
              Add supported cars
            </Button> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DealerInfo />
        </Grid>
        <Grid item xs={12} md={8}>
          <DealerServices />
        </Grid>
        <Grid item xs={12} md={4}>
          <DealerCars />
        </Grid>
      </Grid>
      <AddServicePopUp
        isTriggered={addService}
        closeHandler={() => triggerAddService(false)}
      />
    </MainLayout>
  );
}

export default DealerDetailsPage;
