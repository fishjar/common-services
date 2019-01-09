import Router from "koa-router";
import models from "../models";
import utils from '../lib/utils';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
} from '../lib/env';
import {
  EXPIRES_IN,
} from '../config';
import {
  wxLogin,
} from '../lib/api';

const Op = Sequelize.Op;
const router = new Router();

// 用户/手机/邮箱+密码登录
router.post("/username", async (ctx, next) => {
  const {
    username,
    password,
  } = ctx.request.body;
  if (!username || !password) {
    ctx.throw('用户名或密码不能为空')
  }

  const pwdSign = utils.pwdSign({ password });
  const pwdAuth = await models.PwdAuth.findOne({
    where: {
      [Op.or]: [
        { username: username, password: pwdSign, },
        { mobile: username, password: pwdSign, },
        { email: username, password: pwdSign, },
      ]
    }
  });
  if (!pwdAuth) {
    ctx.throw('帐号或密码错误')
  }

  const authtoken = jwt.sign({
    user_id: pwdAuth.user_id,
  }, JWT_SECRET, { expiresIn: EXPIRES_IN });

  ctx.body = {
    authtoken,
    expires_in: EXPIRES_IN,
  }

  await next();
});

// 手机快速登录
router.post("/mobile", async (ctx, next) => {
  //
  await next();
});

// 邮箱验证登录
router.post("/email", async (ctx, next) => {
  //
  await next();
});

// 微信登录
router.post("/weixin", async (ctx, next) => {
  const auth_type = 'weixin';
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
  const wxLoginRes = await wxLogin({
    appid,
    code,
  });
  if (!wxLoginRes) {
    ctx.throw('微信登录失败');
  }
  const {
    openid
  } = wxLoginRes;
  if (!openid) {
    ctx.throw('微信登录错误');
  }

  let thirdAuth = await models.ThirdAuth.findOne({
    where: {
      auth_type,
      auth_id: openid,
    },
  });

  // 帐号不存在
  if (!thirdAuth) {
    const { id: user_id } = await models.User.create({
      name: Math.random().toString(36).substr(2, 16),
    });
    const verify_time = new Date(Date.now());
    thirdAuth = await models.ThirdAuth.create({
      user_id,
      auth_type,
      auth_id: openid,
      verify_time,
    });
  }

  const authtoken = jwt.sign({
    user_id: thirdAuth.user_id,
  }, JWT_SECRET, { expiresIn: EXPIRES_IN });

  ctx.body = {
    authtoken,
    expires_in: EXPIRES_IN,
  }

  await next();
});

export default router;
