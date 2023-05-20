import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Layout, message, Input, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

import { inject, observer } from 'mobx-react';

const EditSubject = (({subjectStore, userStore}) => {
    const { Content } = Layout;
    const { id } = useParams();
    const [form] = Form.useForm();
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(subjectStore.isSuccess) {
            subjectStore.isSuccess = false
        }
        subjectStore.getSubject(id)
        userStore.getUsers("EMPLOYEE")
    }, [])

    useEffect(() => {
        if(subjectStore.subject) {
            form.setFieldsValue(subjectStore.subject)
        }
    }, [subjectStore.subject])

    useEffect(() => {
        if(subjectStore.isSuccess) {
            navigate(-1)
        }
    }, [subjectStore.isSuccess])

    const onSubmit = (values) => {
        subjectStore.updateSubject(subjectStore.subject.id, values)
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-add-topic'>
                        <h3>Edit Subject</h3>
                        <Divider/>
                        <div className='form-container'>
                            <Form layout='vertical' form={form} onFinish={onSubmit}>
                                <Form.Item label="Subject Title" name="title" rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="Advisor" name="employeeID" rules={[{required: true}]}>
                                    <Select
                                        options={userStore.users.map((user) => (
                                            {label: `${user.firstName} ${user.middleName} ${user.lastName}`, value: user.id}
                                        ))}
                                    />
                                </Form.Item>
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

export default inject('subjectStore','userStore')(observer(EditSubject))