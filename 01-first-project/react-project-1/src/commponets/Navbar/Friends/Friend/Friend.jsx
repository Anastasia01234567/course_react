import React from 'react';
import cls  from '../Friends.module.css'

const Friend = (props) =>{
    // console.log(props)
    return(
<div className={cls.item_friend}>
    <img src={props.state.avatar} alt="" className={cls.avatar_friend}/>
    <div className={cls.name_friend}>{props.state.name}</div>
</div>
    )
}
export default Friend;