// import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import Router from 'koa-router';

import config from '../config';
import models from '../models';

const router = new Router();

router.get('/', async (ctx, next) => {
	const media = await models.Media.findOne({
		where: ctx.query,
	});
	if (!media) {
		ctx.throw(404, '文件不存在!');
	}
	const { path: filepath, filename } = media;
	if (!filepath) {
		ctx.throw(404, '文件不存在!!');
	}
	const target = path.resolve(config.STATIC_DIR, filepath);
	if (!fs.existsSync(target)) {
		ctx.throw(404, '文件不存在!!!');
	}
	ctx.attachment(filename);
	ctx.set('Content-Type', 'application/octet-stream');
	ctx.body = fs.createReadStream(target);
	await next();
});

export default router;
