import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ROUTES_PATH} from "./routes";
import Marking from "./pages/marking/Marking";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import PrivateRoute from "./routes/PrivateRoute";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path={ROUTES_PATH.Main} component={Marking}></PrivateRoute>
          <PrivateRoute exact path={ROUTES_PATH.Marking} component={Marking}></PrivateRoute>
          <Route exact path={ROUTES_PATH.Login} component={Login}></Route>
          <Route exact path={ROUTES_PATH.SignUp} component={SignUp}></Route>
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
