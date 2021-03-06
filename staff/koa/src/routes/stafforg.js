import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.StaffOrg.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [stafforg, is_new_record] = await models.StaffOrg.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...stafforg.toJSON(),
    ...stafforg.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
