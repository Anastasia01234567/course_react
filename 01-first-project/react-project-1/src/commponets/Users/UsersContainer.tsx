import React from 'react';
import { useSelector } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import
    {
        getIsFetching
    } from "../../redux/users-selectors";
import Preloader from "../Preloader/Preloader";
import { Users } from './Users';


type UserPageType = {}

const UserPage: React.FC<UserPageType> = (props) =>
{
    const isFetching = useSelector(getIsFetching);

    return (
        <div className="">
            {isFetching ? <Preloader /> : null}
            <Users />
        </div>
    )
}

const UsersContainer = withAuthRedirect(UserPage);
export default UsersContainer;



