import React, {useEffect} from 'react';
import {Col, Layout, Row, Spin} from "antd";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import {ROUTES_PATH} from "./routes";
import Marking from "./pages/marking/Marking";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Main from "./pages/main/Main";
import Chapter from "./pages/chapter/Chapter";
import Result from "./pages/result/Result";
import Chat from "./pages/chat/Chat";
import Channel from "./pages/channel/Channel";
import UserRoom from "./pages/room/UserRoom";
import TeacherRoom from "./pages/room/TeacherRoom";

import './App.scss';
import {useSelector} from "react-redux";
import ModifyProfile from "./pages/my/ModifyProfile";
import ModifyPassword from "./pages/my/ModifyPassword";

const { Content } = Layout;

function App(props) {
  const loading = useSelector(state => state.Noti.loading);

  return (
    <Spin spinning={loading} size="large">
      <Layout>
        <Content>
          <Row justify="center">
            <Col xs={24} sm={18} md={12} lg={10} xl={8}>
              <BrowserRouter>
                <Switch>
                  <PrivateRoute exact path={ROUTES_PATH.Main} component={Main}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Chapter} component={Chapter}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Marking} component={Marking}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Result} component={Result}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Chat} component={Chat}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Channel} component={Channel}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.UserRoom} component={UserRoom}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.TeacherRoom} component={TeacherRoom}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Profile} component={ModifyProfile}></PrivateRoute>
                  <PrivateRoute exact path={ROUTES_PATH.Password} component={ModifyPassword}></PrivateRoute>
                  <Route exact path={ROUTES_PATH.Login} component={Login}></Route>
                  <Route exact path={ROUTES_PATH.SignUp} component={SignUp}></Route>
                </Switch>
              </BrowserRouter>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Spin>
  );
}

export default App;
