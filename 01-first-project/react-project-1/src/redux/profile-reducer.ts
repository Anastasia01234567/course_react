import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'samurai-network/ADD-POST';
const SAVE_PHOTOS = 'samurai-network/SAVE_PHOTOS';
const SAVE_PROFILE_SUCCESS = 'samurai-network/SAVE_PROFILE_SUCCESS';
const SET_USER_PROFILE = 'samurai-network/SET_USER_PROFILE';
const SET_USER_STATUS = 'samurai-network/SET_USER_STATUS';



let initialState = {
    posts: [
        {id: 1, message: "Nastya1", likesCount: 12},
        {id: 2, message: "Sergey1", likesCount: 13},
        {id: 2, message: "Sergey2", likesCount: 14},
        {id: 2, message: "Sergey3", likesCount: 15}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "" as string,
    newPostText: "" as string
};
type InitialStateType = typeof initialState;
type ActionType = AddPostType|SetUsersProfileType|SavePhotosSuccessType|SetUserStatusType;
type DispatchType = Dispatch<ActionType>;
export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
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
        case SAVE_PHOTOS: {
            return {
                ...state,
                profile: {...state.profile,  photos: action.photos as PhotosType}

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
};
type AddPostType = {
    type: typeof ADD_POST
    newPostText: string
};
export const addPostCreateAction = (newPostText: string): AddPostType => {
    return {
        type: ADD_POST,
        newPostText
    }
};
type SetUsersProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
};

export const setUsersProfile = (profile: ProfileType): SetUsersProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};
type SetUserStatusType = {
    type: typeof SET_USER_STATUS,
    status: string
};
export const setUserStatus = (status: string): SetUserStatusType => {
    return {
        type: SET_USER_STATUS,
        status
    }
};

export const getUsersProfile = (userId: number) => async (dispatch: DispatchType) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUsersProfile(response.data));
};
export const getUserStatus = (userId: number) => async (dispatch: DispatchType) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
};
export const updateUserStatus = (status: string) => async (dispatch: DispatchType) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};

type SavePhotosSuccessType = {
    type: typeof SAVE_PHOTOS,
    photos: PhotosType
}
export const savePhotosSuccess = (photos: PhotosType): SavePhotosSuccessType => {
    return {
        type: SAVE_PHOTOS,
        photos
    }
};
export const savePhotos = (file: any) => async (dispatch: DispatchType) => {
    const response = await profileAPI.savePhotos(file);
    if (response.data.resultCode === 0) {
        let photos = response.data.data;
        dispatch(savePhotosSuccess(photos));
    } else {
        throw 'not save photos'
    }
};


// ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any)=>{
    debugger;
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        console.log(response.data.data);
        debugger;
        dispatch(getUsersProfile(userId));
    }else {
        let errorMsg = response.data.messages?.length > 0 ? response.data.messages[0] : "Common error";
      dispatch(stopSubmit('edit-profile', {"contacts":{"facebook":errorMsg}}));
    }
};