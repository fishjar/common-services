import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Resource.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [resource, is_new_record] = await models.Resource.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...resource.toJSON(),
    ...resource.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
