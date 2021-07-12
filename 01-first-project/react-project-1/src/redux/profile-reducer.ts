import { profileAPI } from "../api/profile-api";
import { stopSubmit } from "redux-form";
import { ContactsType, PhotosType, PostType, ProfileType } from "../types/types";
import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionTypes } from "./redux-store";
import { usersAPI } from "../api/users-api";
import { ResultCodeEnum } from "../api/api";



let initialState = {
    posts: [
        { id: 1, message: "Nastya1", likesCount: 12 },
        { id: 2, message: "Sergey1", likesCount: 13 },
        { id: 2, message: "Sergey2", likesCount: 14 },
        { id: 2, message: "Sergey3", likesCount: 15 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "" as string,
    newPostText: "" as string
};


export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
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
        case "SN/PROFILE/SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile

            };
        }
        case "SN/PROFILE/SAVE_PHOTOS": {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case "SN/PROFILE/SET_USER_STATUS": {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state
    }
};
export const actions = {
    addPostCreateAction: (newPostText: string) => ({
        type: 'SN/PROFILE/ADD-POST',
        newPostText
    } as const),
    setUsersProfile: (profile: ProfileType) => ({
        type:  'SN/PROFILE/SET_USER_PROFILE',
        profile
    } as const),
    setUserStatus: (status: string) => ({
        type: 'SN/PROFILE/SET_USER_STATUS',
        status
    } as const),
    savePhotosSuccess: (photos: PhotosType) => ({
        type: 'SN/PROFILE/SAVE_PHOTOS',
        photos
    } as const)
}

export const getUsersProfile = (userId: number) => async (dispatch: DispatchType) => {
    let response = await profileAPI.getProfile(userId);
    console.log(response);
    dispatch(actions.setUsersProfile(response));
};
export const getUserStatus = (userId: number) => async (dispatch: DispatchType) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(response));
};
export const updateUserStatus = (status: string) => async (dispatch: DispatchType) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserStatus(status));
    }
};

export const savePhotos = (file: File) => async (dispatch: DispatchType) => {
    const response = await profileAPI.savePhotos(file);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotosSuccess(response.data.photos));
    } else {
        throw 'not save photos'
    }
};


// ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    debugger;
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === ResultCodeEnum.Success) {
        if(userId != null){
        dispatch(getUsersProfile(userId));
        }else{
            throw new Error (`userId can't be null`);
        }

    } else {
        let errorMsg = response.messages?.length > 0 ? response.messages[0] : "Common error";
        dispatch(stopSubmit('edit-profile', { "contacts": { "facebook": errorMsg } }));
    }
};

export type InitialStateType = typeof initialState;
export type ActionType = InferActionTypes<typeof actions>;
export type DispatchType = Dispatch<ActionType>;
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit> >;

// const ADD_POST = 'SN/PROFILE/ADD-POST';
// const SAVE_PHOTOS = 'SN/PROFILE/SAVE_PHOTOS';
// const SAVE_PROFILE_SUCCESS = 'SN/PROFILE/SAVE_PROFILE_SUCCESS';
// const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE';
// const SET_USER_STATUS = 'SN/PROFILE/SET_USER_STATUS';
