import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// material
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
// utils
import {
  dealerServicesColumnsGenerator,
  dealerServicesRowMocker,
} from "../../utils/dealersDataMocker";

// ----------------------------------------------------------------------------------------------

function DealerServices() {
  const dealerInfo = useRecoilValue(triggeredDealerAtom);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (dealerInfo) {
      setTableData(dealerServicesRowMocker(dealerInfo?.services));
    }
  }, [dealerInfo]);

  return (
    <Box>
      <Card elevation={5}>
        <CardHeader title="Dealer's services" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MUIDataTable
                columns={dealerServicesColumnsGenerator()}
                data={tableData}
                options={{
                  selectableRowsHideCheckboxes: true,
                  elevation: 0,
                  downloadOptions: {
                    filterOptions: {
                      useDisplayedRowsOnly: true,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DealerServices;
