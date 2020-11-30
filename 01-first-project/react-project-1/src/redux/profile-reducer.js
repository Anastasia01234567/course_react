const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


export const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            state.posts.push({
                id: 5,
                message: state.newPostText,
                likesCount: 0
            });
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.text;
            return state;
        default:
            return state

    }
}
export const addPostCreateAction = () => {
    return {
        type: ADD_POST
    }
}
export const updateNewPostTextCreateAction = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    }
}