import Router from 'koa-router';
import models from '../models';
import utils from '../lib/utils';
import api from '../lib/api';
import config from '../config';
const {
	NOTIFY_URL,
	SIGN_TYPE,
} = config;

const router = new Router();

router.post('/', async (ctx, next) => {
	ctx.type = 'xml';
	const { xml } = ctx.req;
	if (!xml) {
		ctx.throw('未能获取xml')
	}
	const json = utils.xml2json(xml);
	const {
		return_code,
		return_msg,
		result_code,
		err_code,
		err_code_des,
		appid,
		mch_id,
		out_trade_no,
	} = json;

	const wxpay = await models.Wxpay.findOne({
		where: {
			appid,
			mch_id,
			out_trade_no,
		}
	});
	
	if (!wxpay) {
		ctx.body = utils.json2xml({
			return_code: 'FAIL',
			return_msg: '支付订单不存在',
		});
		await next();
		return;
	}

	// 通信标识
	if (return_code !== 'SUCCESS') {
		ctx.body = utils.json2xml({
			return_code: 'FAIL',
			return_msg,
		});
		await next();
		return;
	}

	let trade_state = 'PAYERROR';
	// 交易标识
	if (result_code === 'SUCCESS') {
		// 交易成功，验证签名
		const { sign, ...signObj } = json;
		const { secret } = await models.Wxmch.findOne({
			where: {
				mchid: mch_id,
			}
		});
		if (sign !== utils.wxSign(signObj, secret)) {
			ctx.body = utils.json2xml({
				return_code: 'FAIL',
				return_msg: '验签失败',
			});
			await next();
			return;
		}
		trade_state = 'SUCCESS'
	}

	await wxpay.update({
		trade_state,
		...json,
	});

	ctx.body = utils.json2xml({
		return_code: 'SUCCESS',
		return_msg: 'OK',
	});
	await next();

});

export default router;
