import axios from 'axios'

export interface ILoginInfo {
  username: string,
  password: string,
  remember: boolean,
}

export function loginbyPwd(payload: ILoginInfo) {
  return axios.post('/auth/login', payload).then(res => res.data)
}