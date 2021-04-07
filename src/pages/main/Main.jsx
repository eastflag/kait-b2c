import React, {useEffect, useState} from 'react';
import {Row, Col, Image, Space, Badge, Button} from "antd";
import api from "../../utils/api";
import {useSelector} from "react-redux";
import "./Main.scss";
import moment from "moment";
import {jwtUtils} from "../../utils/jwtUtils";
import classNames from 'classnames';
import _ from 'lodash';

function Main({history}) {
  const token = useSelector(state => state.Auth.token);
  const [textbooks, setTextbooks] = useState([]);
  const [semester, setSemester] = useState([
    { label: '중 1', selected: false},
    { label: '중 2', selected: false},
    { label: '중 3', selected: false},
    { label: '고 1', selected: false},
    { label: '고 2', selected: false},
    { label: '고 3', selected: false}
  ]);

  useEffect(() => {
    getTextbook();
  }, [])

  const getTextbook = async () => {
    const {data} = await api.get(`/api/user/getTextbook?userId=${jwtUtils.getId(token)}`);
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

  const toggleButton = label => {
    let newSemester = semester.map(item => {
      if (item.label === label) {
        item.selected = !item.selected;
      }
      return {...item};
    });
    setSemester(newSemester);
  }

  return (
    <>
      <Row justify="space-between">
        <h2>교재선택</h2>
        <span></span>
      </Row>
      <Row>
        {
          semester.map((item, index) =>
            <Col style={{margin: 0, padding: 0}} key={index} flex={1}>
              <Button block onClick={() => toggleButton(item.label)} ghost={!item.selected} primary={item.selected}>
                {item.label}</Button>
            </Col>)
        }
      </Row>
      {
        textbooks.map(textbook => (
          <Row key={textbook.id} className="textbook" align="middle">
            <Col span={8}>
              <div style={{padding: '1.3rem 0.3rem'}}>
                <Badge count={textbook.status === '학습중' ? (textbook.total_question - textbook.total_progress) : 0} overflowCount={999}>
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
                    <Row justify="space-between" align="middle">
                      <Col span={10}>{`${textbook.name} ${textbook.semester}`}</Col>
                      <Col span={14}><Button type="primary" ghost block onClick={() => history.push(`/chapter/${textbook.id}`)}>학습하기</Button></Col>
                      {/*<Button type="primary" ghost>채점결과</Button>*/}
                    </Row>
                  </Space>
                ) : (
                  <div style={{padding: '0 0.5rem 0 1.5rem'}}>
                    <Row justify="space-between" align="middle">
                      <Col span={10}>{`${textbook.name} ${textbook.semester}`}</Col>
                      <Col span={14}> <Button type="primary" ghost block onClick={() => history.push(`/chapter/${textbook.id}`)}>학습시작</Button></Col>
                    </Row>
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
