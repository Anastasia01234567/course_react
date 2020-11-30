import React from 'react';
import cls from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

let Profile = (props) => {

    return (
        <div className="">
            <ProfileInfo/>
            <MyPosts
                dispatch = {props.dispatch}
                newPostText = {props.state.newPostText}
                posts={props.state.posts}
            />
        </div>
    )
}
export default Profile;