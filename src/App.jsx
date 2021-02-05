import React, {useEffect} from 'react';
import {Col, Layout, Row} from "antd";
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
import {io} from 'socket.io-client';
import Channel from "./pages/channel/Channel";

const { Content } = Layout;

const socket = io('/chatServer');

function App(props) {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect')
    });
    socket.on('disconnect', () => {
      console.log('disconnect')
    });
    socket.on('message', data => {
      console.log('message: ', data)
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  return (
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
                <Route exact path={ROUTES_PATH.Login} component={Login}></Route>
                <Route exact path={ROUTES_PATH.SignUp} component={SignUp}></Route>
              </Switch>
            </BrowserRouter>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
