const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState ={
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
};
export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: body}]
            };
        }
        default:
            return state;
    }
}

export const sendMessageCreateAction = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}