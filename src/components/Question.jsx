import React from 'react';
import ObjectiveQuestion from "./ObjectiveQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import _ from 'lodash';

function Question({item_name, examples, answers, formulas}) {
  return (
    <div>
      <span>{item_name}</span>
      {
        examples.map((example, index) => {
          const subNumber = index > 0 ? <span>({index + 1})</span> : ''
          const question = example.length > 0 ? <ObjectiveQuestion example={example} answer={answers[index]}></ObjectiveQuestion> :
            <SubjectiveQuestion answer={answers[index]} formula={formulas[index]}></SubjectiveQuestion>
          return [subNumber, question]
        })
      }
    </div>
  );
}

export default Question;
