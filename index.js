import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

import { fetchData } from './modules/fetchData.js';
import { parseHTML } from './modules/parseHTML.js';

const options = {
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'User-Agent': 'MethedApp/1.0',
  },
};

const urlString = 'https://rootdiv.ru';
//Согласно документации url.parse считается устаревшим, по этому не использую его.
const parsedUrl = new URL(urlString);
options.hostname = parsedUrl.hostname;

const httpModule = parsedUrl.protocol === 'https:' ? https : http;

const data = await fetchData(httpModule, options);

parseHTML(data);
