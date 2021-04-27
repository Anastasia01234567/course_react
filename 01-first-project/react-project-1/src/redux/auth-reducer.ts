import {authAPI, ResultCodeEnum, ResultCodeForCaptchaEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const SET_AUTH_DATA = 'samurai-network/auth/SET_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';
export type InitialState = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
};
let initialState: InitialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

type ActionType = SetAuthDataActionType | getCaptchaUrlActionType;
type DispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;
export const authReducer = (state = initialState, action: ActionType): InitialState => {
    // console.log(...action.data);
    switch (action.type) {
        case  SET_AUTH_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
};
type SetAuthUserDataActionPayloadType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type SetAuthDataActionType = {
    type: typeof SET_AUTH_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthData = (payload: SetAuthUserDataActionPayloadType): SetAuthDataActionType => {
    return {
        type: SET_AUTH_DATA,
        payload
    }
};
type getCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl: string
    }
};
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});
export const getAuthUserData = (): DispatchType => async (dispatch) => {
    let mData = await authAPI.me();
    if (mData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = mData.data;
        dispatch(setAuthData({id, login, email, isAuth: true}));
    }
};
type loginData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
export const login = ({email, password, rememberMe, captcha}: loginData) => async (dispatch:any) => {
    //email, password rememberMe
    let data = await authAPI.login({email, password, rememberMe, captcha});
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequaried) {
            dispatch(getCaptchaUrl());
        }
        let errorMsg = data.messages?.length > 0 ? data.messages[0] : "Common error";
        dispatch(stopSubmit("login", {_error: errorMsg}))
    }
};
export const logout = (): DispatchType => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthData({id: null, email: null, login: null, isAuth: false}));
    }
};
export const getCaptchaUrl = () => async (dispatch:Dispatch<ActionType>) => {
    let response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};