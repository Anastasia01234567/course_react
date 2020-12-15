// import {rerenderEntreTree} from "../render";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {sidebarReducer} from "./sidebar-reducer";

export let store = {
    _state: {
        profilePage: {
            posts:
                [
                    {id: 1, message: "Nastya", likesCount: 12},
                    {id: 2, message: "Sergey", likesCount: 15}
                ],
            newPostText: 'it-test'
        },
        dialogsPage: {
            NewMessageText: '',
            messages:
                [
                    {id: 1, message: "He"},
                    {id: 2, message: "tet"},
                    {id: 3, message: "weqe"},
                    {id: 4, message: "qweqweHee"},
                ],

            dialogs:
                [
                    {
                        id: 1,
                        name: "Nastya",
                        avatar: 'https://blog.promopult.ru/wp-content/uploads/2020/09/kak-uluchshit-profil-v-instagram-2.png'
                    },
                    {id: 2, name: "Sergey", avatar: 'https://hypeava.ru/uploads/posts/2018-05/1527186681_1.jpg'}
                ]
        },
        sidebar: {
            friends:
                [
                    {
                        id: 1,
                        name: "Nastya",
                        avatar: 'https://blog.promopult.ru/wp-content/uploads/2020/09/kak-uluchshit-profil-v-instagram-2.png'
                    },
                    {
                        id: 2,
                        name: "Sergey",
                        avatar: 'https://hypeava.ru/uploads/posts/2018-05/1527186681_1.jpg'
                    },
                    {
                        id: 3,
                        name: "Test",
                        avatar: 'https://blog.promopult.ru/wp-content/uploads/2020/09/kak-uluchshit-profil-v-instagram-2.png'
                    },


                ]
        }
    },
    _callSubscriber() {
        console.log('subscriber');
    },
    getState() {
        return this._state;
    },
    // addPost() {
    //     this._state.profilePage.posts.push({
    //         id: 5,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     })
    //     this.updateNewPostText('')
    // },
    // updateNewPostText(newPostText) {
    //     this._state.profilePage.newPostText = newPostText;
    //     this._callSubscriber();
    // },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        // debugger
       this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
       this._state.profilePage = profileReducer(this._state.profilePage, action);
       this._state.sidebar = sidebarReducer(this._state.sidebar, action);
       this._callSubscriber(this)
    }
}


