import React from 'react';
import cls from '../Dialogs.module.css'

const Message = (props)=>{
    // debugger;
    return(
        <div className={cls.message}>
            {props.message}
        </div>
    )
}

export default Message;