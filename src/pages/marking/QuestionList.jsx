import React, {useEffect, useState} from 'react';
import Question from "../../components/Question";
import api from "../../utils/api";
import {Affix, Button} from "antd";

function QuestionList({questions, myAnswers, setMyAnswer, submit}) {

  const s1 = 'What is $(3\\times 4) \\div (5-3)$'
  const s2 = '$$(3\\times 4) \\div (5-3)$$'

  return (
    <>
{/*      <h3>
        <Latex>{s1}</Latex>
      </h3>
      <h2>
        <Latex displayMode={true}>{s2}</Latex>
      </h2>*/}
      {
        questions.map((question, index) => <Question key={question.id} id={question.id} name={question.name} examples={question.examples}
                                            answers={question.answers} equations={question.equations} userAnswers={question.userAnswers}
                                            myAnswer={myAnswers[index]} setMyAnswer={setMyAnswer} answerIndex={index}></Question>)
      }
      <Affix offsetBottom={5}>
        <Button block type="primary" onClick={submit}>제출</Button>
      </Affix>
    </>
  );
}

export default React.memo(QuestionList);
