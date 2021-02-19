import React, {useState} from 'react';
import {useSelector} from "react-redux";
import api from "../../utils/api";
import {jwtUtils} from "../../utils/jwtUtils";

function TeacherRoom(props) {
  const token = useSelector(state => state.Auth.token);
  const [roomList, setRoomList] = useState([]);

  useState(() => {

  }, [])

  const getRoomsOfUser = async () => {
    const {data} = await api.get(`/api/chat/roomsOfTeacher}`);
    console.log(data);
    setRoomList(data);
  }

  return (
    <div></div>
  );
}

export default TeacherRoom;
