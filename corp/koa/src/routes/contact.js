import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Contact.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [contact, is_new_record] = await models.Contact.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...contact.toJSON(),
    ...contact.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
