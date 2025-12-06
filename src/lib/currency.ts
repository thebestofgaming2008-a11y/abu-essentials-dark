// Currency formatting utility for Indian Rupees
export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const formatPriceShort = (price: number): string => {
  return `₹${price}`;
};

export const CURRENCY_SYMBOL = "₹";
