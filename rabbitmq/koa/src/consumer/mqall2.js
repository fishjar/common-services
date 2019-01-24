import conn from '../lib/mqconn';

// Publish/Subscribe
(async () => {
  const ch = await conn.createChannel();
  const ex = 'msgs';
  await ch.assertExchange(ex, 'fanout', { durable: false });
  const q = await ch.assertQueue('', { exclusive: true });
  await ch.bindQueue(q.queue, ex, '');
  await ch.consume(q.queue, res => {
    const msg = JSON.parse(res.content.toString());
    console.log('msg', 'fanout', msg);
    // do something...
  }, { noAck: true });
  console.log(' [*] Waiting for fanout messages. To exit press CTRL+C');
})();

// Publish/Subscribe
(async () => {
  const ch = await conn.createChannel();
  const ex = 'msgs';
  await ch.assertExchange(ex, 'fanout', { durable: false });
  const q = await ch.assertQueue('', { exclusive: true });
  await ch.bindQueue(q.queue, ex, '');
  await ch.consume(q.queue, res => {
    const msg = JSON.parse(res.content.toString());
    console.log('msg', 'fanout', msg);
    // do something...
  }, { noAck: true });
  console.log(' [*] Waiting for fanout messages. To exit press CTRL+C');
})();

// Routing
(async () => {
  const ch = await conn.createChannel();
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
})();

// Topics
(async () => {
  const ch = await conn.createChannel();
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
})();