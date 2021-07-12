import queryString from 'querystring';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paginator from "../../Paginator/Paginator";
import { requestUsers, UserFilterType } from "../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalCountUsers, getUserFilter, getUsers } from '../../redux/users-selectors';
import User from "./User";
import { UserFormSearch } from './UserFormSearch';
type PropsType = {}
type QueryParamsType = { term?: string, friend?: string, page?: string }

// const test: FriendQuery = 34;

export const Users: React.FC = (props) =>
{
    const users = useSelector(getUsers)
    const totalCountUsers = useSelector(getTotalCountUsers)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUserFilter)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>
    {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage,
            actualFileter = filter;
        if (!!parsed.page) actualPage = Number(parsed.page);
        if (!!parsed.term) actualFileter = { ...actualFileter, term: parsed.term as string }
        if (!!parsed.friend)
        {
            const result = parsed.friend === 'null' ? null :
                parsed.friend === 'true' ? true : false;
            actualFileter = { ...actualFileter, friend: result }
        }

        dispatch(requestUsers(actualPage, pageSize, actualFileter));

    }, []);

    useEffect(() =>
    {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) =>
    {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const follow = (userId: number) =>
    {
        console.log('follow', userId);
        // debugger;
        dispatch(follow(userId));
    }
    const unfollow = (userId: number) =>
    {
        // debugger;
        dispatch(unfollow(userId));
    }
    const onFilterChanged = (filter: UserFilterType) =>
    {
        dispatch(requestUsers(1, pageSize, filter));
    }

    return (<div>
        <UserFormSearch onFilterChanged={onFilterChanged} />

        <Paginator totalItemsCount={totalCountUsers} currentPage={currentPage} pageSize={pageSize}
            onPageChanged={onPageChanged} />
        {
            users.map(u => (
                <User user={u} follow={follow} unfollow={unfollow}
                    followingInProgress={followingInProgress} key={u.id} />
            ))
        }
    </div>)
};

