import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.User.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [user, is_new_record] = await models.User.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...user.toJSON(),
    ...user.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
