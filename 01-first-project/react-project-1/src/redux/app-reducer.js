import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";


const INITIALIZED_SUCCSES = 'INITIALIZED_SUCCSES';

let initialState = {
    initialized: false,
};
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case  INITIALIZED_SUCCSES: {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
};

export const initializedSuccses = () => {
    return {
        type: INITIALIZED_SUCCSES,
    }
};

export const initializeApp = () => (dispatch) => {
    //
    // dispatch(getAuthUserData());
// alert()
    let promise =  dispatch(getAuthUserData());
   Promise.all([promise]).then(() => dispatch(initializedSuccses()))
};
