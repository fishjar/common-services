if(!process.env.SECRET_KEY) {
  console.log('需要SECRET_KEY的环境参数');
  throw(new Error('需要SECRET_KEY的环境参数'));
}
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const USERNAME = process.env.USERNAME || 'admin';
export const PASSWORD = process.env.PASSWORD || '123456';
export const JWT_SECRET = process.env.JWT_SECRET || '654321';
export const SECRET_KEY = process.env.SECRET_KEY;

export default {
  NODE_ENV,
  USERNAME,
  PASSWORD,
  JWT_SECRET,
  SECRET_KEY,
};
