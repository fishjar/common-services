import Router from 'koa-router';
import models from '../models';
import utils from '../lib/utils';

const router = new Router();

router.post('/', async (ctx, next) => {
	const { appid, openid, encryptedData, iv } = ctx.request.body;
	if (!(appid && openid && encryptedData && iv)) {
		this.ctx.throw('missing params!');
	}

	const wxuser = await models.Wxuser.findOne({
		where: {
			appid,
			openid,
		}
	});
	if (!wxuser) {
		ctx.throw('用户不存在');
	}

	const {
		session_key,
		expires_time,
	} = wxuser;
	if (!session_key) {
		ctx.throw('微信未登录');
	}
	if ((new Date(expires_time).getTime()) <= (Date.now())) {
		ctx.throw('微信登录过期');
	}

	// 解密
	const userInfo = utils.encryData({
		appid,
		sessionKey: session_key,
		encryptedData,
		iv,
	});
	const {
		nickName,
		unionId,
		avatarUrl,
		gender,
		city,
		province,
		country,
	} = userInfo;

	// 更新资料
	await wxuser.update({
		nickname: nickName,
		unionid: unionId,
		avatar: avatarUrl,
		gender,
		city,
		province,
		country,
	});

	const {
		session_key: _,
		expires_time: __,
		...data
	} = wxuser.get({ plain: true });

	ctx.body = data;

	await next();
});


export default router;
