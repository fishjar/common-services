import Router from "koa-router";
import models from "../models";
import utils from '../lib/utils';

const router = new Router();

// 检查用户名、手机、邮箱是否已注册
router.get("/checkuser", async (ctx, next) => {
  const { usertype, username } = ctx.query;
  if (!username || !usertype) {
    ctx.throw('缺少参数');
  }
  if (!['username', 'mobile', 'email'].includes(usertype)) {
    ctx.throw('usertype错误');
  }
  const pwdauth = await models.PwdAuth.findOne({
    where: {
      [usertype]: username,
    }
  });

  if (pwdauth) {
    const { user_id } = pwdauth;
    const { name } = await models.User.findById(user_id);
    ctx.body = {
      available: false,
      name: '*'.repeat(name.length - 1) + name.slice(-1),
    };
  } else {
    ctx.body = {
      available: true,
    };
  }
  await next();
});

// 用户密码注册
router.post("/username", async (ctx, next) => {
  const {
    username,
    password,
  } = ctx.request.body;
  if (!username || !password) {
    ctx.throw('用户名或密码不能为空')
  }
  const pwdauth = await models.PwdAuth.findOne({
    where: {
      username,
    }
  });
  if (pwdauth) {
    ctx.throw('账号已存在')
  }

  const { id: user_id } = await models.User.create({
    name: username,
  });
  const pwdSign = utils.pwdSign({ password });
  const verify_time = new Date(Date.now());
  await models.PwdAuth.create({
    user_id,
    username,
    password: pwdSign,
    verify_time,
  });

  ctx.body = {
    user_id,
    username,
  };

  await next();
});

// 手机注册
router.post("/mobile", async (ctx, next) => {
  //
  await next();
});

// 邮箱注册
router.post("/email", async (ctx, next) => {
  //
  await next();
});

export default router;
