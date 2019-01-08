import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.PwdAuth.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [pwdauth, is_new_record] = await models.PwdAuth.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...pwdauth.toJSON(),
    ...pwdauth.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
