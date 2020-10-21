import React from 'react'
import cls from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";
let Navbar = (props)=>{
    // debugger;
    return(
        <nav className={cls.nav}>
            <div className={cls.item}>
                <NavLink to="/profile" activeClassName={cls.active}>Profile</NavLink>
            </div>
            <div className={`${cls.item}`}>
                <NavLink to="/dialogs" activeClassName={cls.active}>Messages</NavLink>
            </div>
            <div className={cls.item}><a href="">News</a></div>
            <div className={cls.item}><a href="">Music</a></div>
            <div className={cls.item}><a href="">Settings</a></div>

            <div>
                <Friends friends={props.state.friends}/>
            </div>
        </nav>
    )
}
export default Navbar;