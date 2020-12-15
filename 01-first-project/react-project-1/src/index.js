import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store'
import {BrowserRouter} from "react-router-dom";
import Provider from "react-redux/es/components/Provider";


//url api https://social-network.samuraijs.com/docs

// let rerenderEntireTree = (store) => {
    // debugger;

    ReactDOM.render(
            <BrowserRouter>
                <Provider store={store}>
                    < App
                        appState={store.getState()}
                        dispatch={store.dispatch.bind(store)}
                        store={store}
                    />
                </Provider>
            </BrowserRouter>,
        document.getElementById('root')
    );
// }

// rerenderEntireTree(store);
// store.subscribe(() => {
//     rerenderEntireTree(store)
// });
// window.store = store;

serviceWorker.unregister();
