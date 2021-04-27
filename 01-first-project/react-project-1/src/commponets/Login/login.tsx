import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, createField} from "../../common/FormControl/FormControl";
import {require} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type LoginFormDataOwnerProps={
    captchaUrl: string|null
}
type MapStatePropsType={
    captchaUrl: string | null,
    isAuth: boolean
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>
type MapDispatchPropsType={
    login: (dataForm:LoginFormValuesType)=>void
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let onSubmit = (dataForm:LoginFormValuesType) => {
        props.login(dataForm);
    }
    if (props.isAuth) return <Redirect to={"/profile"}/>
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormDataOwnerProps> & LoginFormDataOwnerProps > = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", Input, [require], {type: "text"})}
            {createField<LoginFormValuesTypeKeys>("Password", "password", Input, [require], {type: "text"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", Input, [ ], {type: "checkbox"}, "remember me")}
            {props.captchaUrl && <div>
                <img src={props.captchaUrl} alt="captcha"/>
                {createField("Symbols from image", "captcha", Input, [require], {type: "text"})}
            </div>}
            {props.error && <div>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormDataOwnerProps>({form: 'login'})(LoginForm);
let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
};
export default connect(mapStateToProps, {login})(Login);