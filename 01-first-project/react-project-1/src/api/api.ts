import axios from "axios";
import {ProfileType} from "../types/types";

let instances = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "837ed10a-351d-40ed-ba67-749200f2b2c7"
    }
});
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 20) {
        return instances(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    unfollow(userId: number) {
        return instances.delete(`follow/${userId}`)
    },
    follow(userId: number) {
        return instances.post(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object');
        return profileAPI.getProfile(userId)
    }

};
export const profileAPI = {
    getProfile(userId: number) {
        return instances.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instances.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instances.put(`profile/status/`, {status: status})
    },
    savePhotos(file: any) {
        let formData = new FormData();
        formData.append('image', file);
        return instances.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instances.put('profile', profile);
    }
};
type AuthType = {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha: string | null
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequaried = 10
}

type MeResponseType = {
    data: {
        id: number, email: string, login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<number>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<number>
}
export const authAPI = {
    me() {
        return instances.get<MeResponseType>(`auth/me`).then(response =>  response.data)
    },
    login({email, password, rememberMe = false, captcha = null}: AuthType) {
        return instances.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha}).then(res=>res.data);
    },
    logout() {
        return instances.delete('auth/login');
    }
};
export const securityAPI = {
    getCaptcha() {
        return instances.get('security/get-captcha-url')
    }
}