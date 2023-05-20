import React, { useEffect, useState } from 'react';
import { Divider, Row, Layout } from 'antd';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminExamSubjectsListTable from '../../../../components/Admin/Exams/AdminExamSubjectsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const RevieweeExamSubjectList = (({subjectStore}) => {
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        subjectStore.getSubjects()
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Exam Subjects</h3>
                        </Row>
                        <Divider/>
                        <AdminExamSubjectsListTable data={cloneDeep(subjectStore.subjects)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('subjectStore')(observer(RevieweeExamSubjectList))