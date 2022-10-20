import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
// material
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { dealerSupportedCarsDeleter } from "../../__apis__/dealers";
// utils
import {
  dealerCarsColumnsGenerator,
  dealerCarsRowsMocker,
} from "../../utils/dealersDataMocker";

// -----------------------------------------------------------------------------

function DealerCars({ refreshData }) {
  const dealerInfo = useRecoilValue(triggeredDealerAtom);

  const [tableData, setTableData] = useState([]);
  const setAlert = useSetRecoilState(alertAtom);
  const [deletingDealerSupportedCar, setDeletingDealerSupportedCar] =
    useState(false);
  const [dealerCarToDelete, setDealerCarToDelete] = useState(null);

  const deleteDealerSupportedCar = useCallback(
    async (manufacturerId) => {
      setDeletingDealerSupportedCar(true);
      setDealerCarToDelete(manufacturerId);
      const requestData = {
        manId: manufacturerId,
        dealerId: dealerInfo.id,
      };
      await dealerSupportedCarsDeleter(requestData)
        .then(() =>
          setAlert({
            status: "open",
            variant: "success",
            message: "Dealer car removed successfully",
          })
        )
        .catch((error) => {
          console.log("Error deleting dealer car", error);
          setAlert({
            status: "open",
            variant: "error",
            message: "Something wrong happened",
          });
        });
      await refreshData();
      setDeletingDealerSupportedCar(false);
    },
    [dealerInfo]
  );

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
            columns={dealerCarsColumnsGenerator(
              deleteDealerSupportedCar,
              deletingDealerSupportedCar,
              dealerCarToDelete
            )}
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
