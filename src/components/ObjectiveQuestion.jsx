import React, {useEffect, useState} from 'react';
import {Col, Button} from "antd";
import classNames from 'classnames';

function ObjectiveQuestion({example, answer, userAnswer, myAnswer, setSubMyAnswer, answerSubIndex}) {
  const answerCount = answer.split(',').length;

  const onToggle = (number) => {
    if (userAnswer) {
      return;
    }
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
    .split(',').map((item, index) =>
      <Col key={index}>
        <Button size="small"
          shape={answerCount > 1 ? '' : 'circle'}
          type={myAnswer.indexOf(item) > -1 ? 'primary' : ''}
          className={classNames({'btn-disabled-selected ': userAnswer.indexOf(item) > -1})}
          disabled={userAnswer}
          onClick={() => onToggle(item)}>{item}
        </Button>
      </Col>)
}

export default ObjectiveQuestion;
