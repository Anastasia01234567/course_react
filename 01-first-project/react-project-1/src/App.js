import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './commponets/Header/Header'
import Navbar from './commponets/Navbar/Navbar'
import Profile from './commponets/Profile/Profile'
import Footer from './commponets/Footer'
import {Route} from 'react-router-dom'
import DialogsContainer from "./commponets/Dialogs/DialogsContainer";
import UsersContainer from "./commponets/Users/UsersContainer";


const App = (props) => {
    // debugger;
    return (
            <main className="app-wrapper">
                <Header/>
                <Navbar state={props.appState.sidebar}/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={()=>
                        <Profile/>}/>
                    <Route path="/dialogs" render={() => <DialogsContainer />} />
                    <Route path='/users' render={ () => <UsersContainer/>}/>
                </div>
                <Footer/>
            </main>
    )
}
export default App;
