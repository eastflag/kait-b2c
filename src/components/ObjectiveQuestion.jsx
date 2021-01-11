import React from 'react';
import {Col, Button} from "antd";

function ObjectiveQuestion({example, answer, index}) {
  console.log('ObjectiveQuestion', index);
  return example.replace(' ', '').split(',').map((item, index) => <Col><Button key={index}>{item}</Button></Col>)
}

export default ObjectiveQuestion;
