import fs from 'fs-extra';
import path from 'path';

export const foo = function() {
  return 'bar'
};

export const createFile = async function(target, buf) {
  if (fs.existsSync(target)) {
    return;
  }
  await fs.ensureDir(path.dirname(target));
  return fs.writeFile(target, buf);
};

export default {
  foo,
  createFile,
}
