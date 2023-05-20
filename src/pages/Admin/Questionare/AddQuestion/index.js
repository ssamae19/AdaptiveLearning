import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Layout, message, Input, Select, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

import { inject, observer } from 'mobx-react';
import TextArea from 'antd/es/input/TextArea';

const AddQuestion = (({questionBankStore}) => {
    const { Content } = Layout;
    const {id, topicID} = useParams();
    const [collapsed, setCollapsed] = useState(false);
    const [type, setType] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(questionBankStore.isSuccess) {
            questionBankStore.isSuccess = false
        }
    }, [])

    useEffect(() => {
        if(questionBankStore.isSuccess) {
            navigate(-1)
        }
    }, [questionBankStore.isSuccess])

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const onSubmit = (values) => {
        let options = null 
        if(type === "MULTIPLE_CHOICE") {
            options={
                a: values.a,
                b: values.b,
                c: values.c,
                d: values.d,
            }
        }

        const data = {
            subjectID : id,
            topicID : topicID,
            type: values.type,
            question: values.question,
            toLearn: values.toLearn,
            answer: values.answer,
            options: options,
            difficultyLevel: values.difficultyLevel
        }

        questionBankStore.createQuestion(data)
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-add-topic'>
                        <h3>Add Question</h3>
                        <Divider/>
                        <div className='form-container'>
                            <Form layout='vertical' onFinish={onSubmit}>
                                <Row gutter={25}>
                                    <Col span={24}>
                                        <Form.Item label="Type" name="type" rules={[{required: true}]}>
                                            <Radio.Group value={type} onChange={handleTypeChange}>
                                                <Radio.Button value="MULTIPLE_CHOICE">Multiple Choice</Radio.Button>
                                                <Radio.Button value="TRUE_OR_FALSE">True or False</Radio.Button>
                                                <Radio.Button value="DEFINITION">Definition</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Difficulty Level" name="difficultyLevel" rules={[{required: true}]}>
                                            <Select
                                                options={[
                                                    { label: ''},
                                                    { label: 'Beginner', value: 1 },
                                                    { label: 'Average', value: 2 },
                                                    { label: 'Advance', value: 3 },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Question" name="question" rules={[{required: true}]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={<span>Supporting Lesson Detail  <i><small>(The provided information will indicate instances where the student has given incorrect answers. Please provide a sentence or paragraph that they should review.)</small></i></span>} name="toLearn" rules={[{required: true}]}>
                                            <TextArea />
                                        </Form.Item>
                                    </Col>
                                    {type === "MULTIPLE_CHOICE" ? (
                                        <>
                                            <Col span={24}>
                                                <Form.Item label="Answer" name="answer" rules={[{required: true}]}>
                                                    <Radio.Group>
                                                        <Radio value={'A'}>A</Radio>
                                                        <Radio value={'B'}>B</Radio>
                                                        <Radio value={'C'}>C</Radio>
                                                        <Radio value={'D'}>D</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Enter Value for Option A" name="a" rules={[{required: true}]}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Enter Value for Option B" name="b" rules={[{required: true}]}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Enter Value for Option C" name="c" rules={[{required: true}]}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Enter Value for Option D" name="d" rules={[{required: true}]}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </>
                                    ) : (
                                        type === "TRUE_OR_FALSE" ? (
                                            <Col span={24}>
                                                <Form.Item label="Answer" name="answer" rules={[{required: true}]}>
                                                    <Radio.Group>
                                                        <Radio value={'TRUE'}>True</Radio>
                                                        <Radio value={'FALSE'}>False</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        ): type === "DEFINITION" ? (
                                            <Col span={24}>
                                                <Form.Item label="Answer" name="answer" rules={[{required: true}]}>
                                                    <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                                                </Form.Item>
                                            </Col>
                                        ): <></>
                                    )}
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

export default inject('questionBankStore')(observer(AddQuestion))