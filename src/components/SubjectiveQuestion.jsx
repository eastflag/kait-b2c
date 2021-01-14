import React, {useEffect, useState} from 'react';
import Latex from "react-latex";
import { Row, Col, Input } from "antd";
import _ from 'lodash';

function SubjectiveQuestion({equation, myAnswer, setSubMyAnswer, answerSubIndex}) {
  const answerCount = equation.split('@').length - 1;
  const [myEquation, setMyEquation] = useState('');

  useEffect(() => {
    const initAnswerList =_.range(0, answerCount).map(item => '');
    setSubMyAnswer(answerSubIndex, initAnswerList);
  }, [])

  useEffect(() => {
    if (!myAnswer) {
      return;
    }
    // 원본 수식에서 myAnswer 입력값으로 수식 변경하기, 변경된게 없으면 @는 square로 변경
    let nth = -1;
    let tempEquation = equation.replace(/@/g, (match, i, original) => {
      ++nth;
      return myAnswer[nth] ? myAnswer[nth] : '\\square';
    });
    setMyEquation(tempEquation);
  }, [myAnswer]);

  const onChange = (e, index) => {
    // myAnswer 변경
    myAnswer[index] = e.target.value;
    setSubMyAnswer(answerSubIndex, [...myAnswer]);
  }

  return (
    <Col flex={1}>
      <h3 style={{margin: 0}}>
        <Latex displayMode={true}>{`\$\$${myEquation}\$\$`}</Latex>
      </h3>
      <Row justify="space-between">
        {
          _.range(0, answerCount).map(item => <Col><Input style={{width: '50px', padding: '0.3rem 0'}} onChange={(e) => onChange(e, item)}/></Col>)
        }
      </Row>
    </Col>
  );
}

export default SubjectiveQuestion;
