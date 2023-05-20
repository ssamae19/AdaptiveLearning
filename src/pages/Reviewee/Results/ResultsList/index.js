import React, { useEffect, useState } from 'react';
import { Divider, Row, Layout  } from 'antd';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import RevieweeResultsListTable from '../../../../components/Reviewee/Results/RevieweeResultsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const ResultsList = (({examResultStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        examResultStore.getExamResultsByRevieweeID(user.userID)
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
                        <RevieweeResultsListTable data={cloneDeep(examResultStore.examResults)} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examResultStore')(observer(ResultsList))