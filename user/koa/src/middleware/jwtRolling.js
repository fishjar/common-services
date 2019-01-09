import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/env';
import { EXPIRES_IN } from '../config';

export default () => async function jwtRolling(ctx, next) {
  const token = ctx.header.authorization;
  if (token) {
    const {
      username,
      user_id,
    } = jwt.verify(token.split(' ')[1], JWT_SECRET);
    const authtoken = jwt.sign({
      username,
      user_id,
    }, JWT_SECRET, { expiresIn: EXPIRES_IN });
    ctx.set('authtoken', authtoken);
  }
  await next();
}
