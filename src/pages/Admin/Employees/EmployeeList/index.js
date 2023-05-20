import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout, Popconfirm } from 'antd';
import {
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminEmployeeListTable from '../../../../components/Admin/Employees/AdminEmployeeListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminEmployeeList = (({userStore}) => {
    const { Content } = Layout;
    const user = JSON.parse(localStorage.getItem("userStore"))

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        userStore.getUsers("EMPLOYEE");
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Employees</h3>
                            <Link to={'/admin/employees/add'}>
                                <Button type='primary'><UserAddOutlined /> Add New Employee</Button>
                            </Link>
                        </Row>
                        <Divider/>
                        <AdminEmployeeListTable data={cloneDeep(userStore.users)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('userStore')(observer(AdminEmployeeList))