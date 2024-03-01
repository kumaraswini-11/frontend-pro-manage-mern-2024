const truncateTitle = (title, maxLength) => {
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

export default truncateTitle;
