import React from 'react';
import {sendMessageCreateAction, updateMessageTextCreateAction} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const DialogsContainer = (props) => {
//     let state = props.store.getState().dialogsPage;
//
//     let sendMessage = () => {
//         props.store.dispatch(sendMessageCreateAction());
//     }
//     let updateMessage = (body) => {
//         props.store.dispatch(updateMessageTextCreateAction(body))
//     }
//
//     return (
//         <Dialogs sendMessage={sendMessage} updateMessage={updateMessage} NewMessageText={state.NewMessageText}
//                  dialogs={state.dialogs} messages={state.messages}/>
//     )
// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateMessage: (body) => {
            dispatch(updateMessageTextCreateAction(body))
        },
        sendMessage : ()=>{
            dispatch(sendMessageCreateAction());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;