import React from 'react';
import cls from '../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={cls.dialog}>
            <img src={props.state.avatar} alt="" className={cls.dialog_avatar}/>
            <NavLink to={"/dialogs/" + props.id}>{props.state.name}</NavLink>
        </div>
    )
}

export default DialogItem;