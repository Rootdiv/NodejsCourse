import fs from 'node:fs';

// const result = fs.readFileSync('./files/text.txt', 'utf8');
// fs.readFile('./files/text.txt', 'utf8', (err, result) => {
//   if (err) {
//     throw err;
//   }

//   console.log('result: ', result);

//   fs.writeFile('./files/result.txt', result.toUpperCase(), err => {
//     if (err) {
//       throw err;
//     }

//     console.log('Файл был записан');

//     //fs.rename - переименованием и/или перемещение файла
//     fs.rename('./files/result.txt', './resultNew.txt', err => {
//       if (err) {
//         throw err;
//       }

//       console.log('Файл перемещён');
//     });
//   });
// });

//fs.writeFileSync('./files/result.txt', result);

fs.readdir('./files', (err, files) => {
  if (err) {
    throw err;
  }
  console.log('files: ', files);

  fs.mkdir('./newFolder', { recursive: true }, err => {
    if (err) {
      throw err;
    }
    console.log('Папка создана');

    files.forEach(file => {
      fs.copyFile(`./files/${file}`, `./newFolder/${file}`, err => {
        if (err) {
          throw err;
        }
        console.log(file, 'файл скопирован');
      });
    });
  });
});

console.log('App start');
