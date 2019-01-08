import Router from "koa-router";
import models from "../models";

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

router.post("/username", async (ctx, next) => {
  const {
    username,
    password,
  } = ctx.body;
  if (!username || !password) {
    ctx.throw('缺少参数')
  }
  let pwdauth = await models.PwdAuth.findOne({
    where: {
      username,
    }
  });
  if (pwdauth) {
    ctx.throw('账号已存在')
  }

  const { id: user_id } = await models.User.create({
    username,
  });
  const password = utils.pwdSign({ user_id });
  const verify_time = new Date(Date.now());
  pwdauth = await models.PwdAuth.create({
    user_id,
    username,
    password,
    verify_time,
  });




  await next();
});

export default router;
