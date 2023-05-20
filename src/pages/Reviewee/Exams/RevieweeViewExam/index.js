import React, { useEffect, useState } from 'react';
import { Button,  Descriptions, Divider, Row, Tag, Layout } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';


import './styles.scss'

const RevieweeViewExam = (({examStore, userStore}) => {
    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        examStore.getExam(id)
    },[])

    useEffect(() => {
        if(Object.keys(examStore.exam).length !== 0) {
            userStore.getUser(examStore.exam.createdBy)
        }
    },[examStore.exam])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-view-loan'>
                        <h3>Exam Details</h3>
                        <Divider/>
                        {examStore.exam ? (
                            <div className='content-container'>
                                <Descriptions>
                                    <Descriptions.Item label="Created By">{userStore.user.userType === "SUPERADMIN" ? "ADMIN" : `${userStore.user?.firstName} ${userStore.user?.middleName} ${userStore.user?.lastName}`}</Descriptions.Item>
                                    <Descriptions.Item label="Created At">{moment(examStore.exam.createdAt).format('LL')}</Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                    <Tag
                                        color={
                                            examStore.exam.status === "SCHEDULED"
                                            ? "blue"
                                            : examStore.exam.status === "IN_PROGRESS"
                                            ? "lime"
                                            : examStore.exam.status === "RE_SCHEDULED"
                                            ? "orange"
                                            : examStore.exam.status === "DONE"
                                            ? "green"
                                            : "red"
                                        }
                                        >
                                        {examStore.exam.status}
                                    </Tag>
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <Descriptions bordered column={3}>
                                    <Descriptions.Item label="Exam ID" span={3}>{examStore.exam.examNumber}</Descriptions.Item>
                                    <Descriptions.Item label="Supervisor" span={3}>{examStore.exam.employee?.firstName} {examStore.exam.employee?.middleName} {examStore.exam.employee?.lastName}</Descriptions.Item>
                                    <Descriptions.Item label="Total Items" span={2}>{examStore.exam.totalItems} items</Descriptions.Item>
                                    <Descriptions.Item label="Scheduled Date" span={2}>{moment(examStore.exam.schedDate).format('LL')}</Descriptions.Item>
                                    <Descriptions.Item label="Start Time" span={2}>{examStore.exam.startTime}</Descriptions.Item>
                                    <Descriptions.Item label="End Time" span={2}>{examStore.exam.endTime}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        ):<></>}
                        <Divider/>
                        <Row justify={'end'}>
                            <Button type='primary' onClick={()=> navigate(-1)}>Back</Button>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examStore','userStore')(observer(RevieweeViewExam))