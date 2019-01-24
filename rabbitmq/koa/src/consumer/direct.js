import { consumer } from '../lib/mq';

(async () => {
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
  })
})();
