import React from "react";
// material
import { Box, Typography } from "@mui/material";

// ---------------------------------------------------------------------------

function PageIntro({ title, titleColor }) {
  return (
    <Box>
      {/* Intro */}
      <Box sx={{ marginTop: "15px" }}>
        <Typography variant="body1" color="secondary">
          Your ID: 13647832648
        </Typography>
      </Box>
      {/* Title */}
      <Box sx={{ marginTop: "15px" }}>
        <Typography variant="h6" color={titleColor}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default PageIntro;
