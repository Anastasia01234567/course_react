import React, { PureComponent } from "react";
import cls from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostReduxForm from "../AddPostForm";
import { PostType, ProfileType } from "../../../types/types";
import { InjectedFormProps } from "redux-form";

export type FormFieldType = {
  newPostText: string;
};

type Props = {
  posts: Array<PostType>;
  addPost: (newPostText: string) => void;
};
const MyPosts: React.FC<Props> = React.memo((props) =>
{
  let postsArray = [...props.posts]
  // let state = props.profilePage;
  let postsElements = postsArray.map((post) => (
    <Post message={post.message} likesCount={post.likesCount} />
  ));
  //TODO ЧТО ЗА Ф-ЦИИ? ПРОТИПИЗИРОВАТЬ
  let onAddPost = (values: FormFieldType) => {
    props.addPost(values.newPostText);
  };
  return (
    <div>
      My Post
      <div className="">
        <div>
          <PostReduxForm onSubmit={onAddPost} />
        </div>
      </div>
      <div className={cls.posts}>{postsElements}</div>
    </div>
  );
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
