import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/App';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  )
);

function Entry() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(<Entry />, document.getElementById('app'));
