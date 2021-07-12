import { ResultCodeEnum, ResponseType } from './../api/api';
import { usersAPI } from './../api/users-api';
import { actions, follow, unfollow } from "./users-reducer";
jest.mock('./../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

let dispatchFake = jest.fn();
let getStateMock = jest.fn();
beforeEach( () =>
{
    dispatchFake.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
    
})
test("success follow thuk", async () =>
{
    const thunk = follow(3);  
    await thunk(dispatchFake, getStateMock, {});

    expect(dispatchFake).toBeCalledTimes(3);
    expect(dispatchFake).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 3));
    expect(dispatchFake).toHaveBeenNthCalledWith(2, actions.followSuccess(3));
    expect(dispatchFake).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 3));
});


test("success unfollow thuk", async () =>
{
    const thunk = unfollow(3);
    await thunk(dispatchFake, getStateMock, {});

    expect(dispatchFake).toBeCalledTimes(3);
    expect(dispatchFake).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 3));
    expect(dispatchFake).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(3));
    expect(dispatchFake).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 3));
});