module.exports = app => {
  return class TodoController extends app.Controller {
    async getTodoList() {
      const ctx = this.ctx
      const data = await ctx.service.todo.getTodoItem()
      
      return ctx.body = data
    }
    async creatTodoList() {
      const ctx = this.ctx
      const name = this.ctx.request.body.name
      const data = await ctx.service.todo.creatTodoItem(name)
      
      return ctx.body = data
    }
  }
}