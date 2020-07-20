const Controller = require('egg').Controller

class WeatherController extends Controller {
  async cityWeather() {
    const ctx = this.ctx
    const city = ctx.query.city
    const data = await this.ctx.service.weather.cityWeather(city)

    return ctx.body = data
  }
}

module.exports = WeatherController