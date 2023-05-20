import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Layout, message, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

import { inject, observer } from 'mobx-react';
import TextArea from 'antd/es/input/TextArea';

const AddEmployee = (({userStore}) => {
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(userStore.isSuccess) {
            userStore.isSuccess = false
        }
    }, [])

    useEffect(() => {
        if(userStore.isSuccess) {
            navigate(-1)
        }
    }, [userStore.isSuccess])

    const onSubmit = (values) => {
        userStore.createUser({
            ...values,
            middleName: values.middleName || "",
            // school: "",
            userType: "EMPLOYEE",
            password: 12345,
            status: "ACTIVE"
        })
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-add-employee'>
                        <h3>Add Employee</h3>
                        <Divider/>
                        <div className='form-container'>
                            <Form layout='vertical' onFinish={onSubmit}>
                                <Row gutter={25}>
                                    <Col span={24}>
                                        <Form.Item label="Department" name="department" rules={[{required: true}]}>
                                            <Input/>
                                            {/* <Select
                                                showSearch
                                                optionFilterProp="children"
                                                onChange={(value, option) => {
                                                    // setUser({
                                                    //     ...option.record
                                                    // })
                                                }}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={[]}
                                                // options={userStore.users.map((user) => {
                                                //     return {value: user.id, label: user.accountNumber, record: user}
                                                // })}
                                            /> */}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Employee Number" name="idNumber" rules={[{required: true}]}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Username" name="username" rules={[{required: true}]}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Middle Name" name="middleName">
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
                                            <Input/>
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

export default inject('userStore')(observer(AddEmployee))