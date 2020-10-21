import React from 'react';
import cls from "./Post.module.css";

let Post = (props) => {
    return (
        <div className={cls.item}>
            <img
                src="https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2019/CA-Chris-Ogonek-Picture-Controls/Media/Chris-Ogonek-Picture-Controls-Vivid.low.jpg"
                alt=""></img>
            {props.message}
            <div>
                <span>{props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;