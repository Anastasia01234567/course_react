import React from 'react';
import cls from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import AddMessageReduxForm from "./AddMessageForm";



const Dialogs = (props) => {
    // debugger;
    let state = props.dialogsPage;
    let diaologsElements = state.dialogs.map((dialog) => <DialogItem state={dialog} key={dialog.id}/>);
    let messagesElemnts = state.messages.map( message =>{
      return  <Message message={message.message} key={message.id}/>
    });
    // console.log(messagesElemnts)

    let addNewMessage = (values)=>{
        props.sendMessage(values.newMessageBody)
    }
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
                        <AddMessageReduxForm onSubmit={addNewMessage} />
                    </div>
                    {/*<div>*/}
                        {/*<textarea className={cls.text_area_msg} ref={refTextArea} name="" id="" cols="30" rows="10" placeholder='Enter your  message'*/}
                                  {/*value={state.NewMessageText} onChange={onUpdateMessageChange}></textarea>*/}
                      {/*<div style={{textAlign: 'center', marginTop: '30px'}}>*/}
                          {/*<button type="button" onClick={onSendMessageClick} className={cls.button_send}>Send</button>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}


export default Dialogs;