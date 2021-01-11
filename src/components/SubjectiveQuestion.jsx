import React, {useEffect, useState} from 'react';
import Latex from "react-latex";

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
        <input type="text" onChange={onChange}/>
      </div>
    </div>
  );
}

export default SubjectiveQuestion;
