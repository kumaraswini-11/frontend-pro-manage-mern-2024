import { format, compareAsc, formatDate } from "date-fns";

// Function to format the date
export const getFormattedDate = (dateFormat, date) => {
  let formattedDate = "";

  if (dateFormat === "1") {
    const dayOfMonth = format(date, "do");
    const monthYear = format(date, "MMM, yyyy");
    formattedDate = `${dayOfMonth} ${monthYear}`;
  } else {
    formattedDate = format(date, "MMM do");
  }

  return formattedDate;
};
