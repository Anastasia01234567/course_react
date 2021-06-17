import {GetItemsType, ResponseType, instances} from "./api";
import {AxiosPromise} from "axios";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 20) {
        return instances.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    unfollow(userId: number) {
        // as AxiosPromise<ResponseType>;
        return instances.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
    follow(userId: number) {
        return instances.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    }
};