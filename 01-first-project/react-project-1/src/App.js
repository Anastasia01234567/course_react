import React from 'react';
import './App.css';
import Navbar from './commponets/Navbar/Navbar'
import Footer from './commponets/Footer'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import UsersContainer from "./commponets/Users/UsersContainer";
import HeaderContainer from "./commponets/Header/HeaderContainer";
import Login from "./commponets/Login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import Preloader from "./commponets/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import store from "./redux/redux-store";
import Provider from "react-redux/es/components/Provider";
const DialogsContainer = React.lazy(() => import('./commponets/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./commponets/Profile/ProfileContainer'));
class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <main className="app-wrapper">
                <HeaderContainer/>
                <Navbar state={this.props.appState.sidebar}/>
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" render={() => {
                        return <React.Suspense fallback={<Preloader/>}>
                            <ProfileContainer/>
                        </React.Suspense>
                    }}/>
                    <Route path="/dialogs" render={() => {
                        return <React.Suspense fallback={<Preloader/>}>
                            <DialogsContainer/>
                        </React.Suspense>
                    }}/>
                    <Route path='/users' render={() => <UsersContainer pageTitle={'Users container test void title'}/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
                <Footer/>
            </main>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}
let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
let SamuraiJSAPP = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            < AppContainer
                appState={store.getState()}
            />
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSAPP