import Router from 'koa-router';
import models from '../models';
import utils from '../lib/utils';

const router = new Router();

router.post('/', async (ctx, next) => {
	const { appid, openid, encryptedData, iv } = ctx.request.body;
	if (!(appid && openid && encryptedData && iv)) {
		this.ctx.throw('missing params!');
	}

	const Wxuser = await models.Wxuser.findOne({
		where: {
			appid,
			openid,
		}
	});
	if (!Wxuser) {
		ctx.throw('用户不存在');
	}

	const {
		sessionKey,
		expiresIn,
	} = Wxuser;
	if (!sessionKey) {
		ctx.throw('用户未登录');
	}
	if ((new Date(expiresIn).getTime()) <= (Date.now())) {
		ctx.throw('登录过期');
	}

	// 解密
	const userInfo = utils.encryData({
		appid,
		sessionKey,
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
	await Wxuser.update({
		nickname: nickName,
		unionid: unionId,
		avatar: avatarUrl,
		gender,
		city,
		province,
		country,
	});

	const {
		id,
	} = Wxuser;

	ctx.body = {
		id,
		nickname: nickName,
		unionid: unionId,
		avatar: avatarUrl,
		gender,
		city,
		province,
		country,
	};

	await next();
});


export default router;
