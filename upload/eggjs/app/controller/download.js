'use strict';

const path = require('path');
const fs = require('fs');
const Controller = require('egg').Controller;

class DownloadController extends Controller {

  async download() {
    const { ctx, config } = this;
    const media = await ctx.service.media.findOne(ctx.query);
    if (!media) {
      ctx.throw('文件不存在!');
    }
    const { path: filepath, filename } = media;
    if (!filepath) {
      ctx.throw('文件不存在!!');
    }
    const target = path.resolve(config.static.dir, filepath);
    if (!fs.existsSync(target)) {
      ctx.throw('文件不存在!!!');
    }
    this.ctx.attachment(filename);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(target);
  }

  async downloadImage() {
    const url = 'http://cdn2.ettoday.net/images/1200/1200526.jpg';
    const res = await this.ctx.curl(url, {
      streaming: true,
    });

    this.ctx.type = 'jpg';
    this.ctx.body = res.res;
  }

}

module.exports = DownloadController;
