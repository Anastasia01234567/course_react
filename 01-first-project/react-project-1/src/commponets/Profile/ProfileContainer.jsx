import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUsersProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId =  this.props.autoritetId;
            if(!userId){
                this.props.history.push('/login');
            }
        }
        this.props.getUsersProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autoritetId: state.auth.id,
    isAuth: state.auth.isAuth
});
export default compose(
    connect(mapStateToProps, {
        getUsersProfile, getUserStatus, updateUserStatus
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);
