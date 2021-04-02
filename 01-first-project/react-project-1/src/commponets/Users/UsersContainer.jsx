import React from 'react';
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getTotalCountUsers,
    getCurrentPage,
    getPageSize,
    getIsFetching,
    getUsers,
    getFollowingInProgress,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users  {...this.props}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
};
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalCountUsers: getTotalCountUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        isFetching: getIsFetching(state),
        followingInProgress : getFollowingInProgress(state),
    }
};


export default  compose(
    connect(mapStateToProps,  { follow, unfollow, setUsers,
        setCurrentPage, setTotalUsersCount,toggleIsFetching,
        toggleFollowingProgress, requestUsers}),
    withAuthRedirect,
)
(UsersContainer);
