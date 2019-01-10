import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Waybill.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [waybill, is_new_record] = await models.Waybill.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...waybill.toJSON(),
    ...waybill.get({ plain: true }),
    is_new_record,
  };
  await next();
});

export default router;
