import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionTypes } from "./redux-store";
import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";

const SET_AUTH_DATA = 'SN/auth/SET_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'SN/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};
type InitialState = typeof initialState;

type ActionType = InferActionTypes<typeof action>
type ThunkActionType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>;


export const action = {
    setAuthData: ( id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_AUTH_DATA',
        payload :{id, email, login, isAuth},
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: { captchaUrl }
    } as const)
}

export const authReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
        case 'SN/auth/SET_AUTH_DATA': {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
};

export const getAuthUserData = (): ThunkActionType => async (dispatch) => {
    let mData = await authAPI.me();
    if (mData.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = mData.data;

        dispatch(action.setAuthData( id, login, email,  true ));
    }
};

type loginData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
export const login = ({ email, password, rememberMe, captcha }: loginData): ThunkActionType => async (dispatch) => {
    let data = await authAPI.login({ email, password, rememberMe, captcha });
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequaried) {
            dispatch(getCaptchaUrl());
        }
        let errorMsg = data.messages?.length > 0 ? data.messages[0] : "Common error";
        dispatch(stopSubmit("login", { _error: errorMsg }))
    }
};

export const logout = (): ThunkActionType => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(action.setAuthData(  null,  null,  null,  false ));
    }
};

export const getCaptchaUrl = ():ThunkActionType => async (dispatch) => {
    let data = await securityAPI.getCaptcha();
    const captchaUrl = data.url;
    dispatch(action.getCaptchaUrlSuccess(captchaUrl));
};


// type DispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;
// type ActionType = SetAuthDataActionType | getCaptchaUrlActionType;
// type SetAuthDataActionType = {
//     type: typeof SET_AUTH_DATA
//     payload: SetAuthUserDataActionPayloadType
// }

// export const setAuthData = (payload: SetAuthUserDataActionPayloadType) => {
//     return {
//         type: SET_AUTH_DATA,
//         payload
//     }
// };
// type getCaptchaUrlActionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS
//     payload: {
//         captchaUrl: string
//     }
// };
// export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlActionType => ({
//     type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
// });