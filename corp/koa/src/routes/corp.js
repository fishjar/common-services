import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Corp.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [corp, is_new_record] = await models.Corp.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...corp.toJSON(),
    ...corp.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
