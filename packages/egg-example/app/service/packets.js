const Service = require('egg').Service
const UUID = require('uuid')

class PacketsService extends Service {
  async list() {
    const clenit = this.app.mysql.get('db1')
    const packets = await clenit.select('packets')
    const packetsList = await clenit.select('packets_list')
    packets.map(item => {
      const result = packetsList.filter(listItem => item.id === listItem.pid)
      item.list = result
    })

    return packets
  }

  async addItem(item) {
    const clenit = this.app.mysql.get('db1')
    const id = UUID.v1()
    const packets = { id, date: item.date, type: item.type }
    item.list.map(item => {
      item.pid = id
      item.id = UUID.v1()
    })
    const packetsList = item.list
    const resultPackets = await clenit.insert('packets', packets)
    const resultPacketsList = await clenit.insert('packets_list', packetsList)

    const insertSuccess = resultPackets.affectedRows > 0 && resultPacketsList.affectedRows > 0

    return { result: insertSuccess }
  }
  async deleteItem(id) {
    const clenit = this.app.mysql.get('db1')
    await clenit.query('SET foreign_key_checks = 0')
    const resultPackets = await clenit.delete('packets', { id })
    const resultPacketsList = await clenit.delete('packets_list', { pid: id })
    await clenit.query('SET foreign_key_checks = 0')
    
    return { result: resultPackets.affectedRows > 0 && resultPacketsList.affectedRows > 0 }
  }

  async updateItem(body) {
    const clenit = this.app.mysql.get('db1')
    const packets = { id: body.id, date: body.date, type: body.type }
    const resultPackets = await clenit.update('packets', packets)
    
    const resultDelete = await clenit.delete('packets_list', { pid: body.id })

    body.list.map(async item => {
      if (!item.id && !item.pid) {
        item.pid = body.id
        item.id = UUID.v1()
      }
    })
    const resultInsert = await clenit.insert('packets_list', body.list)

    const updateSuccess = resultPackets.affectedRows > 0
    const deleteSuccess = resultDelete.affectedRows > 0
    const insertSuccess = resultInsert.affectedRows > 0

    return { result: updateSuccess && deleteSuccess && insertSuccess }
  }
}

module.exports = PacketsService