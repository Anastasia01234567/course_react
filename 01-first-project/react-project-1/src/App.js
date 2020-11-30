import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './commponets/Header/Header'
import Navbar from './commponets/Navbar/Navbar'
import Profile from './commponets/Profile/Profile'
import Footer from './commponets/Footer'
import Dialogs from './commponets/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom'


const App = (props) => {
    return (
            <main className="app-wrapper">
                <Header/>
                <Navbar state={props.appState.sidebar}/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={()=>
                        <Profile
                        state={props.appState.profilePage}
                        dispatch = {props.dispatch}
                    />}/>
                    <Route path="/dialogs" render={() => <Dialogs  store={props.store}/>} />
                </div>
                <Footer/>
            </main>
    )
}
export default App;
