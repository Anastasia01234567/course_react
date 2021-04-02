import React from 'react'
import cls from './ProfileInfo.module.css';
import Preloader from "../../Preloader/Preloader";
import userPhotos from '../../../assets/images/user.png'
import ProfileStatusWithHook from "./ProfileStatusWithHook";

let ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <img src={profile.photos?.large ?? userPhotos} alt=""/>
            <ProfileStatusWithHook status={status} updateUserStatus={updateUserStatus}/>
            <div> {profile.fullName}</div>
            <div> {profile.aboutMe}</div>
            <div>
                <div
                    lassName="">Contacts
                </div>
                <ul>
                    {
                        Object.entries(profile.contacts).map(([k, v]) => {
                            return (<li><span>{k}</span> - {v}</li>)
                        })
                    }
                </ul>
            </div>
            <div className="">lookingForAJob - {profile.lookingForAJob}</div>
            <div className="">lookingForAJobDescription - {profile.lookingForAJobDescription}</div>
        </div>
    )
}
export default ProfileInfo;



