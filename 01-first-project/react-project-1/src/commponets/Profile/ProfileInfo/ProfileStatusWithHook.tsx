import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';

const ProfileStatusWithHook: React.FC = () =>
{
    const statusState = useSelector((state: AppStateType) => state.profilePage.status)
     const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(statusState);
    useEffect(()=>{
        setStatus(statusState);
    }, [statusState]);
    let activateEditMode = ()=>{
        setEditMode(true);
    };
    let diactivateEditMode = ()=>{
        setEditMode(false);
        dispatch(updateUserStatus(status))
    };
    let onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setStatus(e.target.value);
    };
      return  (
        <div>
            {!editMode &&
            <div className="">
                <span onDoubleClick={activateEditMode}>{statusState || 'Create your first status'}</span>
            </div>
            }
            {editMode &&
            <div className="">
                <input type="text" autoFocus={true} onBlur={diactivateEditMode} onChange={onChangeStatus} value={status}/>
            </div>
            }
        </div>
      )
}
export default  ProfileStatusWithHook;