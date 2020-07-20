const Service = require('egg').Service
const UUID = require('uuid')

class RenovationBaseService extends Service {
  async list() {
    const clenit = this.app.mysql.get('db1')
    const list = await clenit.select('renovation_base')

    return { list }
  }
  async addItem(item) {
    const clenit = this.app.mysql.get('db1')
    const key = UUID.v1()
    const data = { id: key, key, ...item }
    const result = await clenit.insert('renovation_base', data)
    const insertSuccess = result.affectedRows === 1

    return { result: insertSuccess }
  }
  async deleteItem(key) {
    const clenit = this.app.mysql.get('db1')
    const result = await clenit.delete('renovation_base', key)
    const deleteSuccess = result.affectedRows === 1
    
    return { result: deleteSuccess }
  }
  async updateItem(key, body) {
    const clenit = this.app.mysql.get('db1')
    const result = await clenit.update('renovation_base', body)
    const deleteSuccess = result.affectedRows === 1
    
    return { result: deleteSuccess }
  }
}

module.exports = RenovationBaseService