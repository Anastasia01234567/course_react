import React, {FC} from 'react';
import Paginator from "../../Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    totalCountUsers: number
    pageSize: number
    onPageChanged: (pageNumber:number)=>void
    currentPage : number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number)=>void
    unfollow: (userId: number)=>void
}

export const Users: FC<PropsType> = ({ totalCountUsers, currentPage, pageSize, follow, unfollow, followingInProgress, onPageChanged, users}) => {
    return (<div>
        <Paginator totalItemsCount={totalCountUsers} currentPage={currentPage} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        {
            users.map(u => (
                <User user={u} follow={follow} unfollow={unfollow}
                      followingInProgress={followingInProgress} key={u.id}/>
            ))
        }
    </div>)
};

