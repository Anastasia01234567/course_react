import React from 'react';
import Paginator from "../../Paginator/Paginator";
import User from "./User";

let Users = ({totalCountUsers, currentPage, pageSize, onPageChanged, ...props}) => {
    return (<div>
        <Paginator totalItemsCount={totalCountUsers} currentPage={currentPage} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        {
            props.users.map(u => (
                <User user={u} follow={props.follow} unfollow={props.unfollow}
                      followingInProgress={props.followingInProgress} key={u.id}/>
            ))
        }
    </div>)
}

export default Users;