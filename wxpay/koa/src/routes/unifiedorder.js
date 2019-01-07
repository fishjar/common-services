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
	const {
		appid,
		mch_id,
		// nonce_str,
		// sign,
		body,
		out_trade_no,
		total_fee,
		spbill_create_ip,
		// notify_url,
		trade_type,
		openid,
	} = ctx.request.body;
	if (!(appid && mch_id && body && out_trade_no && total_fee && spbill_create_ip && trade_type)) {
		ctx.throw('缺少参数')
	}
	if (trade_type === 'JSAPI' && !openid) {
		ctx.throw('缺少openid参数')
	}

	const wxmch = await models.Wxmch.findOne({
		where: {
			mchid: mch_id,
		}
	});
	if (!wxmch) {
		ctx.throw('mch_id 有误或 wxmch 不存在')
	}
	const { secret } = wxmch;
	const [wxpay, is_new_record] = await models.Wxpay.findOrCreate({
		where: ctx.request.body,
	});
	
	const nonce_str = Math.random().toString(36).substr(2, 16);
	const signObj = {
		...ctx.request.body,
		nonce_str,
		notify_url: NOTIFY_URL,
		sign_type: SIGN_TYPE,
	};
	const sign = utils.wxSign(signObj, secret);
	const xml = utils.json2xml({ ...signObj, sign });
	
	const xmlResponse = await api.unifiedorder(xml);
	const jsonResponse = utils.xml2json(xmlResponse);
	if (!jsonResponse) {
		ctx.throw('微信统一下单失败')
	}

	await wxpay.update(jsonResponse);
	const {
		return_code,
		return_msg,
		result_code,
		err_code,
		err_code_des,
		prepay_id,
	} = jsonResponse;
	if (return_code !== 'SUCCESS') {
		ctx.throw(return_msg);
	}
	if (result_code !== 'SUCCESS') {
		const err = new Error('微信统一下单失败');
		err.errors = [{
			errcode: err_code,
			errmsg: err_code_des,
		}];
		throw err;
	}

	const resData = {
		timeStamp: '' + (~~(Date.now() / 1000)),
		nonceStr: Math.random().toString(36).substr(2, 16),
		package: `prepay_id=${prepay_id}`,
		signType: SIGN_TYPE,
	};
	const paySign = utils.wxSign(resData, secret);
	ctx.body = {
		...resData,
		paySign,
	}

	await next();
});

export default router;
