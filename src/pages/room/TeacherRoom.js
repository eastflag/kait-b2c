import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import api from "../../utils/api";
import {Avatar, Button, List, Popconfirm, Badge} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {ROUTES_PATH} from "../../routes";
import {setAlarmbyUser} from "../../redux/reducers/AlarmReducer";

function TeacherRoom({history}) {
  const [roomList, setRoomList] = useState([]);
  const alarmByUser = useSelector(state => state.Alarm.alarm_by_user)
  const dispatch = useDispatch();

  useEffect(() => {
    getRoomsOfTeacher();
  }, [alarmByUser])

  const getRoomsOfTeacher = async () => {
    const {data} = await api.get(`/api/chat/roomsOfTeacher`);
    console.log(data);
    data.sort(item => {
      if (item.roleName === 'user' && !item.isClear) {
        return -1;
      } else {
        return 0;
      }
    })
    setRoomList(data);

    const count = data.filter(room => (room.roleName === 'user') && !room.isClear).length;
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
              <Badge count={item.roleName === 'user' && !item.isClear ? 1 : 0}>
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
