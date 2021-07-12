import {Field, InjectedFormProps, reduxForm} from "redux-form";
import cls from "./Dialogs.module.css";
import React from "react";
import {createField, Textarea} from "../../common/FormControl/FormControl";
import {CreatorMaxLength, require} from "../../utils/validators/validators";
import {NewMessageFormValue} from "./Dialogs";
const maxLength50 = CreatorMaxLength(50);
type NewMessageFormValuesKey = Extract<keyof NewMessageFormValue, string >
type PropsType = {
}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValue, PropsType > & PropsType > = (props) =>{
    return(
        <form action="" onSubmit={props.handleSubmit}>
            {createField<NewMessageFormValuesKey>
            ("Enter your message","newMessageBody", Textarea,
                [ require, maxLength50])}
            {/*<Field placeholder={'Enter your message'} component={Textarea} name={"newMessageBody"}*/}
                   {/*className={cls.text_area_msg} validate={[ require, maxLength50 ]}/>*/}
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <button className={cls.button_send}>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<NewMessageFormValue, PropsType >({form: 'dialogAddMessageForm'})(AddMessageForm);
export default AddMessageReduxForm;