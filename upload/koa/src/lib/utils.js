import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

const moveFile = async function(source, target) {
  if (fs.existsSync(target)) {
    return;
  }
  await fs.ensureDir(path.dirname(target));
  return fs.moveSync(source ,target);
};

const createFile = async function(target, buf) {
  if (fs.existsSync(target)) {
    return;
  }
  await fs.ensureDir(path.dirname(target));
  return fs.writeFile(target, buf);
};

const getMeta = async function(buf) {
  return new Promise((resolve, reject) => {
    sharp(buf).metadata((err, metadata) => {
      if (err) {
        reject(err)
      } else {
        resolve(metadata);
      }
    })
  })
};

const getResize = async function(buf, width, height) {
  return new Promise((resolve, reject) => {
    sharp(buf)
      .resize(width, height) // 缩放
      .toBuffer()
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
};

const getThumb = async function(buf, thumb, width, height) {
  return new Promise((resolve, reject) => {
    let top = 0;
    let left = ~~((width - height) / 2);
    if (height > width) {
      left = 0;
      top = ~~((height - width) / 2);
    }
    const l = Math.min(width, height);
    const size = Math.min(thumb, l);
    sharp(buf)
      .extract({ left, top, width: l, height: l }) // 剪裁
      .resize(size, size) // 缩放
      .toBuffer()
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
};

export default {
  moveFile,
  createFile,
  getMeta,
  getResize,
  getThumb,
}
