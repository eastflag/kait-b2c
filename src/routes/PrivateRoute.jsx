import React, {useEffect, useState} from 'react';
import {Route, Redirect, Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ROUTES_PATH} from "./index";
import {jwtUtils} from "../utils/jwtUtils";
import {Layout, Row, Dropdown, Menu, Typography, Space, notification} from "antd";
import {MenuOutlined, HomeTwoTone, TeamOutlined, QuestionCircleTwoTone} from '@ant-design/icons';

import './PrivateRoute.scss';
import {setToken} from "../redux/reducers/AuthReducer";
import {SocketContext, socketCreator} from "../context/socket";

const {Content} = Layout;
const {Text} = Typography;

const PrivateRoute = (props) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { component: RouteComponent, ...rest } = props;

  const token = useSelector(state => state.Auth.token);

  useEffect(() => {
    if (!jwtUtils.isAuth(token)) {
      return;
    }
    setSocket(socketCreator());
    return () => {
      if (socket) {
        socket.close();
      }
    }
  }, [])

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit('login', {
      userId: jwtUtils.getId(token),
      roleName: jwtUtils.getRoles(token).indexOf('teacher') >= 0 ? 'teacher' : 'user'
    }, (error) => {
      if(error) {
        notification.open({
          message: <span className="error-msg-title">An Error Has Occurred</span>,
          description: error,
          duration: 10,
        });
      }
    });
  }, [socket])

  // 아래 view가 리턴되지 않도록 한다. jwtUtils.getRoles() 실행시 에러 발생함.
  // 이후에 useEffect가 실행된다.
  if (!jwtUtils.isAuth(token)) {
    return <Redirect to={ROUTES_PATH.Login} />
  }

  const logout = () => {
    dispatch(setToken(''))
    history.push('/login');
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Text onClick={logout}>
          logout
        </Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <SocketContext.Provider value={socket}>
      <Layout>
        <Row justify="space-between" align="middle" className="private_header">
          <HomeTwoTone onClick={() => history.push(ROUTES_PATH.Main)} className="header__title" />
          <Space size="large" align="center">
            {
              jwtUtils.getRoles(token).indexOf('teacher') > -1 ?
                <TeamOutlined onClick={() => history.push(ROUTES_PATH.TeacherRoom)} className="header__menu"></TeamOutlined> :
                <QuestionCircleTwoTone onClick={() => history.push(ROUTES_PATH.UserRoom)} className="header__menu" />
            }

            <Dropdown overlay={menu} placement="bottomRight">
              <MenuOutlined className="header__menu" />
            </Dropdown>
          </Space>

        </Row>
        <Content style={{padding: '0 0.5rem'}}>
          <Route
            {...rest}
            render={
              routeProps => <RouteComponent {...routeProps} />
            }
          />
        </Content>
      </Layout>
    </SocketContext.Provider>
  );
};


export default PrivateRoute
