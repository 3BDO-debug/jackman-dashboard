import React, { useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
// material
import { Box, Fab, Skeleton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import AddIcon from "@mui/icons-material/Add";
// __apis__
import { dealersFetcher, dealerDeleter } from "../../__apis__/dealers";
// layouts
import MainLayout from "../../layouts/MainLayout";
// atoms
import alertAtom from "../../recoil/atoms/alertAtom";
import triggeredDealerAtom from "../../recoil/atoms/triggeredDealerAtom";
// utils
import {
  dealersColumnsGenerator,
  dealersRowsMocker,
} from "../../utils/dealersDataMocker";
// components
import PageIntro from "../../components/PageIntro";
import AddDealerPopUp from "../../components/__dealersPage/AddDealerPopUp";

// ----------------------------------------------------------------------------------------

function DealersPage() {
  const [dealersData, setDealersData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [deletingDealer, setDeletingDealer] = useState(false);
  const setAlert = useSetRecoilState(alertAtom);
  const navigate = useNavigate();
  const setTriggeredDealer = useSetRecoilState(triggeredDealerAtom);
  const [addDealer, triggerAddDealer] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchDealers = useCallback(async () => {
    setFetching(true);
    await dealersFetcher()
      .then((dealersResponse) => {
        setDealersData(dealersResponse);
      })
      .catch((error) => {
        console.log("Error fetching dealers data", error);
      });
    setFetching(false);
  }, []);

  const navigateDealer = (dealerId) => {
    navigate(`/dealer-details/${dealerId}`);
  };

  const deleteDealer = useCallback(
    async (dealerId) => {
      setDeletingDealer({
        dealerId: dealerId,
        deleting: true,
      });
      await dealerDeleter({ dealerId: dealerId })
        .then(() => {
          setAlert({
            status: "open",
            variant: "success",
            message: "Deleted dealer successfully",
          });
          fetchDealers();
        })
        .catch((error) => {
          setAlert({
            status: "open",
            variant: "error",
            message: "Something wrong happened, please try again later.",
          });
          console.log("Error deleting dealer", error);
        });

      setDeletingDealer({
        dealerId: null,
        deleting: false,
      });
    },
    [setDeletingDealer]
  );

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  useEffect(() => {
    if (dealersData.length > 0) {
      setTableData(dealersRowsMocker(dealersData));
    }
  }, [dealersData]);

  return (
    <>
      <MainLayout>
        <PageIntro title="Dealers" titleColor="primary" />
        <Box marginTop="16px">
          {fetching ? (
            <Skeleton variant="rectangular" width="100%" height={500} />
          ) : (
            <MUIDataTable
              columns={dealersColumnsGenerator(
                deletingDealer,
                deleteDealer,
                navigateDealer,
                setTriggeredDealer
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
          )}
        </Box>
        <AddDealerPopUp
          isTriggered={addDealer}
          closeHandler={() => triggerAddDealer(false)}
          fetchDealers={() => fetchDealers()}
        />
      </MainLayout>
      <Box
        sx={{
          position: "sticky",
          bottom: "20px",
          display: "flex",
          width: "100",
          justifyContent: "flex-end",
          right: "100px",
        }}
      >
        <Fab
          onClick={() => triggerAddDealer(true)}
          color="primary"
          variant="extended"
        >
          <AddIcon sx={{ mr: 1 }} /> Add Dealer
        </Fab>
      </Box>
    </>
  );
}

export default DealersPage;
