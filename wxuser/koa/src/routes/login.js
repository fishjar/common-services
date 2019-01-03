import Router from 'koa-router';
import models from '../models';
import {
	code2session,
} from '../lib/api';

const router = new Router();

router.post('/', async (ctx, next) => {
	const {
		appid,
		code,
	} = ctx.request.body;
	if (!appid) {
		ctx.throw('appid不能为空!');
	}
	if (!code) {
		ctx.throw('code不能为空!');
	}
	const sessionRes = await code2session({
		appid,
		code,
	});
	if (!sessionRes) {
		ctx.throw('请求code2session失败')
	}
	const {
		session_key,
		expires_in,
		openid,
	} = sessionRes;

	const [wxuser, isNewRecord] = await models.Wxuser.findOrCreate({
		where: {
			appid,
			openid,
		},
	});
	const sessionKey = session_key;
	const expiresIn = new Date(Date.now() + expires_in * 1000);
	await wxuser.update({
		sessionKey,
		expiresIn,
	});

	const {
		sessionKey: _,
		expiresIn: __,
		...data
	} = wxuser.get({ plain: true });
	ctx.body = {
		...data,
		isNewRecord,
	};

	await next();
});


export default router;
