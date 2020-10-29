import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { loginbyPwd, ILoginInfo } from '../../api/login'

import './index.css'

const Login = (props: any) => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = () => {
    props.form.validateFields((err: boolean, values: ILoginInfo) => {
      if (!err) {
        loginbyPwd(values).then(res => {
          if (res.data.result) {
            message.success('登录成功！')
            localStorage.setItem('token', res.data.token)
            window.location.href = '/renovation/base'
          }
        })
      }
    })
  }
  return (
    <div className="login-wrapper">
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请填写你的用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写你的密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
          <a className="login-form-forgot" href="javascript">
            忘记密码？
          </a>
          <Button type="primary" onClick={handleSubmit} className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default WrappedLogin