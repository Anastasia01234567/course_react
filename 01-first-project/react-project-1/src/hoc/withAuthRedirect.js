import React from 'react';
import Redirect from "react-router-dom/es/Redirect";
import {connect} from "react-redux";
let mapStateToPropsRedirect = (state) =>{
    return{
        isAuth: state.auth.isAuth,
        id: state.auth.id
    }
}
export const withAuthRedirect = (Component) => {
    let RedirectComponent = (props) =>{
        if(!props.isAuth) return <Redirect to={"/login"}/>;
        return <Component {...props}/>
    }
    // class RedirectComponent extends React.Component {
    //     render() {
    //         if(!this.props.isAuth) return <Redirect to={"/login"}/>
    //         return <Component {...this.props}/>
    //     }
    // }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent);
    return connect(mapStateToPropsRedirect)(RedirectComponent);
}