import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
// material
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { dealerServiceDeleter } from "../../__apis__/dealers";
// utils
import {
  dealerServicesColumnsGenerator,
  dealerServicesRowMocker,
} from "../../utils/dealersDataMocker";

// ----------------------------------------------------------------------------------------------

function DealerServices({ refreshData }) {
  const dealerInfo = useRecoilValue(triggeredDealerAtom);
  const [tableData, setTableData] = useState([]);
  const [deletingService, setDeletingService] = useState(false);
  const setAlert = useSetRecoilState(alertAtom);
  const [dealerServiceToDelete, setDealerServiceToDelete] = useState(null);

  const deleteDealerService = useCallback(async (serviceId) => {
    setDeletingService(true);
    setDealerServiceToDelete(serviceId);
    const requestData = {
      serviceId: serviceId,
    };
    await dealerServiceDeleter(requestData)
      .then(() => {
        setAlert({
          status: "open",
          variant: "success",
          message: "Successfully deleted service",
        });
      })
      .catch((error) => {
        console.log("Error deleting dealer service", error);
        setAlert({
          status: "open",
          variant: "error",
          message: "Something wrong happened",
        });
      });
    await refreshData();
    setDeletingService(false);
  }, []);

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
                columns={dealerServicesColumnsGenerator(
                  deleteDealerService,
                  deletingService,
                  dealerServiceToDelete
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DealerServices;
