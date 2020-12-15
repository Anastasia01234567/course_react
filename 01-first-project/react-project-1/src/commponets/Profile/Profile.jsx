import React from 'react';
import cls from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

let Profile = () => {

    return (
        <div className="">
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;