import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Staff.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [staff, is_new_record] = await models.Staff.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...staff.toJSON(),
    ...staff.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
