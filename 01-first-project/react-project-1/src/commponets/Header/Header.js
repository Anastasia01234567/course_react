import React from 'react';
import clasess from './Header.module.css';
import {NavLink} from "react-router-dom";

let Header = (props)=>{
    return(
        <header className={clasess.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png" alt=""/>
            <div className={clasess.auth}>
                {props.isAuth ? <div>{props.login} <button onClick={props.logout}>log out</button></div> :  <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header;