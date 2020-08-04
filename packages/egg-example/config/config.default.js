exports.keys = 'lixin';

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
}

exports.jwt = { secret: '123456' }

exports.news = {
  key: '30b23529aee026f95780daf1dec571dc',
  serverUrl: 'http://op.juhe.cn/onebox/basketball/nba',
}

exports.weather = {
  key: 'dab0b0b77ce4941a7df2bae6c3360ab0',
  serverUrl: 'http://apis.juhe.cn/simpleWeather/query',
}

exports.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
}

exports.todoList = {
  todo: ['李昕', '冯琦', '李乔熙'],
  done: ['lixin', 'fengqi', 'liqiaoxi'],
}

exports.mysql = {
  clients: {
    // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
    db1: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '12345678',
      // 数据库名
      database: 'renovation',
    },
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
}

exports.security = {
  csrf: false,
}

