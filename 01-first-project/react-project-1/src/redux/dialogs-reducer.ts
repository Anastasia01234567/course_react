import { MessageType, DialogType } from './../types/types';
import { InferActionTypes } from "./redux-store";


let initialState = {
    messages:
        [
            {id: 1, message: "He"},
            {id: 2, message: "tet"},
            {id: 3, message: "weqe"},
            {id: 4, message: "qweqweHee"},
        ] as Array<MessageType>,

    dialogs: [
        {
            id: 1,
            name: "Nastya",
            avatar: 'https://blog.promopult.ru/wp-content/uploads/2020/09/kak-uluchshit-profil-v-instagram-2.png'
        },
        {id: 2, name: "Sergey", avatar: 'https://hypeava.ru/uploads/posts/2018-05/1527186681_1.jpg'}
    ] as Array<DialogType>
};

export  type InitialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;

export const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOG/SEND-MESSAGE': {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: body}]
            };
        }
        default:
            return state;
    }
};


export const actions = {
    sendMessage: (newMessageBody: string)=> ({
            type: 'SN/DIALOG/SEND-MESSAGE',
            newMessageBody
    } as const)
}
// export default dialogsReducer;