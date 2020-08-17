module.exports = app => {
  const { router, controller, middleware } = app
  const auth = middleware.jwt(app.config.jwt)

  router.post('/auth/login', controller.auth.login.login)

  router.get('/renovation/base/list', controller.renovation.base.list)
  router.post('/renovation/base/item', controller.renovation.base.item)
  router.delete('/renovation/base/item/:key', controller.renovation.base.deleteItem)
  router.put('/renovation/base/item/:key', controller.renovation.base.updateItem)
};