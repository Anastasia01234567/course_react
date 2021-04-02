import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component{
    componentDidMount() {
        // this.props.getAuthUserData();
        // authAPI.me()
        // // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        // //     withCredentials: true,
        // // })
        //     .then(response => {
        //         if(response.data.resultCode === 0){
        //             let {id, login, email} =response.data.data;
        //             this.props.setAuthData(id, login, email);
        //         }
        //     })
    }

    render() {
     return(
        <>
        <Header {...this.props}/>
        </>
     );
    }
}
let  mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
export default connect(mapStateToProps, {logout})(HeaderContainer);