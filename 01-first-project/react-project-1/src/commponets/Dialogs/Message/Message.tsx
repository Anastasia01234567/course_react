import React from 'react';
import { MessageType } from '../../../types/types';
import cls from '../Dialogs.module.css'
type Props = {
    message : MessageType
}

const Message: React.FC<Props> = (props) =>
{
    return(
        <div className={cls.message}>
            {props.message.message}
        </div>
    )
}

export default Message;