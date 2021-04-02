import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts:
        [
            {id: 1, message: "Nastya1", likesCount: 12},
            {id: 2, message: "Sergey1", likesCount: 13},
            {id: 2, message: "Sergey2", likesCount: 14},
            {id: 2, message: "Sergey3", likesCount: 15}
        ],
    newPostText: 'it-test',
    profile: null,
    status: ""
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {
                    id: 5,
                    message: action.newPostText,
                    likesCount: 0
                }]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile

            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state
    }
}

export const addPostCreateAction = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}


export const setUsersProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status
    }
}

export const getUsersProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUsersProfile(response.data));
}
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}
export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}