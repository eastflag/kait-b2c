import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Row, Typography} from "antd";
import api from "../../utils/api";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/jwtUtils";

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

const ModifyPassword = () => {
  const [form] = Form.useForm();
  const token = useSelector(state => state.Auth.token);
  const [password, setPassword] = useState('');

  useEffect(async () => {
    const {data} = await api.get(`/api/user?id=${jwtUtils.getId(token)}`);
    setPassword(data.password);
  }, [])

  const onFinish = async (values) => {
    const {old_password, new_password} = values;
    if (password !== old_password) {
      message.error('기존 패스워드가 일치하지 않습니다!');
      return;
    }

    const {data} = await api.put(`/api/user/password`,
      {id: jwtUtils.getId(token), password: new_password});
    console.log(data);
    if (data.affected ) {
      message.info('수정 되었습니다');
    } else {
      message.info('에러가 발생하였습니다. 잠시후에 시도 하세요.');
    }
  };

  return (
    <div>
      <Row justify="center" style={{margin: '1rem'}}>
        <Title level={3}>패스워드 변경</Title>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="old_password"
          label="기존 패스워드"
          rules={[
            {
              required: true,
              message: '기존 패스워드를 입력해주세요!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="new_password"
          label="신규 패스워드"
          rules={[
            {
              required: true,
              message: '신규 패스워드를 입력해주세요!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="신규 패스워드 확인"
          dependencies={['new_password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '신규 패스워드를 한번더 입력해주세요!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('신규 패스워드와 일치하지 않습니다.!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block>
            확인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModifyPassword;
