import React from 'react';
import {Col, Layout, Row} from "antd";
import QuestionList from "./QuestionList";
import './Marking.css';

const { Content } = Layout;

function Marking(props) {
  return (
    <Layout>
      <Content style={{padding: '0.5rem'}}>
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={8} xl={6}>
            <QuestionList></QuestionList>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Marking;
