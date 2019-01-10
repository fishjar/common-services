import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Role.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [role, is_new_record] = await models.Role.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...role.toJSON(),
    ...role.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
