import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout } from 'antd';
import {
  UserAddOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import TopicsListTable from '../../../../components/Admin/Subjects/TopicsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const TopicsList = (({topicStore}) => {
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
                        <Row justify={'space-between'}>
                            <h3>List of Topics</h3>
                            <Link to={`/admin/subjects/${id}/topics/add`}>
                                <Button type='primary'><UserAddOutlined /> Add New Topic</Button>
                            </Link>
                        </Row>
                        <Divider/>
                        <TopicsListTable data={cloneDeep(topicStore.topics)} />
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

export default inject('topicStore')(observer(TopicsList))