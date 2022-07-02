// material
import {
  Button,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//
import { dateFormatter } from "./dateFormatter";

// --------------------------------------------------------------------------------------------

export const bookingsColumnsGenerator = (
  isPendingRequestsPage,
  actionsCallbacks
) => {
  const data = [
    {
      name: "fullname",
      label: "Full name",
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
      name: "phoneNumber",
      label: "Phone number",
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
      name: "userLocation",
      label: "User location",
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
      name: "reservationType",
      label: "Reservation type",
      options: {
        customHeadLabelRender: (cellData) => (
          <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
            {cellData.label}
          </Typography>
        ),
        customBodyRender: (value) => (
          <Chip label={value} variant="filled" color="primary" />
        ),
      },
    },
    {
      name: "carType",
      label: "Car type",
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
      name: "dealerLocation",
      label: "Dealer location",
      options: {
        customHeadLabelRender: (cellData) => (
          <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
            {cellData.label}
          </Typography>
        ),
        customBodyRender: (value) => (
          <Link target="__blank" href={value}>
            {value}
          </Link>
        ),
      },
    },
    {
      name: "dealerName",
      label: "Dealer name",
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
      name: "reservationDates",
      label: "Reservation dates",
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
        customBodyRender: (value) => {
          let context;
          if (isPendingRequestsPage) {
            context = (
              <Stack direction="row" alignItems="center">
                {/* Accept booking */}
                <Button
                  color="success"
                  variant="text"
                  onClick={() => actionsCallbacks?.acceptCallback(value)}
                >
                  Accept
                </Button>
                {/* Reject booking */}
                <Button
                  color="error"
                  variant="text"
                  onClick={() => actionsCallbacks?.rejectCallback(value)}
                >
                  Reject
                </Button>
                {/* Delete booking */}
                <IconButton
                  onClick={() => actionsCallbacks?.deleteCallback(value)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            );
          } else {
            context = (
              <IconButton
                onClick={() => actionsCallbacks?.deleteCallback(value)}
              >
                <DeleteIcon />
              </IconButton>
            );
          }
          return context;
        },
      },
    },
  ];

  return data;
};

const renderReservationDates = (booking) => {
  let reservationDates;

  if (booking?.status === "pending") {
    reservationDates = `${dateFormatter(
      booking?.requestedDate1
    )}-${dateFormatter(booking?.requestedDate2)}-${dateFormatter(
      booking?.requestedDate3
    )}`;
  } else if (booking?.status === "approved") {
    reservationDates = `${dateFormatter(booking?.selectedDate)}`;
  } else if (booking?.status === "rejected") {
    reservationDates = `${dateFormatter(
      booking?.suggestedDates[0]
    )}-${dateFormatter(booking?.suggestedDates[1])}-${dateFormatter(
      booking?.suggestedDates[2]
    )}`;
  }

  return reservationDates;
};

export const bookingsRowsMocker = (bookingsData) => {
  const mappedRows = bookingsData.map((booking) => ({
    fullname: booking?.client?.name,
    phoneNumber: booking?.client?.phoneNumber,
    userLocation: booking?.locationName || "Location not specified",
    reservationType: booking?.bookingType,
    carType: booking?.car?.carType || "Car not specified",
    dealerLocation: booking?.dealer?.location,
    dealerName: booking?.dealer?.name,
    reservationDates: renderReservationDates(booking),
    actions: booking?.id,
  }));

  return mappedRows;
};
