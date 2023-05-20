import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Row, Layout, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminRevieweeListTable from '../../../../components/Admin/Users/AdminRevieweeListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminUserList = (({userStore}) => {
    const { Content } = Layout;
    const user = JSON.parse(localStorage.getItem("userStore"))

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        userStore.getUsers("REVIEWEE");
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Reviewee</h3>
                            {user.userType === "SUPERADMIN" ? (
                                <Link to={'/admin/users/add'}>
                                    <Button type='primary'><UserAddOutlined /> Add New Reviewee</Button>
                                </Link>
                            ):<></>}
                            
                        </Row>
                        <Divider/>
                        <AdminRevieweeListTable data={cloneDeep(userStore.users)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('userStore')(observer(AdminUserList))