import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Org.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [org, is_new_record] = await models.Org.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...org.toJSON(),
    ...org.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
