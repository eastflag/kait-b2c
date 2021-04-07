import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, message, Row, Typography} from "antd";
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

const ModifyProfile = () => {
  const [form] = Form.useForm();
  const token = useSelector(state => state.Auth.token);

  useEffect(async () => {
    const {data} = await api.get(`/api/user?id=${jwtUtils.getId(token)}`);
    form.setFieldsValue({name: data.name});
  }, [])

  const onFinish = async (values) => {
    const {name} = values;
    const {data} = await api.put(`/api/user/profile?id=${jwtUtils.getId(token)}`,
      {id: jwtUtils.getId(token), name});

    if (data.affected ) {
      message.info('수정 되었습니다');
    } else {
      message.info('에러가 발생하였습니다. 잠시후에 시도 하세요.');
    }
  };

  return (
    <div>
      <Row justify="center" style={{margin: '1rem'}}>
        <Title level={3}>정보 수정</Title>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="이름"
          rules={[
            {
              required: true,
              message: '이름을 입력해주세요!',
            },
          ]}
        >
          <Input />
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

export default ModifyProfile;

