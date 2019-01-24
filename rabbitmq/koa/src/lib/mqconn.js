import amqplib from 'amqplib';
import {
  AMQP_URL,
} from '../config';

let conn;

export default () => {
  if (conn) return conn;
  amqplib.connect(AMQP_URL).then(connection => {
    conn = connection;
    return conn;
  }).catch((err) => {
    const newErr = new Error('创建MQ连接出错');
    newErr.errors = [{
      errcode: err.code,
      errmsg: err.message,
    }];
    throw newErr;
  });
}
