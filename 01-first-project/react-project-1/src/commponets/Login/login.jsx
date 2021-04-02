import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input, createField} from "../../common/FormControl/FormControl";
import {require} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Login = (props) => {
    let onSubmit = (dataForm) => {
        props.login(dataForm);
    }
    if (props.isAuth) return <Redirect to={"/profile"}/>
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const LoginForm = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            {createField("Email", "email", Input, [require], {type: "text"})}
            {createField("Password", "password", Input, [require], {type: "text"})}
            {createField(null, "rememberMe", Input, [ ], {type: "checkbox"}, "remember me")}
            {props.error && <div>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};
export default connect(mapStateToProps, {login})(Login);