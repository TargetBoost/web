import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/app.js';
import {createStore} from 'redux';
import reducer from "./components/reducers/reducers";

const store = createStore(reducer);

// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
