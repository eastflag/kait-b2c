import React from 'react';
import ObjectiveQuestion from "./ObjectiveQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import {Row, Col, Button} from "antd";
import api from "../utils/api";
import {useHistory} from "react-router-dom";

function Question({id, name, examples, answers, equations, userAnswers, myAnswer, setMyAnswer, answerIndex}) {
  const history = useHistory();

  const setSubMyAnswer = (subIndex, value) => {
    // 서브 문제가 없는 경우
    if (answers.length === 1) {
      setMyAnswer(answerIndex, value);
    } else { // 서브 문제가 있는 경우
      const subAnswerList = myAnswer.split('|');
      subAnswerList[subIndex] = value;
      setMyAnswer(answerIndex, subAnswerList.join('|'));
    }
  }

  const gotoChat = async () => {
    const {data} = await api.get(`/api/question/id?questionId=${id}`);

    const {code, semester, page_number, textbook_name, name} = data;
    const questionName = `${textbook_name} ${semester} ${name}`;

    history.push(`/chat?questionId=${id}&questionName=${questionName}`);
  }

  return (
    <>
      <Row className="question">
        <Col className="name-title"><h3>{name}</h3></Col>
        <Col flex="auto">
          {/*서브문제가 있는 경우를 고려*/}
          {
            examples.map((example, index) => {
              return (
                <Row justify="space-between" key={index}>
                  {
                    examples.length > 1 ? <Col>({index + 1})</Col> : ''
                  }
                  {
                    example.indexOf('X') > -1 ? <SubjectiveQuestion index={name + index.toString()}
                                                    answer={answers[index]} equation={equations[index]} userAnswer={userAnswers ? userAnswers[index] : ''}
                                                    myAnswer={myAnswer.split('|')[index]} setSubMyAnswer={setSubMyAnswer} answerSubIndex={index}></SubjectiveQuestion> :
                      <ObjectiveQuestion index={name + index.toString()} example={example}
                          answer={answers[index]} userAnswer={userAnswers ? userAnswers[index] : ''}
                          myAnswer={myAnswer.split('|')[index]} setSubMyAnswer={setSubMyAnswer} answerSubIndex={index}></ObjectiveQuestion>
                  }
                </Row>
              )
            })
          }
        </Col>
        <Col className="question-button">
          <Button ghost type="primary" size="small" onClick={() => gotoChat()}>질문</Button>
        </Col>
      </Row>
    </>
  );
}

export default React.memo(Question);
