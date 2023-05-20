import { Button, Col, Form, Input, Row, message } from "antd"
import React, { useEffect } from "react"
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import bgleft from '../../assets/images/background-left.svg'
import loginImage from '../../assets/images/login-image.svg'
import logo from '../../assets/images/logo.png'

import './styles.scss'

import { inject, observer } from 'mobx-react'

const Login = ({userStore}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        userStore.errorMessage = null
    }, [])

    useEffect(() => {
        if(userStore.errorMessage) {
            message.error("Incorrect Username or Password")
        }
    }, [userStore.errorMessage])

    const onFinish = (values) => {
        userStore.login(values);
    }

    return (
        <div className="login-container">
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
                        <h3>Login</h3>
                        <Form
                            name="basic"
                            autoComplete="off"
                            form={form}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="idNumber"
                                rules={[{ required: true, message: 'This field is required!' }]}
                            >
                                <Input
                                    prefix={<MailOutlined className='prefix-icon'/>}
                                    placeholder='Student Number / Employee Number'
                                    size='large'
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'This field is required!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className='prefix-icon'/>}
                                    placeholder='Enter your password'
                                    size='large'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={false} block>
                                    Log In Now
                                </Button>
                            </Form.Item>
                            <Row justify="center">
                                <span className="register">No student account? <Link className='signup-link' to={'/register'}><span >Register Now</span></Link></span>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
} 

export default inject('userStore')(observer(Login))