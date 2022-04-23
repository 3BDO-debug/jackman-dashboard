import React, { useState } from "react";
import { Icon } from "@iconify/react";
// material
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// components
import { MotionViewport, varSlide } from "./animate";
import SideNavContent from "./SideNavContent";

function SideNav() {

  return (
    <MotionViewport variants={varSlide().inRight} sx={{ marginRight: "270px" }}>
      <Paper elevation={0} sx={styles.wrapper}>
        {/* Nav content */}
        <SideNavContent />
      </Paper>
    </MotionViewport>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
  },
};

export default SideNav;
