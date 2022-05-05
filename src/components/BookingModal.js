import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
// atoms
import bookingModalAtom from "../recoil/atoms/bookingModalAtom";
// assets
import acceptIcon from "../assets/images/acceptIcon.png";
import rejectIcon from "../assets/images/rejectIcon.png";
import { LoadingButton } from "@mui/lab";

// --------------------------------------------------------------------------------------------------------------

function BookingModal() {
  const bookingModal = useRecoilValue(bookingModalAtom);
  const resetBookingModal = useResetRecoilState(bookingModalAtom);

  const confirmHandler = () => {
    let handler = bookingModal.confirmHandler;
    handler();
  };

  const closeHandler = () => {
    resetBookingModal();
  };

  return (
    <Dialog open={bookingModal.show} onClose={closeHandler}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            {/* Icon */}
            <Box
              component="img"
              src={bookingModal.variant === "error" ? rejectIcon : acceptIcon}
              sx={{ width: "100px", height: "100%" }}
              alt="icon"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* Title */}
            <Typography
              color={bookingModal.variant === "success" ? "#21D66A" : "#F24F4F"}
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              {bookingModal.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* Subtitle */}
            <Typography sx={{ textAlign: "center" }}>
              {bookingModal.bodyText}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box padding={2}>
          <Button
            variant="contained"
            color={bookingModal.variant === "error" ? "inherit" : "error"}
            sx={{ marginRight: 1 }}
          >
            <Typography color="black" variant="oulined">
              Disagree
            </Typography>
          </Button>
          <LoadingButton
            variant="contained"
            color="success"
            onClick={confirmHandler}
            loading={bookingModal.confirming}
            disabled={bookingModal.confirming}
          >
            <Typography color="white">Agree</Typography>
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default BookingModal;
