import React from 'react';
import userPhotos from "../../assets/images/user.png";
import cls from "./user.module.css";

let Users = (props)=>{
    let pageCount = Math.ceil((props.totalCountUsers / props.pageSize));
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (<div>
        <ul className={cls.pagination}>
            {pages.map(p => {
                return (<li><span className={props.currentPage === p && cls.selectedPage}
                                  onClick={() => {
                                      props.onPageChanged(p)
                                  }}>{p}</span></li>)
            })}
        </ul>
        {
            props.users.map(u => (
                <div key={u.id} className={cls.user}>
                    <div className="">
                        <div><img src={u.photos.small != null ? u.photos.small : userPhotos} className={cls.photo}
                                  alt=""/></div>
                        <div className="">
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Follow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Unfollow</button>
                            }
                        </div>
                        <div className="">
                            <div className="" data-url={u.uniqueUrlName}>{u.name}</div>
                            <div className="">{u.status}</div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">{"u.location.country"}</div>
                        <div className="">{"u.location.city"}</div>
                    </div>
                </div>
            ))
        }
    </div>)
}

export default Users;