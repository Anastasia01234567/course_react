import { ResponseType, ResultCodeEnum } from './../api/api';
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/objects-helpers";
import { UserType } from "../types/types";
import { Dispatch } from "redux";
import { AppStateType, BaseThunkType, InferActionTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalCountUsers: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users Ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
};
// export type InitialState = typeof initialState;

export const usersReducer = (state = initialState, action: ActionType): InitialState =>
{

    switch (action.type)
    {
        case 'SN/USERS/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        }
        case 'SN/USERS/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        }
        case 'SN/USERS/SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SN/USERS/SET_USERS_TOTAL_COUNT': {
            return {
                ...state,
                totalCountUsers: action.totalCountUsers
            }
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case 'SN/USER/SET_FILTER': {
            return {
                ...state,
                filter: action.payload
            }
        }
        default:
            return state

    }
};




export const actions = {
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({
        type: 'SN/USERS/SET_USERS',
        users,
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'SN/USERS/SET_CURRENT_PAGE',
        currentPage
    } as const),
    setFiter: (filter: UserFilterType) => ({ type: 'SN/USER/SET_FILTER', payload: filter } as const),
    setTotalUsersCount: (totalCountUsers: number) => ({
        type: 'SN/USERS/SET_USERS_TOTAL_COUNT',
        totalCountUsers
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


export const requestUsers = (currentPage: number, pageSize: number, filter: UserFilterType): ThunkType =>
{
    return async (dispatch: DispatchType, getState: GetStateType) =>
    {
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFiter(filter));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
};

type FollowUnFollowType = {
    userId: number
    apiMethod: (userId: number) => Promise<ResponseType>
    actionCreator: (userId: number) => ActionType
}
const _followUnfollowFlow = async (dispatch: DispatchType, { userId, apiMethod, actionCreator }: FollowUnFollowType) =>
{
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodeEnum.Success)
    {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};
export const unfollow = (userId: number): ThunkType =>
{
    return async (dispatch: DispatchType) =>
    {
        await _followUnfollowFlow(dispatch, {
            apiMethod: usersAPI.unfollow.bind(usersAPI),
            actionCreator: actions.unfollowSuccess,
            userId
        });
    }
};
export const follow = (userId: number): ThunkType =>
{

    return async (dispatch: DispatchType) =>
    {
        await _followUnfollowFlow(dispatch, {
            apiMethod: usersAPI.follow.bind(usersAPI),
            actionCreator: actions.followSuccess,
            userId
        });
    }
};



type ActionType = InferActionTypes<typeof actions>
export type InitialState = typeof initialState
export type UserFilterType = typeof initialState.filter
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionType>;
type ThunkType = BaseThunkType<ActionType>;


// type ActionType =
//     FollowSuccessType
//     | UnfollowSuccessType
//     | SetUsersType
//     | SetCurrentPageType
//     | SetTotalUsersCountType
//     | ToggleIsFetchingType | ToggleFollowingProgressType;

// type FollowSuccessType = {
//     type: typeof FOLLOW,
//     userId: number,
// }
// export const followSuccess = (userId: number) => {
//     return {
//         type: FOLLOW,
//         userId,
//     }
// };
// type UnfollowSuccessType = {
//     type: typeof UNFOLLOW,
//     userId: number,
// }
// export const unfollowSuccess = (userId: number) => {
//     return {
//         type: UNFOLLOW,
//         userId,
//     }
// };
// type SetUsersType = {
//     type: typeof SET_USERS,
//     users: Array<UserType>
// }
// export const setUsers = (users: Array<UserType>): SetUsersType => {
//     return {
//         type: SET_USERS,
//         users,
//     }
// };
// type SetCurrentPageType = {
//     type: typeof SET_CURRENT_PAGE,
//     currentPage: number
// }
// export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
//     return {
//         type: SET_CURRENT_PAGE,
//         currentPage
//     }
// };
// type SetTotalUsersCountType = {
//     type: typeof SET_USERS_TOTAL_COUNT,
//     totalCountUsers: number
// }
// export const setTotalUsersCount = (totalCountUsers: number): SetTotalUsersCountType => {
//     return {
//         type: SET_USERS_TOTAL_COUNT,
//         totalCountUsers
//     }
// };
// type ToggleIsFetchingType = {
//     type: typeof TOGGLE_IS_FETCHING,
//     isFetching: boolean
// }
// export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
//     return {
//         type: TOGGLE_IS_FETCHING,
//         isFetching
//     }
// };
// type ToggleFollowingProgressType = {
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
//     isFetching: boolean,
//     userId: number
// }
// export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => {
//     return {
//         type: TOGGLE_IS_FOLLOWING_PROGRESS,
//         isFetching,
//         userId
//     }
// };