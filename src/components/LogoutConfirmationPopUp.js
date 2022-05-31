import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
// material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
// atoms
import logoutConfirmationPopUpAtom from "../recoil/atoms/logoutConfirmationPopUpAtom";
import alertAtom from "../recoil/atoms/alertAtom";
// __apis__
import { logoutRequest } from "../__apis__/auth";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------------

function LogoutConfirmationPopUp() {
  const [logoutConfirmationPopUp, triggerLogoutConfirmationPopUp] =
    useRecoilState(logoutConfirmationPopUpAtom);
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(alertAtom);
  const [loggingOut, setLoggingOut] = useState(false);

  const closeHandler = () => {
    triggerLogoutConfirmationPopUp(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutRequest()
      .then(() => {
        navigate("/login");
        setAlert({
          status: "open",
          variant: "success",
          message: "Logged out successfully.",
        });
      })
      .catch(() =>
        setAlert({
          status: "open",
          variant: "error",
          message: "Sorry!, we couldnt process your request at the moment.",
        })
      );
    triggerLogoutConfirmationPopUp(false);
    setLoggingOut(false);
  };

  return (
    <Dialog open={logoutConfirmationPopUp} onClose={closeHandler}>
      <DialogTitle>Attention!</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Log out ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <LoadingButton
          variant="contained"
          color="error"
          onClick={handleLogout}
          loading={loggingOut}
          disabled={loggingOut}
        >
          Log me out
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutConfirmationPopUp;
