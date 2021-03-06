let initialState = {
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


        ] as Array<FriendType>
};
type FriendType ={
    id: number,
    name: string,
    avatar: string
}
type ActionType = null;
export type InitialState = typeof initialState;
export  const  sidebarReducer = (state = initialState, action:ActionType):InitialState=>{
    return state;
};