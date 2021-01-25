import React, {useEffect, useState} from 'react';
import Question from "../../components/Question";
import api from "../../utils/api";
import {Button} from "antd";

function QuestionList(props) {
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const mockup = [
    {"name": "0093", "examples":  "1,2,3,4", "equations": "X", "answers": "2"},
    {"name": "0094", "examples":  "1,2,3,4", "equations": "X", "answers": "1,2"},
    {"name": "0095", "examples":  "1,2,3,4|1,2,3,4", "equations": "X|X", "answers": "1,2|1"},
    {"name": "0096", "examples":  "X", "equations": "@^{@} \\times @^{@}", "answers": "2,5,3,4"},
    {"name": "0097", "examples":  "1,2,3,4|X", "equations": "X|@^{@} \\times @^{@}|@^{@} \\times @^{@}", "answers": "3|2,5,3,4"}
  ]

  useEffect(() => {
    getQuestions();
  }, [])

  const getQuestions = async () => {
    const chapter_id = 1;
    const userId = 1;
    const {data} = await api.get(`/api/question/chapter_id/${chapter_id}?userId=${userId}`);
    setOriginalQuestions(data);
    console.log(data);

    const result = data.map(item => {
      // 문제 갯수만큼 정답지를 생성 ,서브 문제가 있을 경우 | 를 갯수 만큼 추가\
      // Array(item.answers.split('|').length).join('|') => 2개면 '|'
      myAnswers.push(Array(item.answers.split('|').length).join('|'));

      return  {
        name: item.name,
        userAnswers: item.userAnswers ? item.userAnswers.split('|') : '',
        examples: item.examples.split('|'),
        equations: item.equations.split('|'),
        answers: item.answers.split('|')
      }
    })

    setQuestions(result);
    setMyAnswers([...myAnswers]);
  }

  const setMyAnswer = (index, value) => {
    myAnswers[index] = value;
    setMyAnswers([...myAnswers]);
  }

  const submit = async () => {
    const userId = 1;
    console.log(myAnswers);
    const dataList = [];
    const regex = new RegExp("[0-9]+");

    originalQuestions.forEach((question, index) => {
      // 정답이 있는 경우만 체크한다. 서브 문제인 경우 모든 문제가 체크되어야 한다.
      const check = myAnswers[index].split('|')
        .map((subMyAnswer, subIndex) => { // 서브 문제
          if (question.examples.split('|')[subIndex] === 'X') { // 주관식일 경우 숫자가 한개이상 있고 콤마 사이에 모든 숫자가 있어야 한다.
            return regex.test(subMyAnswer) && !(subMyAnswer.startsWith(',') || subMyAnswer.endsWith(',') || subMyAnswer.indexOf(',,') > -1) ? true : false;
          } else { // 객관식일 경우.
            return !!subMyAnswer;
          }
        })
        .every(item => item); // 모든 서브 문제가 true인지 체크

      if (check) {
        dataList.push({
          questionId: question.id,
          answer: myAnswers[index],
          score: myAnswers[index] === question.answers
        })
      }
    })
    console.log(dataList);
    const {data} = await api.post(`/api/user/submitAnswer?userId=${userId}`, dataList);
    console.log(data);
  }

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
        questions.map((question, index) => <Question key={question.name} name={question.name} examples={question.examples}
                                            answers={question.answers} equations={question.equations} userAnswers={question.userAnswers}
                                            myAnswer={myAnswers[index]} setMyAnswer={setMyAnswer} answerIndex={index}></Question>)
      }
      <Button block ghost type="primary" onClick={submit}>제출</Button>
    </>
  );
}

export default QuestionList;