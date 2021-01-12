import React, {useEffect, useState} from 'react';
import Latex from "react-latex";
import { Input } from "antd";

function SubjectiveQuestion({equation, index}) {
  console.log('SubjectiveQuestion', index)
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAnswer(equation);
  }, [])

  const onChange = (e) => {
    console.log(e.target.value);
    const inputList = e.target.value.split(',');
    let copyEquation = equation;
    inputList.forEach(item => {
      if (item) {
        copyEquation = copyEquation.replace('@', item);
      }
    })
    console.log(copyEquation);
    setAnswer(copyEquation)
  }

  return (
    <div>
      <Latex displayMode={true}>{`\$\$${answer}\$\$`}</Latex>
      <div>
        <Input placeholder=", 로 분리하세요" onChange={onChange}/>
      </div>
    </div>
  );
}

export default SubjectiveQuestion;
