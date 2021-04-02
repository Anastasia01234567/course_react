import {Field, reduxForm} from "redux-form";
import cls from "./Dialogs.module.css";
import React from "react";
import {Textarea} from "../../common/FormControl/FormControl";
import {CreatorMaxLength, require} from "../../utils/validators/validators";
const maxLength50 = CreatorMaxLength(50);
const AddMessageForm = (props) =>{
    return(
        <form action="" onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message'} component={Textarea} name={"newMessageBody"}
                   className={cls.text_area_msg} validate={[ require, maxLength50 ]}/>
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <button className={cls.button_send}>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);
export default AddMessageReduxForm;