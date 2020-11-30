import React from 'react'
import cls from './MyPosts.module.css';
import Post from './Post/Post'
import {addPostCreateAction, updateNewPostTextCreateAction} from "../../../redux/profile-reducer";

let MyPosts = (props) => {

    let postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount}/>);
    let refElementTextArea = React.createRef();
    let addPost=()=>{
        let text = refElementTextArea.current.value,
            action = addPostCreateAction();
        props.dispatch(action)
    }

    let updateNewPostText = () =>{

        let text = refElementTextArea.current.value;
        props.dispatch(updateNewPostTextCreateAction(text));
    }
    return (
        <div>
            My Post
            <div className="">
                {/*<form action="">*/}
                    <div>
                        <textarea onChange={updateNewPostText} ref={refElementTextArea} name="" id="" cols="30" rows="10" value={props.newPostText}></textarea>
                    </div>
                    <button type="button" onClick={addPost}>Send</button>
                {/*</form>*/}
            </div>
            <div className={cls.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;



