import { consumer } from '../lib/mq';

(async () => {
  await consumer(async ch => {
    const ex = 'msgs';
    await ch.assertExchange(ex, 'fanout', { durable: false });
    const q = await ch.assertQueue('', { exclusive: true });
    await ch.bindQueue(q.queue, ex, '');
    await ch.consume(q.queue, res => {
      const msg = JSON.parse(res.content.toString());
      console.log('msg', msg);
      // do something...
    }, { noAck: true });
    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  })
})();
