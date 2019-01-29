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
		tex,
		options = {},
	} = ctx.request.body;
	ctx.assert(tex, 400, 'tex参数不能为空');

	const hashName = crypto.createHash('md5')
		.update(tex)
		.update(JSON.stringify(options))
		.digest('hex');
	const fileName = `${hashName}.mp3`;
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
		await utils.createFile(filePath, res.data);
	}

	ctx.body = {
		fileName,
	};
	await next();
});


export default router;
