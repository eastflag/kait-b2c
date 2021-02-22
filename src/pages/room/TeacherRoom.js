import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import api from "../../utils/api";
import {jwtUtils} from "../../utils/jwtUtils";
import {useHistory} from "react-router-dom";
import {Avatar, Button, List, Popconfirm, Badge} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {ROUTES_PATH} from "../../routes";

function TeacherRoom(props) {
  const token = useSelector(state => state.Auth.token);
  const [roomList, setRoomList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getRoomsOfTeacher();
  }, [])

  const getRoomsOfTeacher = async () => {
    const {data} = await api.get(`/api/chat/roomsOfTeacher`);
    console.log(data);
    setRoomList(data);
  }

  return (
    <List
      header={<div>질문리스트</div>}
      bordered
      dataSource={roomList}
      renderItem={item => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={
              <Badge count={item.roleName === 'user' ? 1 : 0}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Badge>
            }
            title={item.questionName}
            /*            description={item.questionName}*/
          />
          <Button type="primary" ghost onClick={() => history.push(`${ROUTES_PATH.Chat}?questionId=${item.questionId}&questionName=${item.questionName}`)}>방입장</Button>
        </List.Item>
      )}
    >
    </List>
  );
}

export default TeacherRoom;
