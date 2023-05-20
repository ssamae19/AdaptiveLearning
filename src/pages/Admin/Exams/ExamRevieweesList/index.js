import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout, Popconfirm } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminExamRevieweeListTable from '../../../../components/Admin/Exams/AdminExamRevieweeListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const ExamRevieweesList = (({examRevieweesStore}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        examRevieweesStore.getExamReviewees(id);
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Exam Reviewees</h3>
                        </Row>
                        <Divider/>
                        <AdminExamRevieweeListTable data={cloneDeep(examRevieweesStore.examReviewees)} />
                        <Divider/>
                        <Row justify={'end'}>
                            <Button type="primary" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examRevieweesStore')(observer(ExamRevieweesList))