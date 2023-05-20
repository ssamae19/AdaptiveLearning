import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Layout, message, Input, Select, Radio, DatePicker, TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

import { inject, observer } from 'mobx-react';
import TextArea from 'antd/es/input/TextArea';

const AddExam = (() => {
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [type, setType] = useState();

    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const onSubmit = (values) => {
        console.log(values)
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
                                    <Col span={24}>
                                        <Form.Item label="Subject" name="subject" rules={[{required: true}]}>
                                            <Select
                                                options={[]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Supervisor" name="supervisor" rules={[{required: true}]}>
                                            <Select
                                                options={[]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item label="Items" name="items" rules={[{required: true}]}>
                                            <InputNumber/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Date" name="date" rules={[{required: true}]}>
                                            <DatePicker/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Start Time - End Time" name="time" rules={[{required: true}]}>
                                            <TimePicker.RangePicker />
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

export default inject()(observer(AddExam))