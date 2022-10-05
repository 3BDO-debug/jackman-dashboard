import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
// material
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
// utils
import {
  dealerCarsColumnsGenerator,
  dealerCarsRowsMocker,
} from "../../utils/dealersDataMocker";

// -----------------------------------------------------------------------------

function DealerCars() {
  const dealerInfo = useRecoilValue(triggeredDealerAtom);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (dealerInfo) {
      setTableData(dealerCarsRowsMocker(dealerInfo.manufacturers));
    }
  }, [dealerInfo]);

  return (
    <Box>
      <Card elevation={5}>
        <CardHeader title="Dealer's cars" />
        <CardContent>
          <MUIDataTable
            columns={dealerCarsColumnsGenerator()}
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
        </CardContent>
      </Card>
    </Box>
  );
}

export default DealerCars;
