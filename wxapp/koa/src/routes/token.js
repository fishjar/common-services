import Router from 'koa-router';
import models from '../models';
import {
	fetchToken,
} from '../lib/api';

const router = new Router();

router.get('/:appid', async (ctx, next) => {
	const { appid } = ctx.params;
	if (!appid) {
		ctx.throw('缺少APPID')
	}
	const wxapp = await models.Wxapp.findOne({ where: { appid } });
	if (!wxapp) {
		ctx.throw('APPID错误或WXAPP不存在')
	}
	let { accessToken, expiresIn } = wxapp;

	// 如果access_token过期或不存在
	if (!(accessToken && expiresIn && ((new Date(expiresIn).getTime()) > (Date.now())))) {
		const grant_type = 'client_credential';
		const { id, secret } = wxapp;
		const tokenResponse = await fetchToken({
			appid,
			secret,
			grant_type,
		});
		if (!tokenResponse) {
			ctx.throw('获取token失败')
		}
		const { errcode, errmsg, access_token, expires_in } = tokenResponse;
		if (errmsg) {
			// ctx.throw(errmsg);
			const err = new Error('获取token出错');
			// err.statusCode = 500;
			err.errors = [{
				errorCode: errcode,
				errorMessage: errmsg,
			}];
			throw err;
		}
		accessToken = access_token;
		expiresIn = new Date(Date.now() + expires_in * 1000);
		await wxapp.update({
			accessToken,
			expiresIn,
		});
	}

	ctx.body = {
		appid,
		accessToken,
		expiresIn,
	};
	await next();
});


export default router;
