const Controller = require('egg').Controller

class TeamsController extends Controller {
  async list() {
    const ctx = this.ctx
    const page = ctx.query.page || 1
    const size = ctx.query.size || 5
    const data = await ctx.service.teams.listService(page, size)

    return ctx.body = data
  }
}

module.exports = TeamsController