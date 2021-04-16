import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";
import App from "./App";
import {register} from './serviceWorker';
import GA4React from "ga-4-react";

const ga4react = new GA4React("G-6Y0ZL44ETQ");

const persistor = persistStore(store);

(async () => {
  // 광고차단과 같은 크롬 익스텐션 사용시 에러가 발생한다.
  try {
    await ga4react.initialize();
  } catch {

  }

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App></App>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
})();

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
