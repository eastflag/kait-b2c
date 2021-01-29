import React from 'react';
import {Row, Form, Input, Button, Checkbox, message, Typography} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {ROUTES_PATH} from "../../routes";
import api from "../../utils/api";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../redux/reducers/AuthReducer";

const {Title} = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

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
    <div style={{padding: '1rem'}}>
      <Row justify="center" style={{marginTop: '1rem'}}>
        <Title level={3}>로그인</Title>
      </Row>
      <Form
        {...formItemLayout}
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: '유효한 E-mail이 아닙니다!',
            },
            {
              required: true,
              message: 'E-mail을 입력해주세요!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="이메일" />
        </Form.Item>
        <Form.Item
          name="password"
          label="패스워드"
          rules={[
            {
              required: true,
              message: '패스워드를 입력해주세요!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="패스워드"
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

  {/*        <a className="login-form-forgot" href="">
            Forgot password
          </a>*/}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Row justify="end">
        <Link to={ROUTES_PATH.SignUp}>회원 가입</Link>
      </Row>
    </div>
  );
}

export default Login;
