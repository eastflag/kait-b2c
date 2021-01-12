import React, {useState} from 'react';
import {Col, Button} from "antd";

function ObjectiveQuestion({example, answer, index}) {
  const [myAnswer, setMyAnswer] = useState('');
  const answerCount = answer.split(',').length;

  const onToggle = (number) => {
    if (answerCount > 1) {
      let tempArray = myAnswer ? myAnswer.split(',') : [];
      if (myAnswer.indexOf(number) > -1) {
        const index = tempArray.findIndex(item => item === number);
        tempArray.splice(index, 1);
        setMyAnswer(tempArray.length === 0 ? '' : tempArray.join(','));
      } else {
        tempArray.push(number);
        tempArray.sort();
        setMyAnswer(tempArray.join(','));
      }
    } else {
      setMyAnswer(number);
    }
  }

  return example.replaceAll(' ', '')
    .split(',').map((item, index) => <Col><Button type={myAnswer.indexOf(item) > -1 ? 'primary' : ''} key={index} onClick={() => onToggle(item)}>{item}</Button></Col>)
}

export default ObjectiveQuestion;
