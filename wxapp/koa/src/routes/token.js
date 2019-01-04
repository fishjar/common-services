import Router from 'koa-router';
import models from '../models';
import {
	fetchToken,
} from '../lib/api';

const router = new Router();

router.get('/', async (ctx, next) => {
	const { appid } = ctx.query
	if (!appid) {
		ctx.throw('缺少APPID参数')
	}
	const wxapp = await models.Wxapp.findOne({ where: { appid } });
	if (!wxapp) {
		ctx.throw('APPID错误或WXAPP不存在')
	}

	// 如果access_token过期或不存在
	if (!(wxapp.access_token && wxapp.expires_time && ((new Date(wxapp.expires_time).getTime()) > (Date.now())))) {
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
				errcode,
				errmsg,
			}];
			throw err;
		}
		const expires_time = new Date(Date.now() + expires_in * 1000);
		await wxapp.update({
			access_token,
			expires_time,
		});
	}

	const {
		access_token,
		expires_time,
	} = wxapp.get({ plain: true });
	ctx.body = {
		appid,
		access_token,
		expires_time,
	};
	await next();
});


export default router;
