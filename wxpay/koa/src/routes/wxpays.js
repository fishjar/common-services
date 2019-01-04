import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  const { pageNum = 1, pageSize = 10, sorter, ...where } = ctx.query;
  let order = [];
  if (Array.isArray(sorter)) {
    order = [...sorter.map(item => item.split("__"))];
  } else if (sorter) {
    order = [sorter.split("__")];
  }
  ctx.body = await models.Wxpay.findAndCountAll({
    where,
    offset: (pageNum - 1) * pageSize,
    limit: pageSize,
    order,
  });
  await next();
});

router.get("/:id", async (ctx, next) => {
  ctx.body = await models.Wxpay.findById(ctx.params.id);
  await next();
});

router.post("/", async (ctx, next) => {
  ctx.body = await models.Wxpay.create(ctx.request.body);
  await next();
});

router.post("/multiple", async (ctx, next) => {
  ctx.body = await models.Wxpay.bulkCreate(ctx.request.body);
  await next();
});

router.patch("/", async (ctx, next) => {
  ctx.body = await models.Wxpay.update(ctx.request.body.fields, {
    where: ctx.request.body.filter,
  });
  await next();
});

router.patch("/:id", async (ctx, next) => {
  const obj = await models.Wxpay.findById(ctx.params.id);
  ctx.body = await obj.update(ctx.request.body);
  await next();
});

router.delete("/", async (ctx, next) => {
  ctx.body = await models.Wxpay.destroy({
    where: ctx.request.body,
  });
  await next();
});

router.delete("/:id", async (ctx, next) => {
  const obj = await models.Wxpay.findById(ctx.params.id);
  ctx.body = await obj.destroy();
  await next();
});

export default router;
