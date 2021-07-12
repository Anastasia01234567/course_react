import React from "react";
import style from "./FormControl.module.css";
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../utils/validators/validators";

const FormControl: React.FC<WrappedFieldProps> = ({ meta: { touched, error }, children }) => {
    let hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            {children}
            {hasError && <span> {error} </span>}
        </div>
    )
};


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}> <textarea className={style.textarea} {...input} {...restProps} /></FormControl>
};
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    debugger;
    return <FormControl {...props}> <input  {...input} {...restProps} /></FormControl>
};


//this is helper func
export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    component: React.FC<WrappedFieldProps>,
    validate: Array<FieldValidatorType>,
    props = {}, text = "") {
    return (<div>
        <Field component={component} placeholder={placeholder}
            validate={validate} name={name}  {...props} /> {text}
    </div>)
};


export type GetStringKeys<T> = Extract<keyof T, string>