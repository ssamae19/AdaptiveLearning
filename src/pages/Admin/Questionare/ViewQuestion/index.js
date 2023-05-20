import React, { useEffect, useState } from 'react';
import { Button,  Descriptions, Divider, Row, Tag, Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

const ViewQuestion = (({questionBankStore}) => {
    const navigate = useNavigate();
    const { questionID } = useParams();

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        questionBankStore.getQuestion(questionID)
    },[])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-view-loan'>
                        <h3>Question Details</h3>
                        <Divider/>
                        {questionBankStore.question ? (
                            <div className='content-container'>
                                <Descriptions>
                                    <Descriptions.Item label="Subject">{questionBankStore.question.subject?.title}</Descriptions.Item>
                                    <Descriptions.Item label="Topic">{questionBankStore.question.topic?.title}</Descriptions.Item>
                                    <Descriptions.Item label="Advisor">{questionBankStore.question.subject?.employee?.firstName} {questionBankStore.question.subject?.employee?.middleName} {questionBankStore.question.subject?.employee?.lastName}</Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <Descriptions bordered column={3} layout="horizontal">
                                    <Descriptions.Item label="Type" span={1.5}>
                                        <Tag color='geekblue'>
                                            {questionBankStore.question.type === "TRUE_OR_FALSE" ? "True or False" : (questionBankStore.question.type === "MULTIPLE_CHOICE" ? "Multiple Choice" : "Definition")}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Performance Rate" span={1.5}>
                                    <Tag
                                        color={
                                            questionBankStore.question.difficultyLevel === "1"
                                            ? "orange"
                                            : questionBankStore.question.difficultyLevel === "2"
                                            ? "volcano"
                                            : "red"
                                        }
                                    >
                                        {questionBankStore.question.difficultyLevel === "1" ? "BEGINNER" : (questionBankStore.question.difficultyLevel === "2" ? "AVERAGE" : "ADVANCED")}
                                    </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Question" span={3}>{questionBankStore.question.question}</Descriptions.Item>
                                    <Descriptions.Item label="Answer" span={3}>{questionBankStore.question.answer}</Descriptions.Item>
                                    <Descriptions.Item label="Options" span={3}>
                                        {
                                            questionBankStore.question.options ? (
                                                      <div>
                                                        <p><strong>A.</strong> {questionBankStore.question.options?.a}</p>
                                                        <p><strong>B.</strong> {questionBankStore.question.options?.b}</p>
                                                        <p><strong>C.</strong> {questionBankStore.question.options?.c}</p>
                                                        <p><strong>D.</strong> {questionBankStore.question.options?.d}</p>
                                                      </div>
                                                    ): <span>N/A</span>
                                        }
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <h4>Supporting Lesson Detail</h4>
                                <p><i><small>(The provided information will indicate instances where the student has given incorrect answers.)</small></i></p>
                                <p>{questionBankStore.question.toLearn}</p>
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

export default inject('questionBankStore')(observer(ViewQuestion))