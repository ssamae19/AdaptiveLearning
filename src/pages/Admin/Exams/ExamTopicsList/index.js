import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminExamTopicsListTable from '../../../../components/Admin/Exams/AdminExamTopicsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const ExamTopicsList = (({topicStore}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { Content } = Layout;

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        topicStore.getTopics(id);
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <AdminExamTopicsListTable data={cloneDeep(topicStore.topics)} />
                    </div>
                    <Divider/>
                    <Row justify={'end'}>
                        <Button type='primary' onClick={()=> navigate(-1)}>Back</Button>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('topicStore')(observer(ExamTopicsList))