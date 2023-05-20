import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout, Popconfirm } from 'antd';
import {
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminSubjectsListTable from '../../../../components/Admin/Subjects/AdminSubjectsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const SubjectsList = (({subjectStore}) => {
    const { Content } = Layout;
    const user = JSON.parse(localStorage.getItem("userStore"))

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if(user.userType === "SUPERADMIN") {
            subjectStore.getSubjects();
        } else {
            subjectStore.getSubjectsByEmployee(user.userID);
        }
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Subjects</h3>
                            {user.userType === "SUPERADMIN" ? (
                                <Link to={'/admin/subjects/add'}>
                                    <Button type='primary'><UserAddOutlined /> Add New Subject</Button>
                                </Link>
                            ):<></>}
                        </Row>
                        <Divider/>
                        <AdminSubjectsListTable data={subjectStore.subjects} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('subjectStore')(observer(SubjectsList))