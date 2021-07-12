import React from 'react';
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField, GetStringKeys } from "../../common/FormControl/FormControl";
import { require } from "../../utils/validators/validators";
import { login } from "../../redux/auth-reducer";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";


const Login: React.FC = (props) =>
{

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();

    let onSubmit = (dataForm: LoginFormValuesType) =>
    {
        dispatch(login(dataForm));
    }

    if (isAuth) return <Redirect to={"/profile"} />
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormDataOwnerProps> & LoginFormDataOwnerProps> = (props) =>
{


    return (
        <form action="" onSubmit={props.handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", Input, [require], { type: "text" })}
            {createField<LoginFormValuesTypeKeys>("Password", "password", Input, [require], { type: "text" })}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", Input, [], { type: "checkbox" }, "remember me")}
            {props.captchaUrl && <div>
                <img src={props.captchaUrl} alt="captcha" />
                {createField("Symbols from image", "captcha", Input, [require], { type: "text" })}
            </div>}
            {props.error && <div>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormDataOwnerProps>({ form: 'login' })(LoginForm);


export default connect()(Login);

type LoginFormDataOwnerProps = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>