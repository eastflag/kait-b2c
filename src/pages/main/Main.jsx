import React, {useEffect, useState} from 'react';
import {Row, Col, Image, Space, Badge, Button} from "antd";
import api from "../../utils/api";
import {useSelector} from "react-redux";

import "./Main.scss";
import {BookTwoTone} from "@ant-design/icons";
import moment from "moment";

function Main(props) {
  const user = useSelector(state => state.Auth.user);
  const [textbooks, setTextbooks] = useState([]);

  useEffect(() => {
    getTextbook();
  }, [])

  const getTextbook = async () => {
    const {data} = await api.get(`/api/user/getTextbook?userId=${user.id}`);
    console.log(data);

    data.forEach(textbook => {
      textbook['total_question'] = Number(textbook['total_question']);
      textbook['total_progress'] = Number(textbook['total_progress']);
      textbook['total_score'] = Number(textbook['total_score']);
      textbook['status'] = !textbook['recent_date'] ? '미학습' : '학습중';
      if (textbook['recent_date']) {
        const today = moment();
        const date = moment("2021-01-22T07:54:39.811Z");
        textbook['recent_date_text'] = moment(textbook['recent_date']).from(today);
      }
    })

    setTextbooks(data);
  }

  return (
    <>
      <Row justify="space-between">
        <h2>교재선택</h2>
        <span>+</span>
      </Row>
      {
        textbooks.map(textbook => (
          <Row key={textbook.id} className="textbook" align="middle">
            <Col span={8}>
              <div style={{padding: '1.3rem 0.3rem'}}>
                <Badge count={textbook.total_question - textbook.total_progress}>
                  <Image
                    className="textbook_image"
                    src={textbook.image_url}
                  />
                </Badge>
              </div>
            </Col>
            <Col span={16}>
              {
                textbook['status'] === '학습중' ? (
                  <Space className="textbook_content" direction="vertical" size={4}>
                    <Row>
                      <Col span={10}>진행률</Col>
                      <Col span={14}>{Math.round(textbook.total_progress/textbook.total_question * 100)} %</Col>
                    </Row>
                    <Row>
                      <Col span={10}>정답률</Col>
                      <Col span={14}>{Math.round(textbook.total_score / textbook.total_progress * 100)} %</Col>
                    </Row>
                    <Row>
                      <Col span={10}>최근학습</Col>
                      <Col span={14}>{textbook['recent_date_text']}</Col>
                    </Row>
                    <Row>
                      <Col span={10}>남은문항</Col>
                      <Col span={14}>{textbook.total_question - textbook.total_progress} / {textbook.total_question} 문항</Col>
                    </Row>
                    <Row justify="space-between">
                      <Button type="primary" ghost>학습하기</Button>
                      <Button type="primary" ghost>채점결과</Button>
                    </Row>
                  </Space>
                ) : (
                  <div style={{padding: '0 0.5rem 0 1.5rem'}}>
                    <Button type="primary" ghost block>학습시작</Button>
                  </div>
                )
              }
            </Col>
          </Row>
        ))
      }
    </>
  );
}

export default Main;
