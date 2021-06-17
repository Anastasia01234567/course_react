import {instances} from "./api";
type GetCaptchaUrlType ={
    url: string
}
export const securityAPI = {
    getCaptcha() {
        return instances.get<GetCaptchaUrlType>('security/get-captcha-url').then(res => res.data)
    }
};