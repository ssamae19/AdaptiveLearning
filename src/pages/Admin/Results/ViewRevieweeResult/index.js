import React, { useEffect, useState } from 'react';
import { Button,  Descriptions, Divider, Row, Tag, Layout, Progress } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';


import './styles.scss'

const ViewRevieweeResult = (({examResultStore}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        examResultStore.getExamResult(id) 
    },[])

    const computeDuration = (startTime, endTime) => {
        var startTime = moment(startTime, 'HH:mm a');
        var endTime = moment(endTime, 'HH:mm a');

        // calculate total duration
        var duration = moment.duration(endTime.diff(startTime));

        // duration in hours
        var hours = parseInt(duration.asHours());

        // duration in minutes
        var minutes = parseInt(duration.asMinutes()) % 60;

        return hours + ' hour and ' + minutes + ' minutes.';
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-view-loan'>
                        <h3>Result Details</h3>
                        <Divider/>
                        {examResultStore.examResult ? (
                            <div className='content-container'>
                                <Descriptions>
                                    <Descriptions.Item label="Exam Number">{examResultStore.examResult.exam?.examNumber}</Descriptions.Item>
                                    <Descriptions.Item label="Subject">{examResultStore.examResult.exam?.subject?.title}</Descriptions.Item>
                                    <Descriptions.Item label="Topic">{examResultStore.examResult.exam?.topic?.title}</Descriptions.Item>
                                    <Descriptions.Item label="Advisor">{examResultStore.examResult.exam?.subject?.employee?.firstName} {examResultStore.examResult.exam?.subject?.employee?.middleName} {examResultStore.examResult.exam?.subject?.employee?.lastName}</Descriptions.Item>
                                    <Descriptions.Item label="Exam Date">{moment(examResultStore.examResult.createdAt).format('LL')}</Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <h4>Score</h4>
                                <Descriptions bordered column={3} layout="horizontal">
                                    <Descriptions.Item label="Status" span={1.5}>
                                        <Tag color={examResultStore.examResult.status === "PASSED" ? "green" : "red"}>
                                            {examResultStore.examResult.status}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Exam Difficulty" span={1.5}>
                                        <Tag
                                            color={
                                                examResultStore.examResult.exam?.difficultyLevel === 1
                                                ? "orange"
                                                : examResultStore.examResult.exam?.difficultyLevel === 2
                                                ? "volcano"
                                                : "red"
                                            }
                                        >
                                            {examResultStore.examResult.exam?.difficultyLevel === 1 ? "BEGINNER" : (examResultStore.examResult.exam?.difficultyLevel === 2 ? "AVERAGE" : "ADVANCED")}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Score" span={1.5}>{examResultStore.examResult.score} out of {examResultStore.examResult.exam?.totalItems}</Descriptions.Item>
                                    <Descriptions.Item label="Average Score" span={1.5}>
                                        <Progress percent={parseFloat(examResultStore.examResult.averageScore)} size="small" status={parseFloat(examResultStore.examResult.averageScore) > 50 ? "active" : "exception"} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Start Time" span={1.5}>{examResultStore.examResult.startTime}</Descriptions.Item>
                                    <Descriptions.Item label="End Time" span={1.5}>{examResultStore.examResult.endTime}</Descriptions.Item>
                                    <Descriptions.Item label="Exam Duration" span={3}>
                                        {computeDuration(examResultStore.examResult.startTime, examResultStore.examResult.endTime)}
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <h4>Reviewee Information</h4>
                                <Descriptions bordered column={3}>
                                    <Descriptions.Item label="Reviewee ID" span={3}>{examResultStore.examResult.reviewee?.idNumber}</Descriptions.Item>
                                    <Descriptions.Item label="First Name" span={1}>{examResultStore.examResult.reviewee?.firstName}</Descriptions.Item>
                                    <Descriptions.Item label="Middle Name" span={1}>{examResultStore.examResult.reviewee?.middleName}</Descriptions.Item>
                                    <Descriptions.Item label="Last Name" span={1}>{examResultStore.examResult.reviewee?.lastName}</Descriptions.Item>
                                    {/* <Descriptions.Item label="College School" span={3}>{examResultStore.examResult.reviewee?.school}</Descriptions.Item> */}
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

export default inject('examResultStore')(observer(ViewRevieweeResult))