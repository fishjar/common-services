import { consumer } from '../lib/mq';

(async () => {
  await consumer(async ch => {
    const ex = 'msgs';
    await ch.assertExchange(ex, 'fanout', { durable: false });

    const q1 = await ch.assertQueue('', { exclusive: true });
    await ch.bindQueue(q1.queue, ex, '');

    const q2 = await ch.assertQueue('', { exclusive: true });
    await ch.bindQueue(q2.queue, ex, '');

    await ch.consume(q1.queue, res => {
      const msg = JSON.parse(res.content.toString());
      console.log('msg', 'q1', msg);
      // do something...
    }, { noAck: true });

    await ch.consume(q2.queue, res => {
      const msg = JSON.parse(res.content.toString());
      console.log('msg', 'q2', msg);
      // do something...
    }, { noAck: true });

    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  })
})();
