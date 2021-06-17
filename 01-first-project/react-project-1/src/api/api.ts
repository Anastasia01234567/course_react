import axios from "axios";
import {UserType} from "../types/types";

export let instances = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "837ed10a-351d-40ed-ba67-749200f2b2c7"
    }
});


export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequaried = 10
}

export type GetItemsType={
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}