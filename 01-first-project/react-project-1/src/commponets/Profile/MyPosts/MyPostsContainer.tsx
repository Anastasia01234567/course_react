import React, { Dispatch } from "react";
import { actions, DispatchType } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { PostType, ProfileType } from "../../../types/types";

// type MSTProps = {
//   newPostText: string,
//   posts:  
// };
type MSTProps = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
};

type MDTProps = {
  addPost: (newPostText: string) => void;
};
//TODO  Action Dispatch
const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    addPost: (newPostText: string) => {
      let action = actions.addPostCreateAction(newPostText);
      dispatch(action);
    },
  };
};

const MyPostsContainer = connect<MSTProps, MDTProps, unknown, AppStateType>(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
export default MyPostsContainer;
