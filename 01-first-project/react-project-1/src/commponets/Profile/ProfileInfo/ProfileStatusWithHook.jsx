import React, {useEffect, useState} from 'react';

const ProfileStatusWithHook = (props)=>{
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);
    let activateEditMode = ()=>{
        setEditMode(true);
    };
    let diactivateEditMode = ()=>{
        setEditMode(false);
       props.updateUserStatus(status);
    };
    let onChangeStatus = (e) =>{
        setStatus(e.target.value);
    };
      return  (
        <div>
            {!editMode &&
            <div className="">
                <span onDoubleClick={activateEditMode}>{props.status || 'Create your first status'}</span>
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