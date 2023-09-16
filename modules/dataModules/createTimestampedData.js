import { TSYMS } from '../const.js';

export const createTimestampedData = tickersData => {
  const timestampedData = {};
  const timestamp = Date.now();

  const tsyms = TSYMS.split(',');

  for (const currency in tickersData) {
    timestampedData[currency] = {
      timestamp,
    };

    tsyms.forEach(tsym => {
      timestampedData[currency][`price_${tsym}`] = tickersData[currency][tsym];
    });
  }
  return timestampedData;
};
