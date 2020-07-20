const Service = require('egg').Service;

class TeamsService extends Service {
  async listService(page = 1, size = 5) {
    // read config
    const { serverUrl, key } = this.config.news;

    const { data } = await this.ctx.curl(`${serverUrl}?key=${key}`, {
      dataType: 'json',
    });

    return data.result.teammatch.slice(size * (page - 1), page * size)
  }
}

module.exports = TeamsService;