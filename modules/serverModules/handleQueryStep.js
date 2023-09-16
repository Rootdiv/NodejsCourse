export const handleQueryStep = (res, quotesData, queryStep) => {
  const step = parseInt(queryStep);

  if (step && step > 0) {
    const lastValuesData = {};
    Object.keys(quotesData).forEach(ticker => {
      const values = quotesData[ticker];
      const slicedValues = values.slice(-step);
      lastValuesData[ticker] = step < values.length ? slicedValues : values;
    });
    res.end(JSON.stringify(lastValuesData));
    return;
  }

  res.end(JSON.stringify(quotesData));
};
