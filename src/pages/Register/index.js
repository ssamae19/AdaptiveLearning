import { Button, Col, Form, Input, Row, message } from "antd"
import React, { useEffect } from "react"
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import bgleft from '../../assets/images/background-left.svg'
import loginImage from '../../assets/images/login-image.svg'
import logo from '../../assets/images/logo.png'

import './styles.scss'

import { inject, observer } from 'mobx-react'
import TextArea from "antd/es/input/TextArea";

const Register = ({userStore}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

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

    const onFinish = (values) => {
        userStore.createUser({
            ...values,
            middleName: values.middleName || "",
            department: "",
            userType: "REVIEWEE",
            status: "ACTIVE"
        })
    }

    return (
        <div className="register-container">
            <Row className="login-content">
                <Col className="left-container" span={12}>
                    <div className="left-content">
                        <img className="white-bg" src={bgleft} />
                        <img className="login-image" src={loginImage} />
                        <h2>Preparing You for Success!</h2>
                        <Row justify={'center'}>
                            <p>Maximize Your Exam Readiness with Our Intelligent Adaptive Reviewer.</p>
                        </Row>
                    </div>
                </Col>
                <Col className="right-container" span={12}>
                    <div className="right-content">
                        <Row justify={'center'}>
                            <img className="logo" src={logo} />
                        </Row>
                        <h3>Register</h3>
                        <Form layout='vertical' onFinish={onFinish}>
                            <Form.Item label="Student Number" name="idNumber" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Username" name="username" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'This field is required!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className='prefix-icon'/>}
                                />
                            </Form.Item>
                            <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Middle Name" name="middleName">
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            {/* <Form.Item label="College School" name="school" rules={[{required: true}]}>
                                <TextArea rows={3}/>
                            </Form.Item> */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={false}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
} 

export default inject('userStore')(observer(Register))