import React from "react";
import { Icon } from "@iconify/react";
// material
import { Box, IconButton, InputBase, InputAdornment } from "@mui/material";

// ---------------------------------------------------------

function SearchField({ searchState, onSearchHandler }) {
  const [searchQuery, setSearchQuery] = searchState;
  return (
    <Box
      padding="17px"
      bgcolor="white"
      borderRadius="17px"
      display="flex"
      alignItems="center"
      component={InputBase}
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery(event.target.value);
        onSearchHandler();
      }}
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
