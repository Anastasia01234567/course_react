import {authAPI} from "../api/auth-api";
import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {Dispatch} from "redux";


// const INITIALIZED_SUCCESS = 'AN/APP/INITIALIZED_SUCCESS';
type ActionType = InferActionTypes<typeof actions>;
let initialState = {
    initialized: false
};
type InitialState = typeof initialState;
type ThunkType = BaseThunkType<ActionType>
// type DispatchType = Dispatch<ActionType>;
export const appReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case  'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};
export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

// type InitializedSuccessActionType= {
//     type: typeof INITIALIZED_SUCCESS
// }
// func return type settings arq InitializedSuccessActionType
// export const initializedSuccess = ():InitializedSuccessActionType => {
//     return {
//         type: INITIALIZED_SUCCESS,
//     }
// };

export const initializeApp = ():ThunkType => async (dispatch, getState) => {
    // dispatch(getAuthUserData());
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => dispatch(actions.initializedSuccess()))
};
