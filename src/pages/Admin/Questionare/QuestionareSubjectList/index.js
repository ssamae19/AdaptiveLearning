import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout, Popconfirm } from 'antd';
import {
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminQuestionareSubjectsListTable from '../../../../components/Admin/Questionares/AdminQuestionareSubjectsListTable';


import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const QuestionareSubjectList = (({subjectStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))

    const { Content } = Layout;
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
                            <h3>List of Questionnaire Subjects</h3>
                        </Row>
                        <Divider/>
                        <AdminQuestionareSubjectsListTable data={cloneDeep(subjectStore.subjects)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('subjectStore')(observer(QuestionareSubjectList))