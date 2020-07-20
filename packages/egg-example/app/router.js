module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/teams', controller.teams.list)
  router.get('/weather', controller.weather.cityWeather)
  router.get('/todo/list', controller.todo.getTodoList)
  router.post('/todo/list', controller.todo.creatTodoList)

  router.get('/renovation/base/list', controller.renovation.base.list)
  router.post('/renovation/base/item', controller.renovation.base.item)
  router.delete('/renovation/base/item/:key', controller.renovation.base.deleteItem)
  router.put('/renovation/base/item/:key', controller.renovation.base.updateItem)
};