import React from 'react';
import { Avatar, Col, Layout, Row } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';

import './styles.scss'
import { Link } from 'react-router-dom';

const NavBar = (({collapsed, setCollapsed}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))
    const { Header } = Layout;

    const onLogout = () => {
      window.location.href = "/"
      localStorage.removeItem("userStore");
    }

    return (
        <Header className='navbar'>
          <Row justify={'space-between'} >
            <Row gutter={100} >
              <Col>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
              </Col>
              <Row align={'middle'} gutter={10}>
                {/* <Col>
                  <Avatar src={`http://192.168.1.94${user.image}`} />
                </Col> */}
                <Col>
                  <Link to={`/profile/${user.userID}`}>@{user.username}</Link>
                </Col>
              </Row>
            </Row>
            <div className='logout' onClick={onLogout}>
              <span>LOGOUT</span>
              <PoweroffOutlined />
            </div>
          </Row>
        </Header>
    )
})

export default NavBar