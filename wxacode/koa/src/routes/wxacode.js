import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Wxacode.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [wxacode, is_new_record] = await models.Wxacode.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...wxacode.toJSON(),
    ...wxacode.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
