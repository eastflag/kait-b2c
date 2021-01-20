import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {ROUTES_PATH} from "../../routes";

function Login(props) {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <h2>Sign In</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

  {/*        <a className="login-form-forgot" href="">
            Forgot password
          </a>*/}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Link to={ROUTES_PATH.SignUp}>회원 가입</Link>
    </>
  );
}

export default Login;
