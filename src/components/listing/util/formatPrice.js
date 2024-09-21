export function formatPrice(price, shouldHaveColumn = false) {
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  if (shouldHaveColumn) {
    // Replace space with a comma if shouldHaveColumn is true
    return formattedPrice.replace(/\s/g, ", ");
  }

  return formattedPrice;
}
