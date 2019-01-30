import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Router from 'koa-router';
import client from '../lib/client';
import { STATIC_DIR } from '../config';
import utils from '../lib/utils';

const router = new Router();

router.post('/', async (ctx, next) => {
	const {
		format = 'wav',
		rate = 16000,
		dev_pid = 1536,
		tex,
		options = {},
	} = ctx.request.body;
	ctx.assert(tex, 400, 'tex参数不能为空');

	const hashName = crypto.createHash('md5')
		.update(tex)
		.update(JSON.stringify(options))
		.digest('hex');
	const fileName = `${hashName}.wav`;
	const filePath = path.join(STATIC_DIR, fileName);

	try {
		fs.accessSync(filePath);
		console.log('文件已存在');
	} catch (err) {
		console.log('文件不存在');
		const res = await client.text2audio(tex, options);
		ctx.assert(res, 500, '网络发生错误');
		ctx.assert(res.data, 500, '服务发生错误', {
			errors: [{
				errcode: res.err_no,
				errmsg: res.err_msg,
			}]
		});
		const tmpPath = path.join(STATIC_DIR, `${hashName}.mp3`);
		await utils.createFile(tmpPath, res.data); // 创建临时mp3文件
		await utils.convertMp3ToWav(tmpPath, filePath); // 格式转换
	}

	const voice = fs.readFileSync(filePath);
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

	ctx.body = {
		fileName,
		result: res.result,
	};

	await next();
});


export default router;
