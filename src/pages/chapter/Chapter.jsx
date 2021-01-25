import React, {useEffect, useState} from 'react';
import api from "../../utils/api";
import _ from "lodash";
import {Row, Col} from "antd";

function Chapter({match}) {
  const [categorys, setCategorys] = useState([]);

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
      reactNodeList.push(<h3 style={{margin: '1rem 0 0.3rem 0'}}>{key}</h3>);
      categoryList[key].forEach(category => {
        reactNodeList.push(
          <Row key={category.code} align="middle">
            <Col style={{width: '2rem'}}></Col>
            <Col>{category.code + '. '}</Col>
            <Col>{category.name}</Col>
            <Col flex={1}><div style={{height: '1px', border: '1px dashed #bbbbbb', margin: '0 1rem'}}></div></Col>
            <Col>{category.start_page}</Col>
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
