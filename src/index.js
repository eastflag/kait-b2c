import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";
import App from "./App";
import TagManager from 'react-gtm-module';
import {register} from './serviceWorker';

const tagManagerArgs = {
  gtmId: 'GTM-PJH3ZWM'
}
TagManager.initialize(tagManagerArgs)

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App></App>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const config = {
  /** @param {ServiceWorkerRegistration} registration */
  onSuccess: (registration) => {
    console.log("onSuccess", registration);
  },
  /** @param {ServiceWorkerRegistration} registration */
  onUpdate: (registration) => {
    console.log("onUpdate", registration);
  }
}
register(config);
