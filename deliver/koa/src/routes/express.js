import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Express.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [express, is_new_record] = await models.Express.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...express.toJSON(),
    ...express.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
