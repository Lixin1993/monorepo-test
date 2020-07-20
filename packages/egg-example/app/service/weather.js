const Service = require('egg').Service

class WeatherService extends Service {
  async cityWeather(city) {
    const { serverUrl, key } = this.config.weather

    const { data } = await this.ctx.curl(`${serverUrl}?key=${key}&city=${city}`, { dataType: 'json' })

    return data.result
  }
}

module.exports = WeatherService