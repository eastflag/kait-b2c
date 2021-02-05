import React, {useEffect} from 'react';
import {Button} from "antd";

function Channel(props) {
  useEffect(() => {
    window.Kakao.Channel.chat({
      channelPublicId: '_zYxheK'
    });
  }, [])

  return (
    <div>
      <Button ghost type="primary" block>돌아가기</Button>
    </div>
  );
}

export default Channel;
