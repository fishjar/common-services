import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Email.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [email, is_new_record] = await models.Email.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...email.toJSON(),
    ...email.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
