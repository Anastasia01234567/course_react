const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

export const dialogsReducer = (state, action) => {
    switch (action.type) {
        case  UPDATE_MESSAGE_TEXT:
            state.NewMessageText = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.NewMessageText;
            state.NewMessageText = '';
            state.messages.push(
                {id: 5, message: body}
            )
            return state;
        default:
            return state;
    }
}

export const updateMessageTextCreateAction = (body) => {
    return {
        type: UPDATE_MESSAGE_TEXT,
        body: body
    }
}
export const sendMessageCreateAction = () => {
    return {
        type: SEND_MESSAGE
    }
}