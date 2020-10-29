import axios from 'axios'

export interface IResponse {
  code: number,
  data: any
}

function initHttp() {
  axios.defaults.headers = axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'x-auth-token': localStorage.getItem('token'),
  }
  axios.defaults.baseURL = 'http://localhost:7001'

  axios.interceptors.response.use(
    response => {
    return response
  },error => {
    if (error.response.status === 401) {
      return window.location.href = '/login'
    }
    return { code: 401, data: '' }
  })
}

export default initHttp