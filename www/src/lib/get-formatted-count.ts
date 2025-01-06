export const getFormattedCount = (count: string) => {
  const number = parseInt(count, 10);
  if (isNaN(number)) return "N/A";
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};
