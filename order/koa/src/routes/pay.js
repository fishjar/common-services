import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Pay.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [pay, is_new_record] = await models.Pay.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...pay.toJSON(),
    ...pay.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
