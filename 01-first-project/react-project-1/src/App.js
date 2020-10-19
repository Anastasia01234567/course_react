import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './commponets/Header'
import Navbar from './commponets/Navbar'
import Profile from './commponets/Profile'
import Footer from './commponets/Footer'

const App = () => {
    return (
        <main className="app-wrapper">
            <Header/>
            <Navbar/>
            <Profile/>
            <Footer/>
        </main>
    )
}
export default App;
