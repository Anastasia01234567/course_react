import {usersAPI} from "../api/users-api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType, BaseThunkType} from "./redux-store";
import {ThunkAction} from "redux-thunk";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalCountUsers: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users Ids
};
type InitialState = typeof initialState;

export const usersReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_USERS_TOTAL_COUNT: {
            return {
                ...state,
                totalCountUsers: action.totalCountUsers
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state

    }
};

type ActionType =
    FollowSuccessType
    | UnfollowSuccessType
    | SetUsersType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleIsFetchingType | ToggleFollowingProgressType;
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionType>;
type ThunkType = BaseThunkType<ActionType>;
type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number,
}
export const followSuccess = (userId: number): FollowSuccessType => {
    return {
        type: FOLLOW,
        userId,
    }
};
type UnfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number,
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => {
    return {
        type: UNFOLLOW,
        userId,
    }
};
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => {
    return {
        type: SET_USERS,
        users,
    }
};
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
};
type SetTotalUsersCountType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    totalCountUsers: number
}
export const setTotalUsersCount = (totalCountUsers: number): SetTotalUsersCountType => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        totalCountUsers
    }
};
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
};


export const requestUsers = (currentPage: number, pageSize: number):ThunkType => {
    return async (dispatch:DispatchType, getState:GetStateType) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};

type FollowUnFollowType = {
    userId: number
    apiMethod: any
    actionCreator: (userId:number)=> FollowSuccessType | UnfollowSuccessType
}
const _followUnfollowFlow = async (dispatch: DispatchType, {userId, apiMethod, actionCreator}: FollowUnFollowType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch:DispatchType) => {
        _followUnfollowFlow(dispatch, {
            apiMethod: usersAPI.unfollow.bind(usersAPI),
            actionCreator: unfollowSuccess,
            userId
        });
    }
};
export const follow = (userId: number): ThunkType => {
    return async (dispatch:DispatchType) => {
        _followUnfollowFlow(dispatch, {
            apiMethod: usersAPI.follow.bind(usersAPI),
            actionCreator: followSuccess,
            userId
        });
    }
};