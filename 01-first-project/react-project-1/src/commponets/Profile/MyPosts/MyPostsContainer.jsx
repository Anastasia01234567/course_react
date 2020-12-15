import React from 'react'
import {addPostCreateAction, updateNewPostTextCreateAction} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

// let MyPostsContainer = (props) => {
//     let state = props.store.getState();
//     let addPost = () => {
//         let action = addPostCreateAction();
//         props.store.dispatch(action)
//     }
//
//     let updateNewPostText = (text) => {
//         props.store.dispatch(updateNewPostTextCreateAction(text));
//     }
//     return (
//         <div>
//             <MyPosts updateNewPostText={updateNewPostText} addPost={addPost} posts={state.profilePage.posts}
//                      newPostText={state.profilePage.newPostText}/>
//         </div>
//     )
// }

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextCreateAction(text));
        }
        ,
        addPost: () => {
            let action = addPostCreateAction();
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;



