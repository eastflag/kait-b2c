import React from 'react';
import {Col, Layout, Row} from "antd";
import QuestionList from "./QuestionList";
import './Marking.css';

const { Content } = Layout;

function Marking(props) {
  return (
    <QuestionList></QuestionList>
  );
}

export default Marking;
