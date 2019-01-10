import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.RoleResource.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [roleresource, is_new_record] = await models.RoleResource.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...roleresource.toJSON(),
    ...roleresource.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
