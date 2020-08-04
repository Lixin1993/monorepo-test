import axios from 'axios'
import cookies from 'react-cookies'

export interface IResponse {
  code: number,
  data: any
}

function initHttp() {
  axios.defaults.headers = axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' }
  axios.defaults.headers = axios.defaults.headers = { 'Content-type': 'application/x-www-form-urlencoded' }
  axios.defaults.baseURL = 'http://localhost:7001'

  axios.interceptors.request.use(config => {
    console.log('-========', config)
    config.headers['x-auth-token'] = cookies.load('token')
    return config
  })
}

export default initHttp