import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from  './redux/state'
import {BrowserRouter} from "react-router-dom";


let rerenderEntireTree = (store) =>{
    // debugger;
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                < App
                    appState ={store.getState()}
                    dispatch = {store.dispatch.bind(store)}
                    store = {store}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store);
store.subscribe(rerenderEntireTree);
window.store = store;

serviceWorker.unregister();
