import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Addr.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [addr, is_new_record] = await models.Addr.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...addr.toJSON(),
    ...addr.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
