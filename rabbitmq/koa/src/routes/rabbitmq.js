import Router from 'koa-router';
import { publisher } from '../lib/mq';

const router = new Router();


// Work queues
router.post('/task', async (ctx, next) => {
	const {
		queue = 'task_queue',
		msg,
	} = ctx.request.body;
	ctx.assert(msg, 400, 'msg不能为空');

	await publisher(async ch => {
		await ch.assertQueue(queue, { durable: true });
		await ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { deliveryMode: true });
	});

	ctx.body = {
		result: 'success'
	};
	await next();
});

// Publish/Subscribe
router.post('/fanout', async (ctx, next) => {
	const {
		ex = 'msgs',
		msg,
	} = ctx.request.body;
	ctx.assert(msg, 400, 'msg不能为空');

	await publisher(async ch => {
		await ch.assertExchange(ex, 'fanout', { durable: false });
		await ch.publish(ex, '', Buffer.from(JSON.stringify(msg)));
	});

	ctx.body = {
		result: 'success'
	};
	await next();
});

// Routing
router.post('/direct', async (ctx, next) => {
	const {
		ex = 'direct_msgs',
		severity = 'info',
		msg,
	} = ctx.request.body;
	ctx.assert(msg, 400, 'msg不能为空');

	await publisher(async ch => {
		await ch.assertExchange(ex, 'direct', { durable: false });
		await ch.publish(ex, severity, Buffer.from(JSON.stringify(msg)));
	});

	ctx.body = {
		result: 'success'
	};
	await next();
});

// Topics
router.post('/topic', async (ctx, next) => {
	const {
		ex = 'topic_msgs',
		key = '#',
		msg,
	} = ctx.request.body;
	ctx.assert(msg, 400, 'msg不能为空');

	await publisher(async ch => {
		await ch.assertExchange(ex, 'topic', { durable: false });
		await ch.publish(ex, key, Buffer.from(JSON.stringify(msg)));
	});

	ctx.body = {
		result: 'success'
	};
	await next();
});


export default router;
