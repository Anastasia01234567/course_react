import React, { FC } from "react";
import userPhotos from "../../assets/images/user.png";
import cls from "./user.module.css";
import { NavLink } from "react-router-dom";
import { PhotosType, UserType } from "../../types/types";
type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
};
type DisapatchProps = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
let User: React.FC<PropsType & DisapatchProps> = ({
  user,
  follow,
  unfollow,
  followingInProgress,
}) =>
{
  return (
    <div className={cls.user}>
      <div className="">
        <NavLink to={"/profile/" + user.id}>
          <img
            src={user.photos.small != null ? user.photos.small : userPhotos}
            className={cls.photo}
            alt=""
          />
        </NavLink>
        <div className="">
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() =>
              {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() =>
              {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
        <div className="">
          <div className="" data-url={user.uniqueUrlName}>{user.name}</div>
          <div className="">{user.status}</div>
        </div>
      </div>
      <div className="">
        <div className="">{"user.location.country"}</div>
        <div className="">{"user.location.city"}</div>
      </div>
    </div>
  );
};

export default User;
