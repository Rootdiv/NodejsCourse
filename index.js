import { Buffer } from 'node:buffer';

const textToBuffer = (text, encoding) => Buffer.from(text, encoding);

const bufferToText = (buffer, encoding) => Buffer.from(buffer, encoding).toString('utf8');

//Проверка решения
const text = 'Привет мир!';
const utf8Buffer = textToBuffer(text, 'utf8');
console.log(utf8Buffer);
const decodedText = bufferToText(utf8Buffer, 'utf8');
console.log(decodedText);

const text2 = 'SGVsbG8gV29ybGQh';
const base64Buffer = textToBuffer(text2, 'base64');
console.log(base64Buffer);
const decodedText2 = bufferToText(base64Buffer, 'base64');
console.log(decodedText2);
