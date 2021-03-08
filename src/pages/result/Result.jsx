import React, {useEffect, useState} from 'react';
import api from "../../utils/api";
import {useSelector} from "react-redux";
import {Typography, Row, Col, Card, Statistic, Button, Space, Layout} from "antd";
import _ from "lodash";
import {jwtUtils} from "../../utils/jwtUtils";

const {Title, Text} = Typography;

function Result({history, match}) {
  const [textbook, setTextbook] = useState({
    name: '',
    semester: '',
    category: '',
    categoryCode: '',
    categoryName: ''
  })
  const token = useSelector(state => state.Auth.token);
  const [correctRate, setCorrectRate] = useState('');
  const [averageCorrectRate, setAverageCorrectRate] = useState('');
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getResult(match.params['chapter_id']);
  }, [])

  const getResult = async (chapter_id) => {
    const res = await api.get(`/api/chapter/detail/${chapter_id}}`);
    console.log(res.data);
    if (res.data) {
      setTextbook({
        name: res.data.name,
        semester: res.data.semester,
        category: res.data.chapters[0].category,
        categoryCode: res.data.chapters[0].code,
        categoryName: res.data.chapters[0].name
      });
    }

    // 전체 정답율 total, score
    const res2 = await api.get(`/api/answer/result/${chapter_id}`);
    // console.log(res.data);
    const total = Number(res2.data['total']);
    const score = Number(res2.data['score']);
    if (total) {
      setAverageCorrectRate((score/total*100).toFixed(1));
    }

    // 학생 정답율
    const {data} = await api.get(`/api/user/result/chapter/${chapter_id}?userId=${jwtUtils.getId(token)}`);
    const userTotal = data.length;
    const userScore = _.sumBy(data, 'score')
    setCorrect(userScore);
    setWrong(userTotal - userScore);
    setCorrectRate((userScore / userTotal * 100).toFixed(1));

    setAnswers(data);
  }

  const addChannel = () => {
    window.Kakao.Channel.addChannel({
      channelPublicId: '_zYxheK',
    })
  }

  const gotoChannel = async (answer, help) => {
    // console.log(answer);

    const {data} = await api.get(`/api/question/id?questionId=${answer.questionId}`);
    if (data && data.length > 0) {
      // 저장
      await api.post(`/api/user/saveChannelHistory?userId=${jwtUtils.getId(token)}&questionId=${answer.questionId}&type=${help}`);
      // 이동
      const {code, semester, page_number, name} = data[0];
      history.push(`/channel?code=${code}&semester=${semester}&page_number=${page_number}&name=${name}&help=${help}`);
    }
  }

  const gotoChat = async (answer) => {
    const {data} = await api.get(`/api/question/id?questionId=${answer.questionId}`);

    const {code, semester, page_number, textbook_name, name} = data;
    const questionName = `${textbook_name} ${semester} ${name}`;

    history.push(`/chat?questionId=${answer.questionId}&questionName=${questionName}`);
  }

  return (
    <>
      <Title style={{fontSize: '1.4rem', margin: '0 0 0.5rem 0'}}>{`${textbook.name} ${textbook.semester}`}</Title>
      <Title style={{fontSize: '1.4rem', margin: '0 0 0.5rem 0', paddingLeft: '2rem'}}>{`${textbook.category}`}</Title>
      <Title style={{fontSize: '1.4rem', margin: '0 0 1rem 0', paddingLeft: '4rem'}}>{`${textbook.categoryCode} ${textbook.categoryName}`}</Title>
      <h2>학습 결과</h2>
      <Row gutter={16} justify="center">
        <Col>
          <Space direction="vertical" align="center">
            <Text>정답</Text>
            <div style={{display: 'inline-block', padding: '0 2rem', border: '1px solid #bbbbbb', borderRadius: '2rem'}}>
              <Text strong style={{fontSize: '3rem', color: 'blue'}}>{correct}</Text>
            </div>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical" align="center">
            <Text>오답</Text>
            <div style={{display: 'inline-block', padding: '0 2rem', border: '1px solid #bbbbbb', borderRadius: '2rem'}}>
              <Text strong style={{fontSize: '3rem', color: 'red'}}>{wrong}</Text>
            </div>
          </Space>
        </Col>
      </Row>
      <Row justify="space-around" style={{margin: '1rem 0 2rem 0'}}>
        <Space direction="vertical" align="center">
          <Text>정답률</Text>
          <Text strong style={{fontSize: '2rem'}}>{correctRate}%</Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text>평균정답률</Text>
          <Text strong style={{fontSize: '2rem'}}>{averageCorrectRate}%</Text>
        </Space>
      </Row>

      <h2>문항별 정오</h2>
      {
        answers.map(answer => (
          <Row key={answer.name} justify="space-between" align="middle" style={{margin: '0.3rem'}}>
            <Text>{answer.name}</Text>
            <Text>{answer.score ? 'O' : 'X'}</Text>
            <Space>
              <Button type="primary" ghost shape="round" size="small" onClick={() => gotoChat(answer, 'intro')}>도입</Button>
              <Button type="primary" ghost shape="round" size="small" onClick={() => gotoChat(answer, 'solve')}>풀이</Button>
              <Button type="primary" ghost shape="round" size="small" onClick={() => gotoChat(answer, 'chat')}>채팅</Button>
            </Space>
          </Row>
        ))
      }
    </>
  );
}

export default Result;
