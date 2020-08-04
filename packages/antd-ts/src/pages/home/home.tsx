import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Icon, ConfigProvider } from 'antd'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { sideMenu } from '../../config/sidebarConfig'
import initHttp from '../../api/initHttp'

initHttp()

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const { Item } = Menu

const App = () => {
  const rootSubmenuKeys = ['']
  sideMenu.map(item => rootSubmenuKeys.push(item.title))
  rootSubmenuKeys.filter(item => !!item)
  const [openKeys, setOpenKeys] = useState([sideMenu[0].title])
  const [pathname, setPathname] = useState([sideMenu[0].title, sideMenu[0].children[0].title])

  const onOpenChange = (openKey: string[]) => {
    const latestOpenKey = openKey.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys)
    } else {
      const openKeys = latestOpenKey ? [latestOpenKey] : []
      setOpenKeys(openKeys)
    }
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu
            theme="dark"
            openKeys={openKeys}
            defaultSelectedKeys={[sideMenu[0].children[0].title]}
            onOpenChange={onOpenChange}
            mode="inline"
            onClick={({ keyPath }) => setPathname(keyPath.reverse())}
          >
            {sideMenu.map((item) => {
              if (!item.children) {
                throw new Error('路由对象必须包含 children')
              }
              const { children } = item
              return (
                <SubMenu key={item.title} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                  {children.map((child) => (
                    <Item key={child.title}>
                      <Link to={child.path}>{child.title}</Link>
                    </Item>
                  ))}
                </SubMenu>
              )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {pathname.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '85vh' }}>
              <Switch>
                {sideMenu.map(item => {
                  return item.children.map((child) => {
                    return <Route path={child.path} component={child.component} />
                  })
                })}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Family Form ©2020 Created by Lixin</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App