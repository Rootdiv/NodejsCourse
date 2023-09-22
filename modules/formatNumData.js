export const formatNumData = data => {
  const discount = parseInt(data.discount) >= 0 ? parseInt(data.discount) : 0;
  const price = parseFloat(data.price) > 0 ? parseFloat(data.price) : 0;
  const count = parseInt(data.count) > 0 ? parseInt(data.count) : 0;

  return {
    discount,
    price,
    count,
  };
};
