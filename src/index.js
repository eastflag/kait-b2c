import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ROUTES} from "./routes";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {
        ROUTES.map(route => (
          <Route key={route.key}
                 path={route.path}
                 exact={route.exact}
                 render={(props) =><route.component {...props}></route.component>}>
          </Route>
        ))
      }
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
