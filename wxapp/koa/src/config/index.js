import path from 'path';
import fse from 'fs-extra';
import { NODE_ENV } from '../lib/env';
import developmentConfig from './config.development';
import testConfig from './config.test';
import productionConfig from './config.production';

const logDir = path.resolve(__dirname, '../log');
fse.ensureDirSync(logDir);

const defaultConfig = {
  LOG_PATH: logDir,
  EXPIRES_IN: '1h',
  TOKEN_HOST: 'https://api.weixin.qq.com/cgi-bin/token',
  CODE2SESSION_HOST: 'https://api.weixin.qq.com/sns/jscode2session',
};

const configMap = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
};
const envConfig = configMap[NODE_ENV];

const config = { ...defaultConfig, ...envConfig };

export default config;
