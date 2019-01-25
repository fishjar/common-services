import { consumer } from '../lib/mq';

(async () => {

  // Work queues
  await consumer(async ch => {
    const queue = 'task_queue';
    const q = await ch.assertQueue(queue, { durable: true });
    await ch.prefetch(1);
    await ch.consume(q.queue, async res => {
      const msg = JSON.parse(res.content.toString());
      console.log('msg', 'queue', msg);
      // do something...
      await ch.ack(res);
    }, { noAck: false });
    console.log(' [*] Waiting for queue messages. To exit press CTRL+C');
  });

  // Publish/Subscribe
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
  });

  // Routing
  await consumer(async ch => {
    const ex = 'direct_msgs';
    const severities = ['info', 'warning', 'error'];
    await ch.assertExchange(ex, 'direct', { durable: false });
    const q = await ch.assertQueue('', { exclusive: true });
    await Promise.all(severities.map(sev => ch.bindQueue(q.queue, ex, sev)));
    await ch.consume(q.queue, res => {
      const msg = JSON.parse(res.content.toString());
      console.log('msg', 'direct', msg);
      // do something...
    }, { noAck: true });
    console.log(' [*] Waiting for direct messages. To exit press CTRL+C');
  });

  // Topics
  await consumer(async ch => {
    const ex = 'topic_msgs';
    const keys = ['#', '"kern.*', '*.critical'];
    await ch.assertExchange(ex, 'topic', { durable: false });
    const q = await ch.assertQueue('', { exclusive: true });
    await Promise.all(keys.map(key => ch.bindQueue(q.queue, ex, key)));
    await ch.consume(q.queue, res => {
      const msg = JSON.parse(res.content.toString());
      console.log('msg', 'topic', msg);
      // do something...
    }, { noAck: true });
    console.log(' [*] Waiting for topic messages. To exit press CTRL+C');
  });

})();
