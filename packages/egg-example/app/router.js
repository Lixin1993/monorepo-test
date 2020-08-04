module.exports = app => {
  const { router, controller, middleware } = app
  const auth = middleware.jwt(app.config.jwt)
  router.get('/', controller.home.index)
  router.get('/teams', controller.teams.list)
  router.get('/weather', controller.weather.cityWeather)
  router.get('/todo/list', controller.todo.getTodoList)
  router.post('/todo/list', controller.todo.creatTodoList)

  router.post('/auth/login', controller.auth.login.login)

  router.get('/renovation/base/list', auth, controller.renovation.base.list)
  router.post('/renovation/base/item', auth, controller.renovation.base.item)
  router.delete('/renovation/base/item/:key', auth, controller.renovation.base.deleteItem)
  router.put('/renovation/base/item/:key', auth, controller.renovation.base.updateItem)
};