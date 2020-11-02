import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Icon, ConfigProvider } from 'antd'
import { Route, Switch, Link } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { sideMenu } from '../../config/sidebarConfig'
import initHttp from '../../api/initHttp'
import Avatars from '../../components/avatar'

import './index.css'

initHttp()

const { Content, Sider } = Layout
const { SubMenu } = Menu
const { Item } = Menu

const App = () => {
  const path = window.location.pathname
  const submenu = sideMenu.find(item => item.children?.find(it => it.path === path))
  const submenuChildren = submenu?.children

  const submenuKey = submenu?.title
  const openKey = submenuChildren?.find(item => item.path === path)?.title

  const [pathname, setPathname] = useState([submenuKey, openKey])
  // throw new Error('this is an error')
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Sider style={{ height: '100vh', position: 'fixed' }}>
          <div className="slogan">FMS</div>
          <Menu
            theme="dark"
            defaultOpenKeys={[submenuKey || '']}
            defaultSelectedKeys={[openKey || '']}
            mode="inline"
            onClick={({ keyPath }) => setPathname(keyPath.reverse())}
          >
            {sideMenu.map((item) => (
                <SubMenu key={item.title} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                  {item.children?.map((child) => (
                    <Item key={child.title}>
                      <Link to={child.path}>{child.title}</Link>
                    </Item>
                  ))}
                </SubMenu>
              ))}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: '200px', height: '100vh' }}>
          <header className="content-header">
            <Avatars />
          </header>
          <Content className="content">
            <Breadcrumb style={{ marginBottom: '15px' }}>
              {pathname.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
            </Breadcrumb>
            <Switch>
              {sideMenu.map(item => item.children?.map((child) => <Route path={child.path} component={child.component} />))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App