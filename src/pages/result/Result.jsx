import React, {useEffect, useState} from 'react';
import api from "../../utils/api";
import {useSelector} from "react-redux";
import {Row, Col, Card, Statistic} from "antd";
import _ from "lodash";

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
      <h2>학습 결과</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{background: '#0000ff', color: '#ffffff'}}>
            <Statistic
              title="정답"
              value={correct}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{background: '#ff0000', color: '#ffffff'}}>
            <Statistic
              title="오답"
              value={wrong}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="정답률" precision={1} value={correctRate} suffix=" %" />
        </Col>
        <Col span={12}>
          <Statistic title="평균정답률" precision={1} value={averageCorrectRate} suffix=" %" />
        </Col>
      </Row>

      <h2>문항별 정오</h2>
      {
        answers.map((answer, index) => (
          <Row>

          </Row>
        ))
      }
    </>
  );
}

export default Result;
