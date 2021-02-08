import React, {useEffect, useState} from 'react';
import {Button, Typography} from "antd";
import queryString from 'query-string';

const {Title, Text} = Typography;

function Channel({location, history}) {
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    // console.log(location.search);
    // console.log(queryString.parse(location.search));
    setQueryParams(queryString.parse(location.search))
    window.Kakao.Channel.chat({
      channelPublicId: '_zYxheK'
    });
  }, [])

  return (
    <div>
      <Title level={2}>상담요청</Title>
      <Text>{queryParams.name}에 대한 상담을 요청하였습니다.</Text>
      <Button ghost type="primary" block onClick={() => history.goBack()} style={{marginTop: '1rem'}}>돌아가기</Button>
    </div>
  );
}

export default Channel;
