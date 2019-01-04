import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Wxpay.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [wxpay, is_new_record] = await models.Wxpay.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...wxpay.toJSON(),
    ...wxpay.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
