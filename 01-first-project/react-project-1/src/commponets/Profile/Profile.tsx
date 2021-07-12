import React from 'react';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// TODO: fix saveProfile 

type Props = {
    isOwner: boolean,
    // updateUserStatus: (status: string) => void,

}

let Profile: React.FC<Props> = (props) =>
{
    return (
        <div className="">
            <ProfileInfo isOwner={props.isOwner}  />
            <MyPostsContainer />
        </div>
    )
}
export default Profile;