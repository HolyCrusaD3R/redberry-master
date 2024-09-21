export default function formatPhoneNumber(phone) {
  // Add a space after every 3 digits
  return phone.toString().replace(/(\d{3})(?=\d)/g, "$1 ");
}
