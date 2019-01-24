import { consumer } from '../lib/mq';

(async () => {
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
  })
})();
