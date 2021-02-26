import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import api from "../../utils/api";
import {jwtUtils} from "../../utils/jwtUtils";
import {useHistory} from "react-router-dom";
import {Avatar, Button, List, Popconfirm, Badge} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {ROUTES_PATH} from "../../routes";
import {decreaseAlarmbyTeacher, decreaseAlarmbyUser, setAlarmbyUser} from "../../redux/reducers/AlarmReducer";

function TeacherRoom(props) {
  const token = useSelector(state => state.Auth.token);
  const [roomList, setRoomList] = useState([]);
  const history = useHistory();
  const alarmByUser = useSelector(state => state.Alarm.alarm_by_user)
  const dispatch = useDispatch();

  useEffect(() => {
    getRoomsOfTeacher();
  }, [alarmByUser])

  const getRoomsOfTeacher = async () => {
    const {data} = await api.get(`/api/chat/roomsOfTeacher`);
    console.log(data);
    setRoomList(data);

    const count = data.filter(room => room.roleName === 'user').length;
    dispatch(setAlarmbyUser(count));
  }

  const gotoChat = (room) => {
    history.push(`${ROUTES_PATH.Chat}?questionId=${room.questionId}&questionName=${room.questionName}`)
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
          <Button type="primary" ghost onClick={() => gotoChat(item)}>방입장</Button>
        </List.Item>
      )}
    >
    </List>
  );
}

export default TeacherRoom;
