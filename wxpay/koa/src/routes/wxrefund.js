import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Wxrefund.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [wxrefund, is_new_record] = await models.Wxrefund.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...wxrefund.toJSON(),
    ...wxrefund.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
