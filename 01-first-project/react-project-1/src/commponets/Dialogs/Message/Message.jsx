import React from 'react';
import cls from '../Dialogs.module.css'

const Message = (props)=>{
    return(
        <div className={cls.message}>
            {props.message}
        </div>
    )
}

export default Message;