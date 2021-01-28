import React from 'react';
import {Row, Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {ROUTES_PATH} from "../../routes";
import api from "../../utils/api";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../redux/reducers/AuthReducer";

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const {data} = await api.post(`/api/unauth/login`, values);
    console.log(data);
    if (data.result === 0) {
      // token save
      dispatch(setToken(data.data.token))
      history.push('/');
    } else {
      message.error('email and password do not match')
    }
  };

  return (
    <>
      <Row justify="center">
        <h2>Sign In</h2>
      </Row>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input type="email" prefix={<UserOutlined />} placeholder="email" />
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
            prefix={<LockOutlined />}
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
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Row justify="end">
        <Link to={ROUTES_PATH.SignUp}>회원 가입</Link>
      </Row>
    </>
  );
}

export default Login;
