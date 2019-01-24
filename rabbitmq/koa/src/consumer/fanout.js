import { consumer } from '../lib/mq';

(async () => {
  await consumer(async ch => {
    const ex = 'msgs';
    await ch.assertExchange(ex, 'fanout', { durable: false }); // 创建交换器
    const q = await ch.assertQueue('', { exclusive: true }); // 创建队列
    await ch.bindQueue(q.queue, ex, ''); // 绑定
    await ch.consume(q.queue, res => { // 监听消息
      const msg = JSON.parse(res.content.toString());
      console.log('msg', 'fanout', msg);
      // do something...
    }, { noAck: true });
    console.log(' [*] Waiting for fanout messages. To exit press CTRL+C');
  })
})();
