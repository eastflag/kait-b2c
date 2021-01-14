import React, {useState} from 'react';
import {Col, Button} from "antd";

function ObjectiveQuestion({example, answer, myAnswer, setSubMyAnswer, answerSubIndex}) {
  const answerCount = answer.split(',').length;

  const onToggle = (number) => {
    // 다지 선다형
    if (answerCount > 1) {
      let tempArray = myAnswer ? myAnswer.split(',') : [];
      if (myAnswer.indexOf(number) > -1) {
        const index = tempArray.findIndex(item => item === number);
        tempArray.splice(index, 1);
        setSubMyAnswer(answerSubIndex, tempArray.length === 0 ? '' : tempArray.join(','));
      } else {
        tempArray.push(number);
        tempArray.sort();
        setSubMyAnswer(answerSubIndex, tempArray.join(','));
      }
    } else { // 단일 선택형
      setSubMyAnswer(answerSubIndex, number);
    }
  }

  return example.replaceAll(' ', '')
    .split(',').map((item, index) => <Col><Button shape={answerCount > 1 ? '' : 'circle'}
                                                  type={myAnswer.indexOf(item) > -1 ? 'primary' : ''}
                                                  key={index} onClick={() => onToggle(item)}>{item}</Button></Col>)
}

export default ObjectiveQuestion;
