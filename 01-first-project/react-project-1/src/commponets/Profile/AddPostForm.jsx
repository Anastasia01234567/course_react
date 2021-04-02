import {Field, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../../common/FormControl/FormControl";
import {CreatorMaxLength, require} from "../../utils/validators/validators";
const maxLength50 = CreatorMaxLength(50);
const PostForm = (props) =>{
    return(
        <form action="" onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newPostText"} placeholder={"Post message"} validate={[ require, maxLength50 ]}/>
            <button>Send</button>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(PostForm);
export default PostReduxForm;