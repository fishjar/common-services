import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Wxmch.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [wxmch, is_new_record] = await models.Wxmch.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...wxmch.toJSON(),
    ...wxmch.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
