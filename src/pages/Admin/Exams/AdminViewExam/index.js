import React, { useEffect, useState } from 'react';
import { Button,  Descriptions, Divider, Row, Tag, Layout, Col, Modal, Form, DatePicker, TimePicker } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';


import './styles.scss'

const AdminViewExam = (({examStore, userStore}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm()
    const location = useLocation();

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [schedDate, setSchedDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [rescheduleModal, setRescheduleModal] = useState(false);

    useEffect(() => {
        examStore.getExam(id)
    },[])

    useEffect(() => {
        if(Object.keys(examStore.exam).length !== 0) {
            userStore.getUser(examStore.exam.createdBy)
        }
    },[examStore.exam])

    const onChange = (time, timeString) => {
        setStartTime(timeString[0])
        setEndTime(timeString[1])
    };

    const onChangeDate = (date, dateString) => {
        setSchedDate(dateString)
    };

    const updateStatus = (status) => {
        examStore.updateExam(id, {
            ...examStore.exam,
            status: status
        })

        window.location.reload()
    }

    const onSubmit = (values) => {
        examStore.updateExam(id, {
            ...examStore.exam,
            schedDate: schedDate,
            startTime: startTime,
            endTime: endTime,
            status: "RE_SCHEDULED"
        })

        window.location.reload()
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-view-loan'>
                        <h3>Exam Details</h3>
                        <Divider/>
                        {examStore.exam ? (
                            <div className='content-container'>
                                <Descriptions>
                                    <Descriptions.Item label="Created By">{userStore.user.userType === "SUPERADMIN" ? "ADMIN" : `${userStore.user?.firstName} ${userStore.user?.middleName} ${userStore.user?.lastName}`}</Descriptions.Item>
                                    <Descriptions.Item label="Created At">{moment(examStore.exam.createdAt).format('LL')}</Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                    <Tag
                                        color={
                                            examStore.exam.status === "SCHEDULED"
                                            ? "blue"
                                            : examStore.exam.status === "IN_PROGRESS"
                                            ? "lime"
                                            : examStore.exam.status === "RE_SCHEDULED"
                                            ? "orange"
                                            : examStore.exam.status === "DONE"
                                            ? "green"
                                            : "red"
                                        }
                                        >
                                        {examStore.exam.status}
                                    </Tag>
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <Descriptions bordered column={3}>
                                    <Descriptions.Item label="Exam ID" span={3}>{examStore.exam.examNumber}</Descriptions.Item>
                                    <Descriptions.Item label="Supervisor" span={3}>{examStore.exam.employee?.firstName} {examStore.exam.employee?.middleName} {examStore.exam.employee?.lastName}</Descriptions.Item>
                                    <Descriptions.Item label="Total Items" span={2}>{examStore.exam.totalItems} items</Descriptions.Item>
                                    <Descriptions.Item label="Scheduled Date" span={2}>{moment(examStore.exam.schedDate).format('LL')}</Descriptions.Item>
                                    <Descriptions.Item label="Start Time" span={2}>{examStore.exam.startTime}</Descriptions.Item>
                                    <Descriptions.Item label="End Time" span={2}>{examStore.exam.endTime}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        ):<></>}
                        {examStore.exam.status !== "DONE" ? (
                            examStore.exam.status !== "CANCELLED" ? (
                                <>
                                    <Divider/>
                                    <h3>Change Status</h3>
                                    <Row gutter={10}>
                                    
                                        {examStore.exam.status === "SCHEDULED" ? (
                                            <>
                                                <Col>
                                                    <Button type='primary' onClick={()=> updateStatus("IN_PROGRESS")}>IN PROGRESS</Button>
                                                </Col>
                                                <Col>
                                                    <Button type='default' onClick={()=> setRescheduleModal(true)}>RE-SCHEDULE</Button>
                                                </Col>
                                                <Col>
                                                    <Button type='primary' danger onClick={()=> updateStatus("CANCELLED")}>CANCEL EXAM</Button>
                                                </Col>
                                            </>
                                        ) : examStore.exam.status === "IN_PROGRESS" ? (
                                            <Col>
                                                <Button type='primary' className='btn-success' onClick={()=> updateStatus("DONE")}>DONE</Button>
                                            </Col>
                                        ) : examStore.exam.status === "RE_SCHEDULED" ? (
                                            <>
                                                <Col>
                                                    <Button type='primary' onClick={()=> updateStatus("IN_PROGRESS")}>IN PROGRESS</Button>
                                                </Col>
                                                <Col>
                                                    <Button type='default' onClick={()=> setRescheduleModal(true)}>RE-SCHEDULE</Button>
                                                </Col>
                                                <Col>
                                                    <Button type='primary' danger onClick={()=> updateStatus("CANCELLED")}>CANCEL EXAM</Button>
                                                </Col>
                                            </>
                                        ) : <></>}
                                    </Row>
                                </>
                            ):<></>
                        ): <></>}
                        <Divider/>
                        <Row justify={'end'}>
                            <Col>
                                <Button type='primary' onClick={()=> navigate(-1)}>Back</Button>
                            </Col>
                        </Row>
                        {/* RESCHEDULE MODAL */}
                        <Modal
                            title="Re-schedule Exam"
                            open={rescheduleModal}
                            onCancel={() => setRescheduleModal(false)}
                            okText={"Resched Exam"}
                            onOk={() => {
                                form.submit()
                            }}
                        >
                            <Divider/>
                                <Form layout='vertical' form={form} onFinish={onSubmit}>
                                    <Form.Item label="Date" name="schedDate" rules={[{required: true}]}>
                                        <DatePicker onChange={onChangeDate}/>
                                    </Form.Item>
                                    <Form.Item label="Start Time - End Time" name="time" rules={[{required: true}]}>
                                        <TimePicker.RangePicker use12Hours format="h:mm a" onChange={onChange}/>
                                    </Form.Item>
                                </Form>
                            <Divider/>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examStore','userStore')(observer(AdminViewExam))