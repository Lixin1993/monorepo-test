const Controller = require('egg').Controller

class AuthController extends Controller {
  async login() {
    const { ctx, app } = this
    const body = ctx.request.body
    const token = app.jwt.sign({
      username: body.username,
      password: body.password
    }, app.config.jwt.secret)

    ctx.set({ 'x-auth-token': token })
    const data = { result: true, token }
    return ctx.body = { code: 0, data }
  }
}

module.exports = AuthController