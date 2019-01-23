import amqplib from 'amqplib';
import {
  AMQP_URL,
} from '../config';

export const publisher = async dosth => {
  try {
    const conn = await amqplib.connect(AMQP_URL);
    const ch = await conn.createChannel();
    await dosth(ch);
    await ch.close();
    await conn.close();
  } catch (err) {
    const newErr = new Error('创建任务队列出错');
    newErr.errors = [{
      errcode: err.code,
      errmsg: err.message,
    }];
    throw newErr;
  }
};

export const consumer = async dosth => {
  try {
    const conn = await amqplib.connect(AMQP_URL);
    const ch = await conn.createChannel();
    await dosth(ch);
    process.once('SIGINT', function () { conn.close(); });
  } catch (err) {
    const newErr = new Error('创建任务队列出错');
    newErr.errors = [{
      errcode: err.code,
      errmsg: err.message,
    }];
    throw newErr;
  }
};

export default {
  publisher,
  consumer,
}
