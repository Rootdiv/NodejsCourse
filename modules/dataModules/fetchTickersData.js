import { URL } from 'node:url';
import { API_URL, TSYMS } from '../const.js';
import { fetchUrlAsync } from './fetchUrlAsync.js';

const PRICE_URL = 'data/pricemulti';

export const fetchTickersData = async tickers => {
  try {
    const url = new URL(`${API_URL}${PRICE_URL}`);
    url.searchParams.set('tsyms', TSYMS);
    url.searchParams.set('fsyms', tickers);
    const data = await fetchUrlAsync(url);
    return JSON.parse(data);
  } catch (err) {
    console.error(`Ошибка при получении данных: ${err.message}`);
  }
};
