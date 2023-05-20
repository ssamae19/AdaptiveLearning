import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout, Popconfirm, Tabs } from 'antd';
import {
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminResultsExamsListTable from '../../../../components/Admin/Results/AdminResultsExamsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const ResultsExamsList = (({examStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if(user.userType === "SUPERADMIN") {
            examStore.getExams()
        } else {
            examStore.getExamsByEmployee(user.userID);
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
                            <h3>List of Exams Results</h3>
                        </Row>
                        <Divider/>
                        <AdminResultsExamsListTable data={cloneDeep(examStore.exams)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examStore')(observer(ResultsExamsList))