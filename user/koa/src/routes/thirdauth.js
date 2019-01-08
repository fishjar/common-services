import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.ThirdAuth.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [thirdauth, is_new_record] = await models.ThirdAuth.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...thirdauth.toJSON(),
    ...thirdauth.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
