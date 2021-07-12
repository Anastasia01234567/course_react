import React from 'react';
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { AppStateType } from "../redux/redux-store";


// type mapProps = ReturnType<typeof mstpRedirect>
let mapStateToPropsForRedirect = (state: AppStateType) =>{
    return{
        isAuth: state.auth.isAuth,
        // id: state.auth.id
    }
};
type MapPropsType = {
    isAuth: boolean
}
export function withAuthRedirect <WCP>  (Component: React.ComponentType<WCP>) {
    const RedirectComponent:React.FC< MapPropsType> = (props) => {
        let { isAuth, ...restProps } = props;        
        if (!isAuth) return <Redirect to={"/login"} />;
        return <Component {...restProps  as WCP}/>
    };
    return connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
};



