import axios from 'axios'

export interface ITableSetting {
  page: number,
  size?: number,
}

export interface IItemDataSource {
  key: string,
  name?: string,
  typeName: string,
  type: string,
  price: number,
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

export function deleteRenovationBaseItem(payload: string) {
  return axios.delete(`/renovation/base/item/${payload}`).then(res => res.data)
}

export function updateRenovationBaseItem(payload: IItemDataSource) {
  console.log(payload)
  return axios.put(`/renovation/base/item/${payload.key}`, payload).then(res => res.data)
}