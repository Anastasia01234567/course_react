import React, {useState} from 'react'
import cls from './ProfileInfo.module.css';
import Preloader from "../../Preloader/Preloader";
import userPhotos from '../../../assets/images/user.png'
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import {createField, Input, Textarea} from "../../../common/FormControl/FormControl";
import {reduxForm} from "redux-form";

let ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhotos, saveProfile}) => {
    const [editMode, setEditMode] = useState(false);
    const onSubmit = (formData) => {
        alert('dfasdf');
        debugger;
        saveProfile(formData).then(()=> {
            setEditMode(false);
        });
    };
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotosSelected = (event) => {
        debugger;
        let files = event.target.files;
        if (files.length) {
            savePhotos(files[0])
        }
    };
    const goToEditMode = () => {
        setEditMode(true);
    }
    return (
        <div>
            <img src={profile.photos?.large ?? userPhotos} alt=""/>
            {isOwner && <input type="file" onChange={onMainPhotosSelected}/>}
            <ProfileStatusWithHook status={status} updateUserStatus={updateUserStatus}/>
            {editMode ? <PersonalDataFormRedux onSubmit={onSubmit} profile={profile}/> :
                <PersonalData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>}
        </div>
    )
};
export default ProfileInfo;

const Contacts = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>{contactValue}</div>
};
const PersonalData = ({profile, isOwner, goToEditMode}) => {

    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>Edit</button>}
            <div><b>full Name</b>{profile.fullName}</div>
            <div><b>about Me</b> {profile.aboutMe}</div>
            <div className=""><b>lookingForAJob </b>- {profile.lookingForAJob}</div>
            <div className=""><b>lookingForAJobDescription</b> - {profile.lookingForAJobDescription}</div>
            <div><b>Contacts:</b>
                {Object.keys(profile.contacts).map((key) => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
};
const PersonalDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form action="" onSubmit={handleSubmit}>
            <button type="submit">Save</button>
            <div><b>full Name</b>{createField("Full name", 'fullName', Input, [], {
                type: 'text',
                value: profile.fullName
            })}</div>
            <div><b>about Me</b> {createField("About me", 'aboutMe', Textarea, [], {
                value: profile.aboutMe
            })}</div>
            <div className=""><b>lookingForAJob </b>{createField(null, 'lookingForAJob', Input, [], {
                type: 'checkbox'
            })}</div>
            <div className="">
                <b>lookingForAJobDescription</b> - {createField(null, 'lookingForAJobDescription', Textarea, [])}</div>
            <div><b>Contacts:</b>
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <b>{key}</b>
                            {createField(null, `contacts.${key}`, Input, [])}
                        </div>
                    )
                })}
            </div>

            {error && <div>{error}</div>}
        </form>
    )
};

const PersonalDataFormRedux = reduxForm({form: 'edit-profile'})(PersonalDataForm);