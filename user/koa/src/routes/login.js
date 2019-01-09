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
  const pwdauth = await models.PwdAuth.findOne({
    where: {
      [Op.or]: [
        { username: username, password: pwdSign, },
        { mobile: username, password: pwdSign, },
        { email: username, password: pwdSign, },
      ]
    }
  });
  if (!pwdauth) {
    ctx.throw('帐号或密码错误')
  }

  const authtoken = jwt.sign({
    username,
    user_id: pwdauth.user_id,
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
  //
  await next();
});

export default router;
