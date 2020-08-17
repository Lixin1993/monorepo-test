import axios from 'axios'

export interface ITableSetting {
  page: number,
  size?: number,
}

export interface IItemDataSource {
  id: string,
  name?: string,
  typeName: string,
  type: string,
  price: number,
  total: number,
}

interface IRowData {
  name: string,
  typeName: string,
  type: string,
  price: number,
}

export function getRenovationBaseList(payload: ITableSetting) {
  return axios.get('/renovation/base/list', { params: payload }).then(res => res.data)
}

export function addRenovationBaseItem(payload: IRowData) {
  return axios.post('/renovation/base/item', payload).then(res => res.data)
}

export function deleteRenovationBaseItem(id: string) {
  return axios.delete(`/renovation/base/item/${id}`).then(res => res.data)
}

export function updateRenovationBaseItem(payload: IItemDataSource) {
  return axios.put(`/renovation/base/item/${payload.id}`, payload).then(res => res.data)
}