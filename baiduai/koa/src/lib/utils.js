import fs from 'fs-extra';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

export const foo = function () {
  return 'bar'
};

export const createFile = async function (target, buf) {
  if (fs.existsSync(target)) {
    return;
  }
  await fs.ensureDir(path.dirname(target));
  return fs.writeFile(target, buf);
};

export const convertMp3ToWav = function (srcPath, newPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(srcPath)
      .format('wav')
      .on('error', reject)
      .on('end', function () {
        resolve(newPath)
      })
      .save(newPath);
  })
}

export default {
  foo,
  createFile,
  convertMp3ToWav,
}
