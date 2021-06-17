import {instances, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

type AuthType = {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha: string | null
}
type MeResponseDataType = {
        id: number, email: string, login: string
}
type LoginResponseType = {
        userId: number
}
export const authAPI = {
    me() {
        return instances.get<ResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data)
    },
    login({email, password, rememberMe = false, captcha = null}: AuthType) {
        return instances.post<ResponseType<LoginResponseType, ResultCodeEnum| ResultCodeForCaptchaEnum>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data);
    },
    logout() {
        return instances.delete('auth/login');
    }
};