import React from "react";
import { Icon } from "@iconify/react";
// material
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  InputAdornment,
} from "@mui/material";

// ---------------------------------------------------------

function SearchField() {
  return (
    <Box
      padding="17px"
      bgcolor="white"
      borderRadius="17px"
      display="flex"
      alignItems="center"
      component={InputBase}
      placeholder="Search"
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <Icon icon="carbon:search" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default SearchField;
