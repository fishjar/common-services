import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.StaffRole.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [staffrole, is_new_record] = await models.StaffRole.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...staffrole.toJSON(),
    ...staffrole.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
