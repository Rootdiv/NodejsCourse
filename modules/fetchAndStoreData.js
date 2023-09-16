import { fetchTickersData } from './dataModules/fetchTickersData.js';
import { createTimestampedData } from './dataModules/createTimestampedData.js';
import { storeQuotesData } from './dataModules/storeQuotesData.js';

export const fetchAndStoreData = async tickers => {
  const tickersData = await fetchTickersData(tickers);
  console.log('tickersData:', tickersData);
  const timestampedData = createTimestampedData(tickersData);
  storeQuotesData(timestampedData);
};
