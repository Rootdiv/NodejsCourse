import { Buffer } from 'node:buffer';
import { read } from './modules/read.js';
import { write } from './modules/write.js';

const app = async () => {
  try {
    const data = await read('./files/text.txt');
    console.log('data: ', data);
    // const bufferUnsafe = Buffer.allocUnsafe(1024);
    // console.log('bufferUnsafe: ', bufferUnsafe);

    // const bufferSafe = Buffer.alloc(1024, 'Изучаем Node.js');
    // console.log('bufferSafe: ', bufferSafe);

    // const buffer = Buffer.allocUnsafe(3);
    // buffer.write('!!!');
    // const bufferArr1 = Buffer.from([78, 111, 100, 101, 46, 106, 115]);
    // const bufferArr2 = Buffer.from([32, 83, 117, 112, 101, 114]);
    // console.log('bufferArr1: ', bufferArr1);
    // console.log('bufferArr2: ', bufferArr2);
    // const bufferArr = Buffer.concat([bufferArr1, bufferArr2, buffer]);
    // console.log(Array.from(bufferArr));
    // console.log('bufferArr: ', bufferArr.toString('utf-8'));

    // const bufferStr1 = Buffer.from('Изучаем Node.js');
    // const bufferStr2 = Buffer.from('Изучаем Nodejs');
    // console.log(bufferStr1.equals(bufferStr2));

    const bufferStr = Buffer.from('Изучаем Buffer в Node.js');
    console.log(bufferStr.toString('utf-8', 15, 19));
    console.log(bufferStr.indexOf('Node'));
    const n = bufferStr.indexOf('Node');
    console.log(bufferStr.toString('utf-8', n, n + 5));
    console.log(bufferStr.includes('uff'));
    console.log(bufferStr.includes('stuff'));
    console.log(bufferStr.subarray(n).toString());
    console.log(bufferStr.toJSON());
    console.log(Buffer.isBuffer(bufferStr));

    await write('./files/result.txt', bufferStr);
    console.log('Файл создан');
  } catch (err) {
    console.log('error: ', err);
  }
};

app();
