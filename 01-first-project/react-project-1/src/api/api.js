import * as axios from "axios";
let instances = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers:{
        "API-KEY": "837ed10a-351d-40ed-ba67-749200f2b2c7"
    }
});
export  const usersAPI ={
    getUsers(currentPage = 1, pageSize = 20){
      return  instances(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    unfollow (userId){
        return instances.delete(`follow/${userId}`)
    },
    follow(userId){
        return  instances.post(`follow/${userId}`)
    },
    getProfile (userId){
        console.warn('Obsolete method. Please profileAPI object');
        return  profileAPI.getProfile(userId)
    }

};
export const profileAPI = {
    getProfile (userId){
        return  instances.get(`profile/${userId}`)
    },
    getStatus(userId){
        return  instances.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        return  instances.put(`profile/status/`, {status: status})
    },
}

export const authAPI ={
    me(){
       return instances.get(`auth/me`)
    },
    login({email, password, rememberMe = false}){
        return instances.post('auth/login', {email, password, rememberMe});
    },
    logout(){
        return instances.delete('auth/login');
    }
}