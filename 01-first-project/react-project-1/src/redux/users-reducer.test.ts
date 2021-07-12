import { actions } from "./users-reducer";
import { InitialState, usersReducer } from "./users-reducer";

let state: InitialState;
//перед каждим тестом обновит стейт к исходным данным 
beforeEach(() =>
{
    state = {
        users: [
            {
                id: 0, name: 'Nastya 0', photos: { small: null, large: null },
                followed: false, status: 'status 0',   uniqueUrlName: '',
             
            }, {
                id: 1, name: 'Nastya 1', photos: { small: null, large: null },
                followed: false, status: 'status 1',   uniqueUrlName: '',
             
            },
            {
                id: 2, name: 'Nastya 2', photos: { small: null, large: null },
                followed: true, status: 'status 2',   uniqueUrlName: '',
             
            }, {
                id: 3, name: 'Nastya 3', photos: { small: null, large: null },
                followed: true, status: 'status 3',   uniqueUrlName: '',
             
            }
        ],
      
        pageSize: 10,
        totalCountUsers: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    };
});

test("follow success", () =>
{
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () =>
{
    const newState = usersReducer(state, actions.unfollowSuccess(3));
    expect(newState.users[3].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeTruthy();

})