'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const crypto = require('crypto');

class UploadController extends Controller {

  async single() {
    const { ctx, config } = this;

    const stream = await ctx.getFileStream();
    console.log(stream)
    const item = {};
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    // 计算hash值
    const hashname = crypto.createHash('md5').update(buf).digest('hex'); // "076e3caed758a1c18c91a0e9cae3368f"
    // 获取文件及组装信息
    const size = buf.length; // 458592
    const filename = stream.filename; // "test.png"
    const mime = stream.mime; // "image/png"
    const extname = path.extname(filename).toLowerCase(); // ".jpg"
    const rename = hashname + extname; // "076e3caed758a1c18c91a0e9cae3368f.jpg"
    const filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), rename); // "jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
    const target = path.join(config.static.dir, filepath); // "/base/dir/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
    const url = config.baseUrl + filepath; // "http://media.fishjar.com/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"

    // 保存文件到服务器
    await ctx.helper.createFile(target, buf);

    // 如果是图片
    let width, height;
    if (mime === 'image/png' || mime === 'image/jpeg') {
      const metadata = await ctx.helper.getMeta(buf);
      width = metadata.width;
      height = metadata.height;
      let { resize, thumb } = stream.fields;
      resize = ~~resize;
      thumb = ~~thumb;
      // 缩放图片
      if (resize && resize > 0) {
        let rW = Math.min(resize, width);
        let rH = ~~(rW * height / width);
        if (height > width) {
          rH = Math.min(resize, height);
          rW = ~~(rW * width / height);
        }
        const resize_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_' + Math.max(rW, rH) + extname);
        const resize_target = path.join(config.static.dir, resize_filepath);
        const resize_url = config.baseUrl + resize_filepath;
        if (!fs.existsSync(resize_target)) {
          const resize_buf = await ctx.helper.getResize(buf, rW, rH);
          await ctx.helper.createFile(resize_target, resize_buf);
        }
        Object.assign(item, {
          resize,
          resize_path: resize_filepath,
          resize_url,
        });
      }
      // 剪裁正方形缩略图
      if (thumb && thumb > 0) {
        const rW = Math.min(thumb, width, height);
        const thumb_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_s' + rW + extname);
        const thumb_target = path.join(config.static.dir, thumb_filepath);
        const thumb_url = config.baseUrl + thumb_filepath;
        if (!fs.existsSync(thumb_target)) {
          const thumb_buf = await ctx.helper.getThumb(buf, thumb, width, height);
          await ctx.helper.createFile(thumb_target, thumb_buf);
        }
        Object.assign(item, {
          thumb,
          thumb_path: thumb_filepath,
          thumb_url,
        });
      }
    }

    // 保存文件信息到数据库
    const { title, description } = stream.fields;
    const media = await ctx.service.media.findOrCreate({ hashname }, {
      mime,
      filename,
      title,
      hashname,
      ext: extname,
      path: filepath,
      url,
      description,
      size,
      width,
      height,
    });

    ctx.body = {
      ...media[0].dataValues,
      ...item,
    };
  }

  async multiple() {
    const { ctx, config } = this;
    const parts = ctx.multipart({ autoFields: true });
    const data = [];
    let stream;
    while ((stream = await parts()) != null) {
      const item = {};
      let buf;
      try {
        const parts = await toArray(stream);
        buf = Buffer.concat(parts);
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }

      // 计算hash值
      const hashname = crypto.createHash('md5').update(buf).digest('hex'); // "076e3caed758a1c18c91a0e9cae3368f"
      // 获取文件及组装信息
      const size = buf.length; // 458592
      const filename = stream.filename; // "test.png"
      const mime = stream.mime; // "image/png"
      const extname = path.extname(filename).toLowerCase(); // ".jpg"
      const rename = hashname + extname; // "076e3caed758a1c18c91a0e9cae3368f.jpg"
      const filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), rename); // "jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
      const target = path.join(config.static.dir, filepath); // "/base/dir/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
      const url = config.baseUrl + filepath; // "http://media.fishjar.com/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"

      // 保存文件到服务器
      await ctx.helper.createFile(target, buf);

      // 如果是图片
      let width, height;
      if (mime === 'image/png' || mime === 'image/jpeg') {
        const metadata = await ctx.helper.getMeta(buf);
        width = metadata.width;
        height = metadata.height;
        let { resize, thumb } = parts.field;
        resize = ~~resize;
        thumb = ~~thumb;
        // 缩放图片
        if (resize && resize > 0) {
          let rW = Math.min(resize, width);
          let rH = ~~(rW * height / width);
          if (height > width) {
            rH = Math.min(resize, height);
            rW = ~~(rW * width / height);
          }
          const resize_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_' + Math.max(rW, rH) + extname);
          const resize_target = path.join(config.static.dir, resize_filepath);
          const resize_url = config.baseUrl + resize_filepath;
          if (!fs.existsSync(resize_target)) {
            const resize_buf = await ctx.helper.getResize(buf, rW, rH);
            await ctx.helper.createFile(resize_target, resize_buf);
          }
          Object.assign(item, {
            resize_path: resize_filepath,
            resize_url,
          });
        }
        // 剪裁正方形缩略图
        if (thumb && thumb > 0) {
          const rW = Math.min(thumb, width, height);
          const thumb_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_s' + rW + extname);
          const thumb_target = path.join(config.static.dir, thumb_filepath);
          const thumb_url = config.baseUrl + thumb_filepath;
          if (!fs.existsSync(thumb_target)) {
            const thumb_buf = await ctx.helper.getThumb(buf, thumb, width, height);
            await ctx.helper.createFile(thumb_target, thumb_buf);
          }
          Object.assign(item, {
            thumb_path: thumb_filepath,
            thumb_url,
          });
        }
      }

      // 保存文件信息到数据库
      const { title, description } = parts.field;
      const media = await ctx.service.media.findOrCreate({ hashname }, {
        mime,
        filename,
        title,
        hashname,
        ext: extname,
        path: filepath,
        url,
        description,
        size,
        width,
        height,
      });

      data.push({
        ...media[0].dataValues,
        ...item,
        ...parts.field,
      })
    }

    ctx.body = data;
  }

}

module.exports = UploadController;
