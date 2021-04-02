import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_DATA = 'kamasutra/auth/SET_AUTH_DATA';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
};
export const authReducer = (state = initialState, action) => {
    // console.log(...action.data);
    switch (action.type) {
        case  SET_AUTH_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
};

export const setAuthData = (payload) => {
    //email, password, rememberMe, isAuth
    return {
        type: SET_AUTH_DATA,
        payload
    }
};
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthData({id, login, email, isAuth: true}));
    }
};

export const login = ({email, password, rememberMe}) => async (dispatch) => {
    //email, password rememberMe
    let response = await authAPI.login({email, password, rememberMe});
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let errorMsg = response.data.messages?.length > 0 ? response.data.messages[0] : "Common error";
        dispatch(stopSubmit("login", {_error: errorMsg}))
    }
};
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthData({id: null, email: null, login: false, isAuth: false}));
    }
};