import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Menu, Row } from 'antd';
// import 'antd/dist/antd.css';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../../redux/auth-reducer';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';

let HeaderApp: React.FC = (props) =>
{
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch();
    const onLogout = () =>
    {
        dispatch(logout())
    }
    return (
        <Header className="header">
            <div className="logo" />
            <Row justify="space-between" align="middle">
                <Col span={12}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"> <Link to="/developers">Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>

                    {isAuth ?
                        <div>
                            <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            <Button type={'primary'} onClick={onLogout} >log out</Button>
                        </div>
                        :
                        <Link to='/login'>Login</Link>}
                </Col>
            </Row>
        </Header>
    )
}
export default HeaderApp;