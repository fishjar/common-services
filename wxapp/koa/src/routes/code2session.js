import Router from 'koa-router';
import models from '../models';
import {
	fetchToken,
	code2session,
} from '../lib/api';

const router = new Router();

router.post('/', async (ctx, next) => {
	const {
		appid,
		code,
		grant_type = 'authorization_code',
	} = ctx.request.body;
	if (!(appid && code)) {
		ctx.throw('缺少参数')
	}

	const wxapp = await models.Wxapp.findOne({
		where: {
			appid
		}
	});
	if (!wxapp) {
		ctx.throw('APP不存在')
	}
	
	const { secret } = wxapp;
	const sessionRes = await code2session({
		appid,
		secret,
		js_code: code,
		grant_type,
	});
	if (!sessionRes) {
		ctx.throw('code2session失败')
	}

	const {
		errcode,
		errmsg,
		session_key,
		expires_in,
		openid,
	} = sessionRes;
	if (errmsg) {
		const err = new Error('获取jscode2session失败');
		err.errors = [{
			errorCode: errcode,
			errorMessage: errmsg,
		}];
		throw err;
	}

	ctx.body = {
		session_key,
		expires_in,
		openid,
	};
	await next();
});


export default router;
