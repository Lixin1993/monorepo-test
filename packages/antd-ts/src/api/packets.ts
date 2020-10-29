import axios from 'axios'
import { Idata } from '../pages/packets/index'

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

export function getPacketsList(payload: ITableSetting) {
  return axios.get('/packets/list', { params: payload }).then(res => res.data)
}

export function addPacketsItem(payload: Idata) {
  return axios.post('/packets/item', payload).then(res => res.data)
}

export function deletePacketsItem(id: string) {
  return axios.delete(`/packets/item/${id}`).then(res => res.data)
}

export function updatePacketsItem(payload: Idata) {
  return axios.put(`/packets/item/${payload.id}`, payload).then(res => res.data)
}