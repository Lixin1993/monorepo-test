const Service = require('egg').Service

class TodoService extends Service {
  async getTodoItem() {
    const clenit = this.app.mysql.get('db1')

    const result = await clenit.select('todo_list')

    return { result }
  }
  async creatTodoItem(name) {
    const clenit = this.app.mysql.get('db1')

    const result = await clenit.insert('todo_list', { name, status: 1 })

    const insertSuccess = result.affectedRows === 1

    return insertSuccess
  }
}

module.exports = TodoService