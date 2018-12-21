'use strict';

const Service = require('egg').Service;

class RESTService extends Service {

  async list({ pageNum = 1, pageSize = 10, sorter, ...where }) {
    let order = [];
    if (Array.isArray(sorter)) {
      order = [...sorter.map(item => item.split('__'))];
    } else if (sorter) {
      order = [sorter.split('__')];
    }
    return this.ctx.model.Media.findAndCountAll({
      where,
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
      order,
    });
  }

  async find(id) {
    const res = await this.ctx.model.Media.findById(id);
    if (!res) {
      this.ctx.throw(404, 'Media not found');
    }
    return res;
  }

  async findOne(where) {
    return await this.ctx.model.Media.findOne({ where });
  }

  async create(params) {
    return this.ctx.model.Media.create(params);
  }

  async findOrCreate(where, defaults) {
    return this.ctx.model.Media.findOrCreate({ where, defaults });
  }

  async update(id, updates) {
    const res = await this.ctx.model.Media.findById(id);
    if (!res) {
      this.ctx.throw(404, 'Media not found');
    }
    return res.update(updates);
  }

  async del(id) {
    const res = await this.ctx.model.Media.findById(id);
    if (!res) {
      this.ctx.throw(404, 'Media not found');
    }
    return res.destroy();
  }

}

module.exports = RESTService;
