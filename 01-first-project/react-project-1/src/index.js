import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DialogItem from "./commponets/Dialogs/Dialogs";
import {state} from  './redux/state'
import {BrowserRouter} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <App  appState ={state}/>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
