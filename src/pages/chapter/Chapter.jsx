import React, {useEffect, useState} from 'react';
import api from "../../utils/api";
import _ from "lodash";
import {Row, Col, Typography} from "antd";
import {useHistory} from "react-router";

const {Title, Text} = Typography;

function Chapter({match}) {
  const [categorys, setCategorys] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(match.params);
    getChapter(match.params['textbook_id'])
  }, [])

  const getChapter = async (textbook_id) => {
    const {data} = await api.get(`/api/chapter/textbook_id/${textbook_id}`);
    console.log(data);

    const categoryList = _.groupBy(data, 'category');
    console.log(categoryList);
    const reactNodeList = [];
    for (let key in categoryList) {
      reactNodeList.push(<Title level={4} style={{margin: '1rem 0 0.3rem 0'}} key={key}>{key}</Title>);
      categoryList[key].forEach(category => {
        reactNodeList.push(
          <Row key={category.code} align="middle" onClick={() => history.push(`/marking/${category.id}`)}>
            <Col style={{width: '1rem'}}></Col>
            <Col>
              <Text>{category.code + '. '}</Text>
            </Col>
            <Col>
              <Text>{category.name}</Text>
            </Col>
            <Col flex={1}><div style={{height: '1px', border: '1px dashed #bbbbbb', margin: '0 0.7rem'}}></div></Col>
            <Col>
              <Text>{category.start_page}</Text>
            </Col>
          </Row>
        );
      })
    }

    setCategorys(reactNodeList)
  }

  return (
    <>
      <h2>단원 선택</h2>
      {
        categorys
      }
    </>
  );
}

export default Chapter;
