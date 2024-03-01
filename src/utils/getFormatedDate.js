import { format, compareAsc, formatDate } from "date-fns";

// Function to format the date
export const getFormattedDate = (dateFormat, date) => {
  let formattedDate = "";

  if (!date || isNaN(new Date(date).getTime())) {
    return "";
  }

  if (dateFormat === "1") {
    const dayOfMonth = format(date, "do");
    const monthYear = format(date, "MMM, yyyy");
    formattedDate = `${dayOfMonth} ${monthYear}`;
  } else if (dateFormat === "3") {
    formattedDate = format(new Date(date), "MM/dd/yyyy");
  } else {
    formattedDate = format(date, "MMM do");
  }

  return formattedDate;
};
