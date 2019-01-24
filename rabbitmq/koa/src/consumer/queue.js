import { consumer } from '../lib/mq';

(async () => {
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
  })
})();
