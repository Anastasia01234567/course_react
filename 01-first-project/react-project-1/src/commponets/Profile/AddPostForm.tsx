import {Field, reduxForm, InjectedFormProps} from "redux-form";
import React from "react";
import {createField, GetStringKeys, Textarea} from "../../common/FormControl/FormControl";
import {CreatorMaxLength, require} from "../../utils/validators/validators";
import { FormFieldType } from "./MyPosts/MyPosts";
const maxLength50 = CreatorMaxLength(50);
type Props = {}
// type FormFieldKeys = Extract<keyof FormFieldType, string>
type FormFieldKeys = GetStringKeys<FormFieldType>;



const PostForm: React.FC<InjectedFormProps<FormFieldType, Props> & Props > = (props) =>{
    return(
        <form action="" onSubmit={props.handleSubmit}>
            {createField<FormFieldKeys>("Post message", "newPostText", Textarea, [require, maxLength50])}
            {/* <Field component={Textarea} name={"newPostText"} placeholder={"Post message"} validate={[ require, maxLength50 ]}/> */}
            <button>Send</button>
        </form>
    )
}

const PostReduxForm = reduxForm<FormFieldType, Props>({form: 'ProfileAddNewPostForm'})(PostForm);
export default PostReduxForm;