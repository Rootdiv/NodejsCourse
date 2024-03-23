import { fetchTickersData } from './dataModules/fetchTickersData.js';
import { createTimestampedData } from './dataModules/createTimestampedData.js';
import { storeQuotesData } from './dataModules/storeQuotesData.js';

export const fetchAndStoreData = async tickers => {
  const tickersData = await fetchTickersData(tickers);
  if (process.env.PROD !== 'true') {
    console.log('tickersData:', tickersData);
  }
  const timestampedData = createTimestampedData(tickersData);
  storeQuotesData(timestampedData);
};
