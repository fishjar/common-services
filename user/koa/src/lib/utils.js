import crypto from 'crypto';

import {
  PWD_SALT,
} from '../config';
import { rename } from 'fs';

export const foo = function () {
  return 'bar'
};

export const pwdSign = function ({ user_id }) {
  const sign = crypto.createHash('md5').update(user_id).update(PWD_SALT).digest('hex').toUpperCase();
  return sign;
};

export default {
  foo,
  pwdSign,
}
