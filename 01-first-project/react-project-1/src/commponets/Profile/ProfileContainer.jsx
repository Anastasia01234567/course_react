import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUsersProfile, getUserStatus, savePhotos, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    refreshProfile(){
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
    componentDidMount() {
      this.refreshProfile();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.userId != this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} savePhotos={this.props.savePhotos} isOwner={!this.props.match.params.userId} saveProfile={this.props.saveProfile}
                     profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
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
        getUsersProfile, getUserStatus, updateUserStatus, savePhotos, saveProfile,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);
