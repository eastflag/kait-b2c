import React, {useEffect, useState} from 'react';
import api from "../../utils/api";
import {useSelector} from "react-redux";
import {Typography, Row, Col, Card, Statistic, Button, Space} from "antd";
import _ from "lodash";

const {Title, Text} = Typography;

function Result({match}) {
  const user = useSelector(state => state.Auth.user);
  const [correctRate, setCorrectRate] = useState(0);
  const [averageCorrectRate, setAverageCorrectRate] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getResult(match.params['chapter_id']);
  }, [])

  const getResult = async (chapter_id) => {
    // 전체 정답율 total, score
    const res = await api.get(`/api/answer/result/${chapter_id}`);
    console.log(res.data);
    const total = Number(res.data['total']);
    const score = Number(res.data['score']);
    if (total) {
      setAverageCorrectRate(score/total*100);
    }

    // 학생 정답율
    const {data} = await api.get(`/api/user/result/chapter/${chapter_id}?userId=${user.id}`);
    const userTotal = data.length;
    const userScore = _.sumBy(data, 'score')
    setCorrect(userScore);
    setWrong(userTotal - score);
    setCorrectRate(score / total * 100);

    setAnswers(data);
  }

  return (
    <>
      <Title level={3}>학습 결과</Title>
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

      <Title level={3}>문항별 정오</Title>
      {
        answers.map(answer => (
          <Row key={answer.name} justify="space-between" align="middle" style={{margin: '0.3rem'}}>
            <Text>{answer.name}</Text>
            <Text>{answer.score ? 'O' : 'X'}</Text>
            <Space>
              <Button type="primary" ghost shape="round" size="small">도입</Button>
              <Button type="primary" ghost shape="round" size="small">풀이</Button>
              <Button type="primary" ghost shape="round" size="small">채팅</Button>
            </Space>
          </Row>
        ))
      }
    </>
  );
}

export default Result;
