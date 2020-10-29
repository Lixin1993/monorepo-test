module.exports = app => {
  const { router, controller, middleware } = app
  const jwt = middleware.jwt(app.config.jwt)

  router.post('/auth/login', controller.auth.login)

  router.get('/renovation/base/list', jwt, controller.renovation.list)
  router.post('/renovation/base/item', jwt, controller.renovation.item)
  router.delete('/renovation/base/item/:key', jwt, controller.renovation.deleteItem)
  router.put('/renovation/base/item/:key', jwt, controller.renovation.updateItem)
  
  router.get('/packets/list', jwt, controller.packets.list)
  router.post('/packets/item', jwt, controller.packets.item)
  router.delete('/packets/item/:id', jwt, controller.packets.deleteItem)
  router.put('/packets/item/:id', jwt, controller.packets.updateItem)
};