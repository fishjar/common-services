import crypto from 'crypto';

import {
  PWD_SALT,
} from '../config';
import { rename } from 'fs';

export const foo = function () {
  return 'bar'
};

export const pwdSign = function ({ password }) {
  const sign = crypto.createHash('md5')
    .update(password)
    .update(password)
    .update(PWD_SALT)
    .update(PWD_SALT)
    .update(PWD_SALT)
    .digest('hex')
    .toUpperCase();
  console.log(sign)
  return sign;
};

export default {
  foo,
  pwdSign,
}
