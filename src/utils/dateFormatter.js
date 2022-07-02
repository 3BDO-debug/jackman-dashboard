import moment from "moment";

export const dateFormatter = (date) => {
  const dateMoment = moment(date);
  return dateMoment.format("YYYY-MM-DD:hh:m");
};
