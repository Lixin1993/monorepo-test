import axios from 'axios'

export interface IResponse {
  code: number,
  data: any
}

function initHttp() {
  axios.defaults.headers = axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' }
  axios.defaults.baseURL = 'http://localhost:7001'
}

export default initHttp