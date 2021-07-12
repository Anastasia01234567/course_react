import { Dispatch } from 'redux';
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api";
import { InferActionTypes, BaseThunkType } from "./redux-store";
import { v1 } from 'uuid';

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType

};
type InitialState = typeof initialState;

type ActionType = InferActionTypes<typeof actions>
type ThunkActionType = BaseThunkType<ActionType>
export const actions = {
    messageReceivend: (messages: ChatMessageAPIType[]) => ({
        type: 'SN/CHAT/SET_MESSAGES_SEUCCESS',
        payload: { messages },
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/CHAT/STATUS_CHANGED',
        payload: { status },
    } as const),

}

export const chatReducer = (state = initialState, action: ActionType): InitialState =>
{
    switch (action.type)
    {

        case 'SN/CHAT/SET_MESSAGES_SEUCCESS': {
            return {
                ...state,
                // messages: [...action.payload.messages]
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100),
            }
            break;
        }
        case 'SN/CHAT/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status,
            }
            break;
        }
        default:
            return state;
    }
};





let __newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) =>
{
    debugger;

    if (__newMessageHandler === null)
    {
        __newMessageHandler = (messages) =>
        {
            dispatch(actions.messageReceivend(messages));
        }
    }

    return __newMessageHandler;

}

let __statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) =>
{

    if (__statusChangedHandler === null)
    {
        __statusChangedHandler = (status) =>
        {
            dispatch(actions.statusChanged(status));
        }
    }

    return __statusChangedHandler;

}

export const startMessagesListening = (): ThunkActionType => async (dispatch) =>
{
    chatAPI.start()
    chatAPI.subscribe('messages-reveived', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-change', statusChangedHandlerCreator(dispatch));

};
export const stopMessagesListening = (messages: ChatMessageAPIType): ThunkActionType => async (dispatch) =>
{
    chatAPI.stop()
    chatAPI.unsubscribe('messages-reveived', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-change', statusChangedHandlerCreator(dispatch))
};
export const sendMessages = (message: string): ThunkActionType => async (dispatch) =>
{
    chatAPI.sendMessage(message)
};
export const createChanel = (): ThunkActionType => async (dispatch) =>
{
    chatAPI.start()
};



