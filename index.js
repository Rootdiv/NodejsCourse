import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import sharp from 'sharp';

const resizeImage = async (inputPath, outputPath) => {
  const rStream = createReadStream(inputPath);
  const wStream = createWriteStream(outputPath);
  const resized = sharp().resize(400, 400).toFormat('jpeg');
  try {
    await pipeline(rStream, resized, wStream);
  } catch (err) {
    console.error(err);
  }
};

resizeImage('./files/vscode.jpg', './files/resized.jpg');

const colorImage = async (inputPath, outputPath) => {
  const rStream = createReadStream(inputPath);
  const wStream = createWriteStream(outputPath);
  const resized = sharp().grayscale().blur(2.5).toFormat('jpeg');
  try {
    await pipeline(rStream, resized, wStream);
  } catch (err) {
    console.error(err);
  }
};

colorImage('./files/vscode.jpg', './files/color.jpg');
