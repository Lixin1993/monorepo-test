const Controller = require('egg').Controller

class PacketsController extends Controller {
  async list() {
    const ctx = this.ctx
    const page = ctx.query.page || 1
    const size = ctx.query.size || 10
    const data = await ctx.service.packets.list(page, size)
    
    return ctx.body = { code: 0, data }
  }

  async item() {
    const ctx = this.ctx
    const body = ctx.request.body
    const data = await ctx.service.packets.addItem(body)

    return ctx.body = { code: 0, data }
  }

  async deleteItem() {
    const ctx = this.ctx
    const id = ctx.params.id
    const data = await ctx.service.packets.deleteItem(id)

    return ctx.body = { code: 0, data }
  }

  async updateItem() {
    const ctx = this.ctx
    const body = ctx.request.body
    const data = await ctx.service.packets.updateItem(body)

    return ctx.body = { code: 0, data }
  }
}

module.exports = PacketsController