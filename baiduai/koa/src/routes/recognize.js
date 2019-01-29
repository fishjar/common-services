import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Router from 'koa-router';
import client from '../lib/client';
import { STATIC_DIR } from '../config';
import utils from '../lib/utils';

// import toArray from 'stream-to-array';
// import sendToWormhole from 'stream-wormhole';

const router = new Router();

router.post('/', async (ctx, next) => {
	const {
		format = 'pcm',
		rate = 16000,
		dev_pid = 1536,
	} = ctx.request.body;
	const { file } = ctx.request.files;
	console.log(format);
	// console.log(file);
	ctx.assert(file, 400, '语音文件不能为空');

	const voice = fs.readFileSync(file.path);
	const voiceBuffer = new Buffer(voice);

	const res = await client.recognize(voiceBuffer, format, rate, {
		dev_pid: ~~dev_pid,
	});
	ctx.assert(res, 500, '网络发生错误');
	ctx.assert(res.result, 500, '服务发生错误', {
		errors: [{
			errcode: res.err_no,
			errmsg: res.err_msg,
		}]
	});

	ctx.body = res;
	await next();
});


export default router;
