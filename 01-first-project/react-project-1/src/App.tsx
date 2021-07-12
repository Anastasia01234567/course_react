import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect, Provider } from "react-redux";
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from "redux";
import './App.css';
import HeaderContainer from './commponets/Header/HeaderContainer';
import Login from "./commponets/Login/login";
import Preloader from "./commponets/Preloader/Preloader";
import UserContainer from "./commponets/Users/UsersContainer";
// import { ChatPage } from './pages/Chat/ChatPages';
import { initializeApp } from "./redux/app-reducer";
import store, { AppStateType } from "./redux/redux-store";


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./commponets/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./commponets/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPages'));


// const SuspendedDia = withSuspense(DialogsContainer);
class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>
    {
        alert('Some error occured')
    };

    componentDidMount()
    {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount()
    {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render()
    {
        return (
            <Layout>
                <HeaderContainer />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                                    <Menu.Item key="1">   <Link to="/profile" >Profile</Link></Menu.Item>
                                    <Menu.Item key="2">  <Link to="/dialogs">Messages</Link></Menu.Item>
                                    <Menu.Item key="3">  <Link to="/chat">Chat</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                    <Menu.Item key="3"> <Link to="/developers">Users</Link></Menu.Item>
                                </SubMenu>
                                {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu> */}
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route path="/profile/:userId?" render={() =>
                                {
                                    return <React.Suspense fallback={<Preloader />}>
                                        <ProfileContainer />
                                    </React.Suspense>
                                }} />
                                <Route path="/dialogs" render={() =>
                                {
                                    return <React.Suspense fallback={<div>Loading...</div>}> <DialogsContainer /> </React.Suspense>
                                }} />
                                <Route path='/developers'
                                    // pageTitle={'Users container test void title'}
                                    render={() => <UserContainer />} />
                                <Route path='/login' render={() => <Login />} />
                                <Route path='/chat' render={() =>
                                {
                                    return <React.Suspense fallback={<Preloader />}>
                                        <ChatPage />
                                    </React.Suspense>
                                }} />
                                <Route path='*' render={() => <div>
                                    404 NOT FOUND
                                </div>} />
                            </Switch>

                        </Content>
                    </Layout>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout >
        )
    }

    // render()
    // {
    //     if (!this.props.initialized)
    //     {
    //         return <Preloader />
    //     }
    //     return (
    //         <main className="app-wrapper">
    //             <HeaderContainer />
    //             <Navbar />
    //             <div className="app-wrapper-content">
    //                 <Route path="/profile/:userId?" render={() =>
    //                 {
    //                     return <React.Suspense fallback={<Preloader />}>
    //                         <ProfileContainer />
    //                     </React.Suspense>
    //                 }} />
    //                 <Route path="/dialogs" render={() =>
    //                 {
    //                     return <React.Suspense fallback={<div>Loading...</div>}> <DialogsContainer /> </React.Suspense>
    //                 }} />
    //                 <Route path='/users'
    //                     // pageTitle={'Users container test void title'}
    //                     render={() => <UserContainer />} />
    //                 <Route path='/login' render={() => <Login />} />
    //                 <Route path='*' render={() => <div>
    //                     <Button type={'primary'}>ok</Button>
    //                     404 NOT FOUND
    //                 </div>} />

    //             </div>

    //             <Footer />
    //         </main>
    //     )
    // }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
let mapStateToProps = (state: AppStateType) =>
{
    return {
        initialized: state.app.initialized
    }
}
let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);
let SamuraiJSAPP: React.FC = () =>
{
    return <BrowserRouter>
        <Provider store={store}>
            < AppContainer />
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSAPP