import React from "react";
// material
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
// assets
import emptyTable from "../assets/images/emptyTable.png";

// -----------------------------------------------------------------------------

const EmptyTable = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        maxWidth="200px"
        height="100%"
        component="img"
        src={emptyTable}
        alt="empty image"
      />
      <Typography>Sorry, We couldn’t find any results</Typography>
    </Box>
  );
};

// -----------------------------------------------------------------------------

function DataTable({ headerLabels, data }) {
  const dataExist = () => {
    let exist = false;

    if (data && data.length === 0) {
      exist = false;
    } else if (!data) {
      exist = false;
    } else if (data && data.length > 0) {
      exist = true;
    }

    return exist;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <TableContainer component={Box}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerLabels.map((headerLabel, index) => (
                <TableCell key={index}>
                  <Typography sx={styles.headerTypography}>
                    {headerLabel}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody></TableBody>
        </Table>
      </TableContainer>
      {!dataExist() && (
        <Box paddingTop={10} paddingBottom={10}>
          <EmptyTable />
        </Box>
      )}
    </Box>
  );
}

const styles = {
  headerTypography: {
    fontWeight: 700,
    fontSize: "14px",
  },
  bodyTypography: {
    fontWeight: 400,
    fontSize: "13px",
  },
};

export default DataTable;
