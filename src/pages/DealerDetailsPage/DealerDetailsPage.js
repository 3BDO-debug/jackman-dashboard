import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
// material
import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// layouts
import MainLayout from "../../layouts/MainLayout";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
// __apis__
import { dealerInfoFetcher } from "../../__apis__/dealers";
// components
import DealerInfo from "../../components/__dealerDetailsPage/DealerInfo";
import DealerServices from "../../components/__dealerDetailsPage/DealerServices";
import AddServicePopUp from "../../components/__dealerDetailsPage/AddServicePopUp";
import DealerCars from "../../components/__dealerDetailsPage/DealerCars";
import AddSupportedCarsPopUp from "../../components/__dealerDetailsPage/AddSupportedCarsPopUp";

// --------------------------------------------------------------------------

function DealerDetailsPage() {
  const [dealerInfo, setDealerInfo] = useRecoilState(triggeredDealerAtom);
  const { dealerId } = useParams();

  const [addService, triggerAddService] = useState(false);
  const [addSupportedCars, triggerSupportedCars] = useState(false);

  const fetchDealerInfo = useCallback(async () => {
    dealerInfoFetcher(dealerId)
      .then((response) => {
        setDealerInfo(response.result);
      })
      .catch((error) => {
        console.log("Error fetching dealer info", error);
      });
  }, [dealerId, setDealerInfo]);

  useEffect(() => {
    fetchDealerInfo();
  }, [fetchDealerInfo]);

  return (
    <MainLayout>
      <Grid container marginTop={3} spacing={3}>
        {/* Title */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ justifySelf: "center" }}
            color="primary"
          >
            {dealerInfo?.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={() => triggerSupportedCars(true)}
              startIcon={<AddIcon />}
              variant="outlined"
              sx={{
                mr: 2,
                mb: {
                  xs: 2,
                  md: 0,
                },
              }}
            >
              Add Supported cars
            </Button>
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
          <DealerServices refreshData={fetchDealerInfo} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DealerCars refreshData={fetchDealerInfo} />
        </Grid>
      </Grid>
      <AddServicePopUp
        isTriggered={addService}
        closeHandler={() => triggerAddService(false)}
        refreshData={fetchDealerInfo}
      />
      <AddSupportedCarsPopUp
        isTriggered={addSupportedCars}
        closeHandler={() => triggerSupportedCars(false)}
        refreshData={fetchDealerInfo}
      />
    </MainLayout>
  );
}

export default DealerDetailsPage;
