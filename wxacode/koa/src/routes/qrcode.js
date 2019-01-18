import crypto from "crypto";
import fs from 'fs';
import path from 'path';
import Router from "koa-router";
import models from "../models";
import {
  fetchAccessToken,
  fetchWxacode,
} from '../lib/api';
import {
  WXACODE_URL,
  STATIC_DIR,
} from '../config';
import utils from '../lib/utils';
const router = new Router();

router.get("/", async (ctx, next) => {
  const {
    appid,
    code_type,
    page,
    ...params,
  } = ctx.query;
  if (!appid) {
    ctx.throw('APPID不能为空')
  }
  if (!Object.keys(WXACODE_URL).includes(code_type)) {
    ctx.throw('code_type不合法')
  }

  const wxacode = await models.Wxacode.findOne({
    where: {
      appid,
      code_type,
      page,
      ...params,
    }
  });
  let code_path;
  if (wxacode) {
    code_path = wxacode.code_path;
  } else {
    const { access_token } = (await fetchAccessToken({ appid })) || {};
    if (!access_token) {
      ctx.throw('获取token失败')
    }
    const codeRes = await fetchWxacode({
      code_type,
      access_token,
      params: code_type === 'b'
        ? {
          page,
          ...params,
        } : {
          path: page,
          ...params,
        },
    });
    if (!Buffer.isBuffer(codeRes)) {
      const newError = new Error('获取小程序码失败');
      const {
        errcode,
        errmsg,
      } = codeRes;
      newError.errors = [{
        errcode,
        errmsg,
      }];
      throw newError;
    }
    const fileName = crypto.createHash('md5').update(codeRes).digest('hex');
    code_path = path.join(code_type.toLowerCase(), `${fileName}.jpg`);
    const filePath = path.join(STATIC_DIR, code_path);
    await utils.createFile(filePath, codeRes);
    await models.Wxacode.create({
      appid,
      code_type,
      page,
      ...params,
      code_path,
    })

  }
  ctx.body = {
    code_path,
  };
  if (ctx.request.type.startsWith('image')) {
    const filePath = path.join(STATIC_DIR, code_path);
    ctx.attachment(code_path);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = fs.createReadStream(filePath);
  }
  await next();
});

export default router;
