'use strict';

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545097125386_8061';

  // add your config here
  // config.middleware = [];
  config.middleware = ['errorHandler', 'auth'];

  config.sequelize = {
    dialect: 'sqlite',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    storage: `${path.join(rootDir, 'db', 'db.development.sqlite')}`,
    operatorsAliases: false,
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => isInnerIp(ctx.ip),
      ignore: ctx => ctx.ip === '127.0.0.1',
      enable: false,
    },
  };

  config.fileTypes = [
    [
      // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
    ],
    [
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.xml',
    ],
    [
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
    ],
    [
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ]
  ];

  config.baseUrl = 'http://dev.media.test.com/';
  config.multipart = {
    fileSize: '10mb',
    whitelist: [
      '.png',
      '.jpg',
      '.pdf',
      '.pptx',
    ],
  };

  return config;
};
