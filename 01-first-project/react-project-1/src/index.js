import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSAPP from './App';
import * as serviceWorker from './serviceWorker';

//url api https://social-network.samuraijs.com/docs
    ReactDOM.render(
        <SamuraiJSAPP/>   ,
        document.getElementById('root')
);

serviceWorker.unregister();
