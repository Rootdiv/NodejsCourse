import { parse, format } from 'node:url';
import { stringify, parse as paresQueryString } from 'node:querystring';
//import { parse, format, resolve } from 'node:url';

const baseUrl = 'https://rootdiv.ru/path/file.html';

const queryParams = { user: 'vladimir', pass: '12345' };
const myQueryString = stringify(queryParams);
console.log('myQueryString:', myQueryString);

const myUrl = format({
  pathname: baseUrl,
  search: `?${myQueryString}`,
  hash: 'good',
});

console.log({ myUrl });

// const myUrl = 'https://rootdiv.ru/path/file.html?user=vladimir&pass=123#order';

const parsedUrl = parse(myUrl);
console.log('parsedUrl:', parsedUrl);
console.log('paresQueryString:', paresQueryString(parsedUrl.query));

// const urlParams = {
//   protocol: 'https:',
//   host: 'rootdiv.ru',
//   hostname: 'rootdiv.ru',
//   hash: '#order',
//   search: '?user=vladimir&pass=123',
//   pathname: '/path/file.html',
// };

// const formattedUrl = format(urlParams);
// console.log('formattedUrl:', formattedUrl);

// const baseUrl = 'https://rootdiv.ru';
// const urlPath = 'path/file.html';
// const resolveUrl = resolve(baseUrl, urlPath);
// console.log('resolveUrl:', resolveUrl);
