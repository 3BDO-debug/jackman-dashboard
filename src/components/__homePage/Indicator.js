import React from "react";
// material
import { Box, Stack, Typography } from "@mui/material";

// ---------------------------------------------------------------

function Indicator({ variant, label }) {
  const variantColor = () => {
    let color;

    if (variant === "success") {
      color = "#0ED66A";
    } else if (variant === "error") {
      color = "#F24F4F";
    } else if (variant === "secondary") {
      color = "#496360";
    }

    return color;
  };

  return (
    <Stack direction="row" alignItems="center" sx={styles.wrapper}>
      {/* Variant */}
      <Box sx={{ ...styles.indicatorType, backgroundColor: variantColor() }} />
      {/* Label */}
      <Typography variant="body2" color="secondary">
        {label}
      </Typography>
    </Stack>
  );
}

const styles = {
  wrapper: {
    marginRight: "16px",
  },
  indicatorType: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "15px",
  },
};

export default Indicator;
