import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/app.js';
import {createStore} from 'redux';
import reducer from "./components/reducers/reducers";

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
