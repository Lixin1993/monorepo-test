import React from 'react'
import { Dropdown, Avatar, Menu, Modal, Icon } from 'antd'

const { confirm } = Modal

type IProps = {
  src?: string
  size?: number
  history?: any,
 }

const Avatars = (props: IProps) => {
  const logout = () => {
    confirm({
      title: '退出登录',
      icon: <Icon type="close-circle" />,
      async onOk() {
        localStorage.removeItem('token')
        window.location.href = '/login'
      },
    });
  }

  const headerMenu = () => (
    <Menu>
      <Menu.Item>个人信息</Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout}>退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={headerMenu} placement="bottomCenter">
      <Avatar size={40} src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1952030956,2430616408&fm=26&gp=0.jpg'>USER</Avatar>
    </Dropdown>
  )
}

export default Avatars