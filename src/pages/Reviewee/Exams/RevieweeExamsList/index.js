import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
    DownloadOutlined
} from '@ant-design/icons';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import RevieweeExamsListTable from '../../../../components/Reviewee/Exams/RevieweeExamsListTable';

const RevieweeExamsList = (({examStore, currentLessonStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))

    const {topicID} = useParams()
    const navigate = useNavigate()
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);


    useEffect(() => {
        currentLessonStore.currentLesson = []
        examStore.exam = []
        currentLessonStore.getCurrentLesson(user.userID, topicID)
        setTimeout(() => {
            examStore.getExams(topicID);
        }, 1000)
    },[])

    const handleDownload = (fileUrl) => {
        window.open(`http://192.168.1.94${fileUrl}`, '_blank');
      };
    
      
    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Exams</h3>
                            {examStore.exams.length > 0 ? (
                                <Button type='primary' onClick={() => handleDownload(examStore.exams[0].topic?.attachment)}>
                                    <DownloadOutlined /> Download Lesson to Review
                                </Button>
                            ):<></>}
                        </Row>
                        <Divider/>
                        <RevieweeExamsListTable data={cloneDeep(examStore.exams)} />
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

export default inject('examStore','currentLessonStore')(observer(RevieweeExamsList))