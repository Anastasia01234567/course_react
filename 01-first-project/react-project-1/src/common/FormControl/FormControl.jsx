import React from "react";
import style from "./FormControl.module.css";
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}) => {
    let hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            {children}
            {hasError && <span> {error} </span>}
        </div>
    )
}


export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea className={style.textarea} {...input} {...restProps}  /></FormControl>
}
export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input  {...input} {...restProps}  /></FormControl>
}
//this is helper func
export const createField = (placeholder, name, component, validate, props = {},  text = "") =>
    (<div>

        <Field component={component} placeholder={placeholder}
                validate={validate} name={name} {...props}/> {text}
    </div> )
