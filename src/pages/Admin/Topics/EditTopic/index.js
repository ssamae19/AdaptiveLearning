import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Layout, message, Input, Select, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
    UploadOutlined
  } from '@ant-design/icons';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import './styles.scss'

import { inject, observer } from 'mobx-react';
import { useForm } from 'antd/es/form/Form';

const EditTopic = (({topicStore, attachmentStore}) => {
    const {id, topicID} = useParams();
    const { Content } = Layout;
    const [form] = useForm();
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(topicStore.isSuccess) {
            topicStore.isSuccess = false
        }
        topicStore.getTopic(topicID)
    }, [])

    useEffect(() => {
        if(Object.keys(topicStore.topic).length > 0) {
            form.setFieldsValue({
                title: topicStore.topic?.title
            })
        }
    }, [topicStore.topic])

    // useEffect(() => {
    //     if(topicStore.isSuccess) {
    //         navigate(-1)
    //     }
    // }, [topicStore.isSuccess])

    const props = {
        name: 'document',
        multiple: false,
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';
                if (!isPDF) {
                    message.error('You can only upload PDF file!');
                    return false;
                } else {
                    return true;
                }
        },
        customRequest: async (info) => {
            let formData = new FormData();
            formData.append('document', info.file)
            await attachmentStore.uploadFile(formData)
            setTimeout(() => {
                if(attachmentStore.isSuccess) {
                    info.onSuccess("ok")
                    setTimeout(() => {
                        attachmentStore.isSuccess = false
                    }, 500)
                } else {
                    info.onError("error")
                }
            }, 1000);

        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log("uploading")
            }
            if (status === 'done') {
                console.log("done")
            } else if (status === 'error') {
                console.log("error")
            }
        },
        onDrop(e) {
            console.log("drop")
        },
    };


    const onSubmit = (values) => {
        topicStore.createTopic({
            ...values,
            subjectID: id,
            attachment: attachmentStore.file?.filePath || topicStore.topic.attachment
        })
    }

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='admin-add-topic'>
                        <h3>Add Topic</h3>
                        <Divider/>
                        <div className='form-container'>
                            <Form layout='vertical' form={form} onFinish={onSubmit}>
                                <Form.Item label="Topic Title" name="title" rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                                <h4>Change Uploaded Lesson to Review</h4>
                                <p><i><small>Note: Attachments accepts PDF files only</small></i></p>
                                <Upload {...props}>
                                    <Button className='upload-btn' icon={<UploadOutlined />}>Upload File</Button>
                                </Upload>
                                <br/>
                                <br/>
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

export default inject('topicStore','attachmentStore')(observer(EditTopic))