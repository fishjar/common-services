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
export const SMTP_SERVER = {
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'test@test.com',
    pass: '******',
  }
};

const defaultConfig = {
  LOG_PATH,
  EXPIRES_IN,
  FEEDS_HOST,
  SMTP_SERVER,
};

const configMap = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
};
const envConfig = configMap[NODE_ENV];

const config = { ...defaultConfig, ...envConfig };

export default config;
