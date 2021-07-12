import React from 'react';
import cls from '../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import { DialogType } from '../../../types/types';

type Props = {
    dialog: DialogType
}

const DialogItem:React.FC<Props> = (props) => {
    return (
        <div className={cls.dialog}>
            <img src={props.dialog.avatar} alt="" className={cls.dialog_avatar}/>
            <NavLink to={"/dialogs/" + props.dialog.id}>{props.dialog.name}</NavLink>
        </div>
    )
}

export default DialogItem;