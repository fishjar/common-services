'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'mslab',
    host: '192.168.1.151',
    port: '3306',
    username: 'root',
    password: '456',
};