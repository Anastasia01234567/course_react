import React from 'react'
import cls from './MyPosts.module.css';
import Post from './Post/Post'

let MyPosts = (props) => {
    let postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount}/>)
    return (
        <div>
            My Post
            <div className="">
                <form action="">
                    <div>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className={cls.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;



