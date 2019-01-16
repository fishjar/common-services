import Router from 'koa-router';
import models from "../models";
import nodemailer from 'nodemailer';
import {
	SMTP_SERVER,
} from '../config';

const router = new Router();

router.post("/", async (ctx, next) => {
	const {
		sender,
		receivers,
		subject,
		text_body,
		html_body,
	} = ctx.request.body;
	if (!(sender && receivers && subject)) {
		ctx.throw('缺少参数')
	}

	const email = await models.Email.create({
		sender: `${sender} <${SMTP_SERVER.auth.user}>`,
		receivers,
		subject,
		text_body,
		html_body,
	});

	try {
		const transporter = nodemailer.createTransport(SMTP_SERVER);
		const info = await transporter.sendMail({
			from: `${sender} <${SMTP_SERVER.auth.user}>`,
			to: receivers,
			subject,
			text: text_body,
			html: html_body,
		});
		const send_time = new Date(Date.now());
		await email.update({
			send_time,
			status: 2,
		});
		ctx.body = {
			send_time,
		};
	} catch (err) {
		await email.update({
			status: 3,
		});
		const newErr = new Error('发送失败');
		newErr.errors = [{
			errcode: err.code,
			errmsg: err.message,
		}];
		throw newErr;
	}
	await next();
});


export default router;
