import React, {PureComponent} from 'react'
import cls from './MyPosts.module.css';
import Post from './Post/Post'
import PostReduxForm from "../AddPostForm";

const MyPosts = React.memo((props)=> {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps != this.props || nextState != this.state
    // }

        let state = props.profilePage;
        let postsElements = state.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        }
        return (
            <div>
                My Post
                <div className="">
                    <div>
                        <PostReduxForm onSubmit={onAddPost}/>
                    </div>
                </div>
                <div className={cls.posts}>
                    {postsElements}
                </div>
            </div>
        )
});
// class MyPosts extends PureComponent {
//     // shouldComponentUpdate(nextProps, nextState, nextContext) {
//     //     return nextProps != this.props || nextState != this.state
//     // }
//
//     render() {
//         let state = this.props.profilePage;
//         let postsElements = state.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
//         let onAddPost = (values) => {
//             this.props.addPost(values.newPostText);
//         }
//         return (
//             <div>
//                 My Post
//                 <div className="">
//                     <div>
//                         <PostReduxForm onSubmit={onAddPost}/>
//                     </div>
//                 </div>
//                 <div className={cls.posts}>
//                     {postsElements}
//                 </div>
//             </div>
//         )
//     }
// }


export default MyPosts;



