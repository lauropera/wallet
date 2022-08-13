import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
