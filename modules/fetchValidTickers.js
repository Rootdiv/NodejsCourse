import { API_URL, API_KEY } from './const.js';
import { fetchUrlAsync } from './dataModules/fetchUrlAsync.js';

const TICKERS_URL = `data/all/coinlist?summary=true&api_key=${API_KEY}`;

export const fetchValidTickers = async () => {
  try {
    const url = `${API_URL}${TICKERS_URL}`;
    const data = await fetchUrlAsync(url);
    return Object.keys(JSON.parse(data).Data);
  } catch (err) {
    console.error(`Ошибка при получении данных: ${err.message}`);
  }
};
