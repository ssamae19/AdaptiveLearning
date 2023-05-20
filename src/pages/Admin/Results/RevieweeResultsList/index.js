import React, { useEffect, useState } from 'react';
import { Divider, Row, Layout  } from 'antd';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminRevieweeResultsListTable from '../../../../components/Admin/Results/AdminRevieweeResultsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

const RevieweeResultsList = (({examResultStore}) => {
    const { id } = useParams();
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        examResultStore.getExamResults(id)
    },[])


    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Reviewee Results</h3>
                        </Row>
                        <Divider/>
                        <AdminRevieweeResultsListTable data={cloneDeep(examResultStore.examResults)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examResultStore')(observer(RevieweeResultsList))