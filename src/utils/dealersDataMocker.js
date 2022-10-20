import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

// ----------------------------------------------------------------------------------------

export const dealersColumnsGenerator = (
  deletingDealer,
  deleteDealer,
  navigateDealer,
  setTriggeredDealer
) => [
  {
    name: "id",
    label: "ID",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "phoneNumber1",
    label: "Phone Number 1",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "phoneNumber2",
    label: "Phone Number 2",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "location",
    label: "Location",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "image",
    label: "Image",
    options: {
      download: false,
      filter: false,
      print: false,
      searchable: false,
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => <Avatar src={value} />,
    },
  },
  {
    name: "actions",
    label: "Actions",
    options: {
      download: false,
      filter: false,
      print: false,
      searchable: false,
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Box sx={{ display: "flex", flex: 1 }}>
          <IconButton
            onClick={() => {
              setTriggeredDealer(value);
              navigateDealer(value?.id);
            }}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton
            disabled={deletingDealer.deleting}
            onClick={() => deleteDealer(value?.id)}
          >
            {deletingDealer.dealerId === value && deletingDealer.deleting ? (
              <CircularProgress size="20px" />
            ) : (
              <DeleteIcon color="error" />
            )}
          </IconButton>
        </Box>
      ),
    },
  },
];

export const dealersRowsMocker = (dealersData) => {
  const mappedRows = dealersData.map((dealer) => ({
    id: dealer?.id,
    name: dealer?.name,
    phoneNumber1: dealer?.phoneNumber1 || "Not available",
    phoneNumber2: dealer?.phoneNumber2 || "Not available",
    location: dealer?.location,
    image: dealer?.image,
    actions: dealer,
  }));

  return mappedRows;
};

export const dealerServicesColumnsGenerator = (
  deleteDealerService,
  deletingService,
  dealerServiceToDelete
) => [
  {
    name: "id",
    label: "ID",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "price",
    label: "Price",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "description",
    label: "Description",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "action",
    label: "Action",
    options: {
      download: false,
      filter: false,
      print: false,
      searchable: false,
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <>
          {deletingService && dealerServiceToDelete === value ? (
            <CircularProgress size="20px" />
          ) : (
            <IconButton
              onClick={() => deleteDealerService(value)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
    },
  },
];

export const dealerServicesRowMocker = (dealerServices) => {
  const mappedRows = dealerServices.map((dealerService) => ({
    id: dealerService.id,
    name: dealerService.name,
    price: dealerService.price || "Price not available",
    description: dealerService.description || "Description not available",
    action: dealerService.id,
  }));

  return mappedRows;
};

export const dealerCarsColumnsGenerator = (
  deleteDealerSupportedCar,
  deletingDealerSupportedCar,
  dealerCarToDelete
) => [
  {
    name: "id",
    label: "ID",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
          {value}
        </Typography>
      ),
    },
  },
  {
    name: "logo",
    label: "Logo",
    options: {
      download: false,
      filter: false,
      print: false,
      searchable: false,
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => {
        <Avatar
          variant="circular"
          src={value}
          sx={{ width: "20px", height: "20px" }}
        />;
      },
    },
  },
  {
    name: "action",
    label: "Action",
    options: {
      download: false,
      filter: false,
      print: false,
      searchable: false,
      customHeadLabelRender: (cellData) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {cellData.label}
        </Typography>
      ),
      customBodyRender: (value) => (
        <>
          {deletingDealerSupportedCar && dealerCarToDelete === value ? (
            <CircularProgress size="20px" />
          ) : (
            <IconButton
              onClick={() => deleteDealerSupportedCar(value)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
    },
  },
];

export const dealerCarsRowsMocker = (dealerCars) => {
  const mappedRows = dealerCars.map((dealerCar) => ({
    id: dealerCar.id,
    name: dealerCar.name,
    logo: dealerCar.logo || null,
    action: dealerCar.id,
  }));

  return mappedRows;
};
