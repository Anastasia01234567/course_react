import React from 'react';
import cls from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import AddMessageReduxForm from "./AddMessageForm";
import { InitialStateType } from '../../redux/dialogs-reducer'


type PropsType = {
    dialogsPage: InitialStateType,
    sendMessage : (newText: string)=> void
}
export type NewMessageFormValue = {
    newMessageBody: string
}
const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;
    let diaologsElements = state.dialogs.map((dialog) => <DialogItem dialog={dialog} key={dialog.id}/>);
    let messagesElemnts = state.messages.map(msg =>
    {
      return  <Message message={msg} key={msg.id}/>
    });
    let addNewMessage = (values:NewMessageFormValue)=>{
        props.sendMessage(values.newMessageBody)
    };
    return (
        <div className="">
            <h1>Dialogs</h1>
            <div className={cls.dialogs}>
            <div className={cls.dialogs_items}>
                    {diaologsElements}
            </div>
                <div className={cls.messages}>
                   {messagesElemnts}
                    <div>
                        <AddMessageReduxForm onSubmit={addNewMessage}  />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dialogs;