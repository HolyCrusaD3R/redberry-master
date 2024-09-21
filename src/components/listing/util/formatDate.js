export default function formatDate(dateString) {
  if (!dateString) return "არ მოიძებნა";

  const date = new Date(dateString);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Adds leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

  // Format the date as DD/MM/YY
  return `${day}/${month}/${year}`;
}
