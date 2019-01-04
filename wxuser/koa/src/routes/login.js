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

	const [wxuser, is_new_record] = await models.Wxuser.findOrCreate({
		where: {
			appid,
			openid,
		},
	});
	const session_key = session_key;
	const expires_time = new Date(Date.now() + expires_in * 1000);
	await wxuser.update({
		session_key,
		expires_time,
	});

	const {
		session_key: _,
		expires_time: __,
		...data
	} = wxuser.get({ plain: true });
	ctx.body = {
		...data,
		is_new_record,
	};

	await next();
});


export default router;
