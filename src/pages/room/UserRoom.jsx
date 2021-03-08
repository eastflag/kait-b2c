import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import api from "../../utils/api";
import {jwtUtils} from "../../utils/jwtUtils";
import {List, Typography, Avatar, Button, Popconfirm, Badge} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {ROUTES_PATH} from "../../routes";
import {decreaseAlarmbyTeacher} from "../../redux/reducers/AlarmReducer";

function UserRoom({history}) {
  const token = useSelector(state => state.Auth.token);
  const [roomList, setRoomList] = useState([]);
  const alarmByTeacher = useSelector(state => state.Alarm.alarm_by_teacher)
  const dispatch = useDispatch();


  useEffect(() => {
    getRoomsOfUser();
  }, [alarmByTeacher])

  const getRoomsOfUser = async () => {
    const {data} = await api.get(`/api/chat/roomsOfUser?userId=${jwtUtils.getId(token)}`);
    console.log(data);
    setRoomList(data);
  }

  const confirm = async (item) => {
    const body = {
      questionId: item.questionId,
      userId: jwtUtils.getId(token),
      isJoined: false
    };
    const {data} = await api.put(`/api/chat/leaveRoom`, body);

    getRoomsOfUser();
  }

  const gotoChat = (room) => {
    if (jwtUtils.getRoles(token).indexOf('teacher') < 0 && room.isRead === 0) {
      dispatch(decreaseAlarmbyTeacher());
    }
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
              <Badge count={item.roleName === 'teacher' && item.isRead ===  0 ? 1 : 0}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Badge>
            }
            title={item.questionName}
/*            description={item.questionName}*/
          />

          <Popconfirm
            title={`${item.questionName} 방을 나가시겠습니까?`}
            onConfirm={() => confirm(item)}
            okText="예"
            cancelText="아니오"
          >
            <Button type="text" danger>방나가기</Button>
          </Popconfirm>
          <Button type="primary" ghost onClick={() => gotoChat(item)}>방입장</Button>
        </List.Item>
      )}
    >
    </List>
  );
}

export default UserRoom;
