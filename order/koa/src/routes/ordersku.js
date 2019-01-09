import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.OrderSku.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [ordersku, is_new_record] = await models.OrderSku.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...ordersku.toJSON(),
    ...ordersku.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
