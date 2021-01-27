import React, {useEffect, useState} from 'react';
import {Typography, Layout} from "antd";
import QuestionList from "./QuestionList";
import './Marking.css';
import api from "../../utils/api";
import {useSelector} from "react-redux";

const { Content } = Layout;
const {Title, Text} = Typography;

function Marking({match}) {
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);

  const user = useSelector(state => state.Auth.user);

  useEffect(() => {
    getQuestions(match.params['chapter_id']);
  }, [])

  const getQuestions = async (chapter_id) => {
    const {data} = await api.get(`/api/question/chapter_id/${chapter_id}?userId=${user.id}`);
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

    setMyAnswers([...myAnswers]);
    setQuestions(result);
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

  return (
    <Layout>
      <Title level={4}>답안 입력</Title>
      <Content style={{padding: '0 1rem'}}>
        <QuestionList questions={questions} myAnswers={myAnswers} setMyAnswer={setMyAnswer} submit={submit}></QuestionList>
      </Content>
    </Layout>
  );
}

export default Marking;
