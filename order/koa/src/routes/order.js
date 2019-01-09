import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Order.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [order, is_new_record] = await models.Order.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...order.toJSON(),
    ...order.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
