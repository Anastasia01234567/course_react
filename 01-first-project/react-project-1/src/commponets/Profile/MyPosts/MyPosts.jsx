import React from 'react'
import cls from './MyPosts.module.css';
import Post from './Post/Post'
// import {addPostCreateAction, updateNewPostTextCreateAction} from "../../../redux/profile-reducer";

let MyPosts = (props) => {
// debugger;
    let state = props.profilePage;
    let postsElements = state.posts.map( post => <Post message={post.message} likesCount={post.likesCount}/>);
    let refElementTextArea = React.createRef();
    let onAddPost=()=>{
       props.addPost();
    }

    let onUpdateNewPostText = (event) =>{
        let text = event.target.value;
        props.updateNewPostText(text);
    }
    return (
        <div>
            My Post
            <div className="">
                {/*<form action="">*/}
                    <div>
                        <textarea className={cls.textarea} onChange={onUpdateNewPostText} ref={refElementTextArea} name="" id="" cols="30" rows="10" value={state.newPostText}></textarea>
                    </div>
                <div className={cls.wrap_btn}>
                    <button type="button" className={cls.btn_send} onClick={onAddPost}>Send</button>
                </div>
                {/*</form>*/}
            </div>
            <div className={cls.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;



