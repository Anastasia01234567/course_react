import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DialogItem from "./commponets/Dialogs/Dialogs";
import { addPost, updateNewPostText} from  './redux/state'
import {BrowserRouter} from "react-router-dom";


export let rerenderEntreTree = (state) =>{
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    appState ={state}
                    addPost={addPost}
                    updateNewPostText = {updateNewPostText}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


serviceWorker.unregister();
