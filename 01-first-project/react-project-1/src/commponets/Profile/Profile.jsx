import React from 'react';
import cls from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

let Profile = (props) => {
    return (
        <div className="">
            <ProfileInfo profile={props.profile} status={props.status}  updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;