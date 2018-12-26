// import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import os from 'os';

import Router from 'koa-router';
import pump from 'mz-modules/pump';
import toArray from 'stream-to-array';
import sendToWormhole from 'stream-wormhole';

import config from '../config';
import utils from '../lib/utils';
import models from "../models"

const router = new Router();

router.post('/', async (ctx, next) => {
	// console.log(ctx.request.body)
	// console.log(ctx.request.files)
	const fields = ctx.request.body;
	let files = ctx.request.files.file;
	if ((typeof files) !== 'object') {
		ctx.throw('未能获取文件信息')
	}
	if (!Array.isArray(files)) {
		files = [files];
	}

	const resData = [];

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const item = {};

		// 计算hash值
		// const hashname = crypto.createHash('md5').update(buf).digest('hex'); // "076e3caed758a1c18c91a0e9cae3368f"
		const hashname = file.hash; // "076e3caed758a1c18c91a0e9cae3368f"

		// 获取文件及组装信息
		const size = file.size; // 458592
		const filename = file.name; // "test.png"
		const mime = file.type; // "image/png"
		const extname = path.extname(filename).toLowerCase(); // ".jpg"
		const rename = hashname + extname; // "076e3caed758a1c18c91a0e9cae3368f.jpg"
		const filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), rename); // "jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
		const target = path.join(config.STATIC_DIR, filepath); // "/base/dir/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
		const url = config.BASE_URL + filepath; // "http://media.fishjar.com/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"

		// // 保存文件到服务器
		// await utils.createFile(target, buf);

		// koa-body上传时会自动保存一份到临时文件夹
		// 从临时文件夹移动到目标文件夹
		await utils.moveFile(file.path, target);

		// 如果是图片
		let width, height;
		if (mime === 'image/png' || mime === 'image/jpeg') {
			// const stream = fs.createReadStream(file.path);
			const stream = fs.createReadStream(target);
			let buf;
			try {
				const parts = await toArray(stream);
				buf = Buffer.concat(parts);
			} catch (err) {
				await sendToWormhole(stream);
				throw err;
			}

			const metadata = await utils.getMeta(buf);
			width = metadata.width;
			height = metadata.height;
			let { resize, thumb } = fields;
			resize = ~~resize;
			thumb = ~~thumb;
			// 缩放图片
			if (resize && resize > 0) {
				let rW = Math.min(resize, width);
				let rH = ~~(rW * height / width);
				if (height > width) {
					rH = Math.min(resize, height);
					rW = ~~(rW * width / height);
				}
				const resize_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_' + Math.max(rW, rH) + extname);
				const resize_target = path.join(config.STATIC_DIR, resize_filepath);
				const resize_url = config.BASE_URL + resize_filepath;
				if (!fs.existsSync(resize_target)) {
					const resize_buf = await utils.getResize(buf, rW, rH);
					await utils.createFile(resize_target, resize_buf);
				}
				Object.assign(item, {
					resize_path: resize_filepath,
					resize_url,
				});
			}
			// 剪裁正方形缩略图
			if (thumb && thumb > 0) {
				const rW = Math.min(thumb, width, height);
				const thumb_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_s' + rW + extname);
				const thumb_target = path.join(config.STATIC_DIR, thumb_filepath);
				const thumb_url = config.BASE_URL + thumb_filepath;
				if (!fs.existsSync(thumb_target)) {
					const thumb_buf = await utils.getThumb(buf, thumb, width, height);
					await utils.createFile(thumb_target, thumb_buf);
				}
				Object.assign(item, {
					thumb_path: thumb_filepath,
					thumb_url,
				});
			}
		}

		// 保存文件信息到数据库
		const { title, description } = fields;
		const media = await models.Media.findOrCreate({
			where: {
				hashname,
			},
			defaults: {
				mime,
				filename,
				title,
				hashname,
				ext: extname,
				path: filepath,
				url,
				description,
				size,
				width,
				height,
			},
		});
		resData.push({
			...media[0].dataValues,
			...item,
			...fields,
		})
	}

	ctx.body = resData;
	await next();
});

export default router;
