'use strict';

const Controller = require('egg').Controller;

const createRule = {
  mime: 'int',
  name: 'string',
  ext: 'string',
  path: 'string',
};

class RESTController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.media.list(ctx.query);
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);
    ctx.body = await ctx.service.media.create(ctx.request.body);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.media.find(ctx.params.id);
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.media.update(ctx.params.id, body);
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.media.del(id);
  }

}

module.exports = RESTController;
