import path from 'path';
import fse from 'fs-extra';
import { NODE_ENV } from '../lib/env';
import developmentConfig from './config.development';
import testConfig from './config.test';
import productionConfig from './config.production';

const logDir = path.resolve(__dirname, '../log');
fse.ensureDirSync(logDir);

export const LOG_PATH = logDir;
export const EXPIRES_IN = '1h';
export const FEEDS_HOST = 'https://api.github.com/feeds';
export const UNIFIEDORDER_HOST = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
export const NOTIFY_URL = 'https://test.com/action';
export const SIGN_TYPE = 'MD5';

const defaultConfig = {
  LOG_PATH,
  EXPIRES_IN,
  FEEDS_HOST,
  UNIFIEDORDER_HOST,
  NOTIFY_URL,
  SIGN_TYPE,
};

const configMap = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
};
const envConfig = configMap[NODE_ENV];

const config = { ...defaultConfig, ...envConfig };

export default config;
