import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
type InitialState = {
    initialized: boolean,

}
let initialState:InitialState = {
    initialized: false,
};
export const appReducer = (state = initialState, action: ActionType):InitialState => {
    switch (action.type) {
        case  INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
};
type ActionType = InitializedSuccessActionType;
type InitializedSuccessActionType= {
    type: typeof INITIALIZED_SUCCESS
}
// func return type settings arq InitializedSuccessActionType
export const initializedSuccess = ():InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS,
    }
};

export const initializeApp = () => (dispatch: any) => {
    // dispatch(getAuthUserData());
    let promise =  dispatch(getAuthUserData());
   Promise.all([promise]).then(() => dispatch(initializedSuccess()))
};
