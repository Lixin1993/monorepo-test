import axios from 'axios'
import cookies from 'react-cookies'

export interface IResponse {
  code: number,
  data: any
}

function initHttp() {
  axios.defaults.headers = axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' }
  axios.defaults.baseURL = 'http://localhost:7001'

  axios.interceptors.request.use(config => {
    config.headers['x-auth-token'] = cookies.load('token')
    return config
  })
}

export default initHttp