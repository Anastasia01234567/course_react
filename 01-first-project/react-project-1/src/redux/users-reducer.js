const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';

let initialState ={
    users: [],
    pageSize: 100,
    totalCountUsers : 0,
    currentPage: 1,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:{
            return{
                ...state,
                users: state.users.map(u=>{
                    if(u.id === action.userId){

                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW:{
            return{
                ...state,
                users: state.users.map(u=>{
                    if(u.id === action.userId){

                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case SET_USERS:{
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE:{
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_USERS_TOTAL_COUNT:{
            return {
                ...state,
                totalCountUsers: action.totalCountUsers
            }
        }
        default:
            return state

    }
}

export const followAC = (userId) => {
    return {
        type: FOLLOW,
        userId,
    }
}
export const unfollowAC = (userId) => {
    return {
        type: UNFOLLOW,
        userId,
    }
}
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    }
}
export const  setCurrentPageAC = (currentPage)=>{
    return{
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setTotalUsersCountAC= (totalCountUsers) =>{
    return{
        type: SET_USERS_TOTAL_COUNT,
        totalCountUsers
    }
}