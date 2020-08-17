import React from 'react'
import { Dropdown, Avatar, Menu } from 'antd'

type IProps = {
  src?: string
  size?: number
 }

const headerMenu = () => (
  <Menu>
    <Menu.Item>个人信息</Menu.Item>
    <Menu.Divider />
    <Menu.Item>退出登录</Menu.Item>
  </Menu>
)

const Avatars = (props: IProps) => {
  return (
    <Dropdown overlay={headerMenu} placement="bottomCenter">
      <Avatar size={40} src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1952030956,2430616408&fm=26&gp=0.jpg'>USER</Avatar>
    </Dropdown>
  )
}

export default Avatars