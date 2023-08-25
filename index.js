import { readdir, mkdir, copyFile, stat } from 'node:fs/promises';

const logCopy = message => {
  if (message) {
    console.error('Произошла ошибка:', message);
  }
};

const copyFolder = async (sourceDir, targetDir, callback) => {
  let message = null;
  if (sourceDir.trim() === '' || targetDir.trim() === '') {
    message = 'Не указана целевая папка или папка назначения';
    return;
  } else if (sourceDir.startsWith(' ') || sourceDir.endsWith(' ')) {
    message = 'Целевая папка начинаются с пробела или закачиваются пробелом';
    return;
  } else if (targetDir.startsWith(' ') || targetDir.endsWith(' ')) {
    message = 'Папка назначения начинаются с пробела или закачиваются пробелом';
    return;
  }
  try {
    const folderList = await readdir(sourceDir);
    await mkdir(targetDir, { recursive: true });
    folderList.forEach(async item => {
      const stats = await stat(`${sourceDir}/${item}`);
      if (stats.isFile()) {
        await copyFile(`${sourceDir}/${item}`, `${targetDir}/${item}`);
      } else if (stats.isDirectory()) {
        copyFolder(`${sourceDir}/${item}`, `${targetDir}/${item}`, callback);
      } else {
        message = 'неизвестный тип';
        return;
      }
    });
  } catch (error) {
    message = error;
  }
  callback(message);
};

copyFolder('./files', './newFolder', logCopy);
