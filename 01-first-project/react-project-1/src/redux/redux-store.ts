import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer, InitialStateType} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import {appReducer} from "./app-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
type RootReducerType = typeof rootReducer; // (globalstate: GLOBALSTATE)=>GLOBALSTATE
export type AppStateType = ReturnType<RootReducerType>;
type PropertiesType<T> = T extends  {[key: string]: infer U} ? U : never;
export type InferActionTypes<T extends {[key: string]: (...args:any[])=>any}> = ReturnType<PropertiesType<T>>

export type BaseThunkType  <A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// let state: AppStateType;
// state.auth.isAuth
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore<AppStateType, any, any, any>(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
let store = createStore(rootReducer,composeEnhancers( applyMiddleware(thunkMiddleware)));
//@ts-ignore
window._store_ = store;

export default store;