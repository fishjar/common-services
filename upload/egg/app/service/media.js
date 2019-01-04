'use strict';

const Service = require('egg').Service;

class RESTService extends Service {

  async list({ page_num = 1, page_size = 10, sorter, ...where }) {
    let order = [];
    if (Array.isArray(sorter)) {
      order = [...sorter.map(item => item.split('__'))];
    } else if (sorter) {
      order = [sorter.split('__')];
    }
    return this.ctx.model.Media.findAndCountAll({
      where,
      offset: (page_num - 1) * page_size,
      limit: page_size,
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
