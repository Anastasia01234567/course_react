import React from 'react'
import cls from './Friends.module.css';
import Friend from "./Friend/Friend";

let Friends = (props) => {
    // debugger;
    let FriendElements = props.friends.map((friend) =>  <Friend  state={friend}/>)
    return (
        <div className={cls.wrap_friends}>
            <h3>Friends</h3>
            <div className={cls.wrap_friends_list}>
                {FriendElements}
            </div>
        </div>
    )
}
export default Friends;