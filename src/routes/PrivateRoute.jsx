import React from 'react';
import {Route, Redirect, Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ROUTES_PATH} from "./index";
import {jwtUtils} from "../utils/jwtUtils";
import {Layout, Row, Dropdown, Menu, Button, Typography} from "antd";
import {MenuOutlined, HomeTwoTone} from '@ant-design/icons';

import './PrivateRoute.scss';
import {setToken} from "../redux/reducers/AuthReducer";

const {Header, Content} = Layout;
const {Text} = Typography;

const PrivateRoute = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { component: RouteComponent, ...rest } = props;

  const token = useSelector(state => state.Auth.token);

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
    <Layout>
      <Row justify="space-between" align="middle" className="private_header">
        <HomeTwoTone onClick={() => history.push('/')} className="header__title" />
        <Dropdown overlay={menu} placement="bottomRight">
          <MenuOutlined className="header__menu" />
        </Dropdown>
      </Row>
      <Content style={{padding: '0 0.5rem'}}>
        <Route
          {...rest}
          render={routeProps =>
            jwtUtils.isAuth(token) ? (
              <RouteComponent {...routeProps} />
            ) : (
              <Redirect to={ROUTES_PATH.Login} />
            )
          }
        />
      </Content>
    </Layout>
  );
};


export default PrivateRoute
