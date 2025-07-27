export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};
