const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState ={
    posts:
        [
            {id: 1, message: "Nastya1", likesCount: 12},
            {id: 2, message: "Sergey1", likesCount: 13},
            {id: 2, message: "Sergey2", likesCount: 14},
            {id: 2, message: "Sergey3", likesCount: 15}
        ],
    newPostText: 'it-test'
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                newPostText : '',
                posts: [...state.posts, {
                    id: 5,
                    message: state.newPostText,
                    likesCount: 0
                }]
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText : action.text

            };
        }
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