import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Layout, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

import { inject, observer } from 'mobx-react';

const AddExam = (({subjectStore, userStore, examStore}) => {
    const {id, topicID} = useParams();

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [hasBeginner, setHasBeginner] = useState(false);
    const [haseAverage, setHasAverage] = useState(false);
    const [hasAdvanced, setHasAdvanced] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(examStore.isSuccess) {
            examStore.isSuccess = false
        }
        examStore.getExams(topicID);
    },[])

    useEffect(() => {
        if(examStore.exams?.length > 0) {
            examStore.exams.forEach(exam => {
                if(exam.difficultyLevel === "1") {
                    setHasBeginner(true)
                } else if(exam.difficultyLevel === "2") {
                    setHasAverage(true)
                } else if(exam.difficultyLevel === "3") {
                    setHasAdvanced(true)
                }
            });
        }
    },[examStore.exams])

    useEffect(() => {
        if(examStore.isSuccess) {
            navigate(-1)
        }
    }, [examStore.isSuccess])


    const onSubmit = async (values) => {
        const data = {
            subjectID: id,
            topicID: topicID,
            totalItems: values.totalItems,
            difficultyLevel: values.difficultyLevel,
        }
        examStore.createExam(data)
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-add-topic'>
                        <h3>Add Exam</h3>
                        <Divider/>
                        <div className='form-container'>
                            <Form layout='vertical' onFinish={onSubmit}>
                                <Row gutter={25}>
                                    <Col span={12}>
                                        <Form.Item label="Items" name="totalItems" rules={[{required: true}]}>
                                            <InputNumber/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Difficulty Level" name="difficultyLevel" rules={[{required: true}]}>
                                            <Select
                                                options={[
                                                    { label: ''},
                                                    { label: 'Beginner', value: 1, disabled: hasBeginner },
                                                    { label: 'Average', value: 2, disabled: haseAverage },
                                                    { label: 'Advance', value: 3, disabled: hasAdvanced },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Row justify={'end'}>
                                        <Button type="primary" htmlType="submit" loading={false}>
                                            Submit
                                        </Button>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </div>
                        <Divider/>
                        <Row justify={'end'}>
                            <Button type="primary" onClick={() => navigate(-1)} danger>
                                Cancel
                            </Button>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('subjectStore','userStore', 'examStore')(observer(AddExam))