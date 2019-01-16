import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Smtp.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [smtp, is_new_record] = await models.Smtp.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...smtp.toJSON(),
    ...smtp.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
