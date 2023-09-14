import { API_URL } from './const.js';
import { fetchUrlAsync } from './dataModules/fetchUrlAsync.js';

const TICKERS_URL = 'data/all/coinlist?summary=true';

export const fetchValidTickers = async () => {
  try {
    const url = `${API_URL}${TICKERS_URL}`;
    const data = await fetchUrlAsync(url);
    return Object.keys(JSON.parse(data).Data);
  } catch (err) {
    console.error(`Ошибка при получении данных: ${err.message}`);
  }
};
