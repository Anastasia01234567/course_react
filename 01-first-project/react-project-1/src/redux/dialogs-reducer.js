const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState ={
    NewMessageText: '',
    messages:
        [
            {id: 1, message: "He"},
            {id: 2, message: "tet"},
            {id: 3, message: "weqe"},
            {id: 4, message: "qweqweHee"},
        ],

    dialogs:
        [
            {
                id: 1,
                name: "Nastya",
                avatar: 'https://blog.promopult.ru/wp-content/uploads/2020/09/kak-uluchshit-profil-v-instagram-2.png'
            },
            {id: 2, name: "Sergey", avatar: 'https://hypeava.ru/uploads/posts/2018-05/1527186681_1.jpg'}
        ]
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case  UPDATE_MESSAGE_TEXT: {
            return {
                ...state,
                NewMessageText : action.body
            };
        }
        case SEND_MESSAGE: {
            let body = state.NewMessageText;
            return {
                ...state,
                NewMessageText : '',
                messages: [...state.messages, {id: 5, message: body}]
            };
        }
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