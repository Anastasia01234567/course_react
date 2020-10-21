import React from 'react';
import cls from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";



const Dialogs = (props) => {
    let diaologsElements = props.state.dialogs.map((dialog) => <DialogItem state={dialog} />)
    let messagesElemnts = props.state.messages.map( message => <Message message={message.message}/>)
    return (
        <div className="">
            <h1>Dialogs</h1>
            <div className={cls.dialogs}>
                <div className={cls.dialogs_items}>
                    {diaologsElements}
                </div>
                <div className={cls.messages}>
                    {messagesElemnts}
                </div>
            </div>
        </div>
    )
}
export default Dialogs;